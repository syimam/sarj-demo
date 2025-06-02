"use client";

import { useState, useRef, useEffect } from "react";
import { Mic, MicOff, Phone, PhoneOff, Volume2, VolumeX, Settings, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ConversationMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  audio_url?: string;
  confidence?: number;
}

interface ConversationState {
  status: 'idle' | 'connecting' | 'active' | 'ended';
  duration: number;
  messages: ConversationMessage[];
  currentSpeaker: 'user' | 'assistant' | 'none';
}

export function ConversationAI() {
  const [conversation, setConversation] = useState<ConversationState>({
    status: 'idle',
    duration: 0,
    messages: [],
    currentSpeaker: 'none'
  });
  
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState("default");
  const [audioLevel, setAudioLevel] = useState(0);
  
  const wsRef = useRef<WebSocket | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Available AI agents
  const agents = [
    { id: "default", name: "Sarah - Customer Service", voice: "Rachel", scenario: "customer-support" },
    { id: "sales", name: "Mike - Sales Agent", voice: "Antoni", scenario: "sales-outbound" },
    { id: "technical", name: "Alex - Technical Support", voice: "Bella", scenario: "technical-support" },
    { id: "billing", name: "Emma - Billing Support", voice: "Domi", scenario: "billing-inquiry" }
  ];

  const startConversation = async () => {
    try {
      setConversation(prev => ({ ...prev, status: 'connecting' }));
      
      // Initialize WebSocket connection to ElevenLabs Conversational AI
      const ws = new WebSocket('wss://api.elevenlabs.io/v1/convai/conversation');
      wsRef.current = ws;
      
      ws.onopen = () => {
        setConversation(prev => ({ ...prev, status: 'active' }));
        startAudioCapture();
        startTimer();
      };
      
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        handleConversationMessage(data);
      };
      
      ws.onclose = () => {
        endConversation();
      };
      
      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        endConversation();
      };
      
    } catch (error) {
      console.error('Error starting conversation:', error);
      setConversation(prev => ({ ...prev, status: 'idle' }));
    }
  };

  const endConversation = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
    }
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    setConversation(prev => ({ 
      ...prev, 
      status: 'ended',
      currentSpeaker: 'none'
    }));
    setIsListening(false);
  };

  const startAudioCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: { 
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });
      
      // Set up audio level monitoring
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);
      
      analyser.fftSize = 256;
      microphone.connect(analyser);
      
      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      
      // Monitor audio levels
      const monitorAudio = () => {
        if (analyserRef.current) {
          const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
          analyserRef.current.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
          setAudioLevel(average);
        }
      };
      
      const audioMonitorInterval = setInterval(monitorAudio, 100);
      
      // Set up MediaRecorder for sending audio to ElevenLabs
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = (event) => {
        if (wsRef.current && event.data.size > 0) {
          // Send audio chunk to ElevenLabs
          wsRef.current.send(event.data);
        }
      };
      
      mediaRecorder.start(100); // Send chunks every 100ms
      setIsListening(true);
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const handleConversationMessage = (data: any) => {
    if (data.type === 'conversation_initiation_metadata') {
      // Conversation started
      console.log('Conversation initiated:', data);
    } else if (data.type === 'audio') {
      // Received AI response audio
      playAudioResponse(data.audio_event.audio_base_64);
    } else if (data.type === 'user_transcript') {
      // User speech transcription
      addMessage({
        id: Math.random().toString(36).substr(2, 9),
        role: 'user',
        content: data.user_transcript.text,
        timestamp: new Date(),
        confidence: data.user_transcript.confidence
      });
    } else if (data.type === 'agent_response') {
      // AI agent response
      addMessage({
        id: Math.random().toString(36).substr(2, 9),
        role: 'assistant',
        content: data.agent_response.text,
        timestamp: new Date()
      });
    }
  };

  const addMessage = (message: ConversationMessage) => {
    setConversation(prev => ({
      ...prev,
      messages: [...prev.messages, message]
    }));
  };

  const playAudioResponse = (audioBase64: string) => {
    const audioBlob = new Blob([Uint8Array.from(atob(audioBase64), c => c.charCodeAt(0))], { type: 'audio/mpeg' });
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    
    setConversation(prev => ({ ...prev, currentSpeaker: 'assistant' }));
    
    audio.onended = () => {
      setConversation(prev => ({ ...prev, currentSpeaker: 'none' }));
      URL.revokeObjectURL(audioUrl);
    };
    
    if (!isMuted) {
      audio.play();
    }
  };

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setConversation(prev => ({
        ...prev,
        duration: prev.duration + 1
      }));
    }, 1000);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="space-y-6">
      {/* Conversation Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-500" />
              Live Conversation AI
              <Badge variant={conversation.status === 'active' ? 'default' : 'secondary'}>
                {conversation.status}
              </Badge>
            </div>
            {conversation.status === 'active' && (
              <div className="text-lg font-mono">
                {formatDuration(conversation.duration)}
              </div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Agent Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">AI Agent</label>
            <Select value={selectedAgent} onValueChange={setSelectedAgent} disabled={conversation.status === 'active'}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {agents.map((agent) => (
                  <SelectItem key={agent.id} value={agent.id}>
                    <div className="flex flex-col">
                      <span className="font-medium">{agent.name}</span>
                      <span className="text-xs text-slate-500">Voice: {agent.voice} • Scenario: {agent.scenario}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Audio Level Indicator */}
          {isListening && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Microphone Level</span>
                <span>{Math.round(audioLevel)}%</span>
              </div>
              <Progress value={audioLevel} className="w-full" />
            </div>
          )}

          {/* Control Buttons */}
          <div className="flex gap-3">
            {conversation.status === 'idle' ? (
              <Button onClick={startConversation} className="flex-1" size="lg">
                <Phone className="h-4 w-4 mr-2" />
                Start Conversation
              </Button>
            ) : conversation.status === 'active' ? (
              <>
                <Button onClick={endConversation} variant="destructive" className="flex-1" size="lg">
                  <PhoneOff className="h-4 w-4 mr-2" />
                  End Call
                </Button>
                <Button onClick={toggleMute} variant="outline" size="lg">
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
              </>
            ) : (
              <Button disabled className="flex-1" size="lg">
                {conversation.status === 'connecting' ? 'Connecting...' : 'Call Ended'}
              </Button>
            )}
          </div>

          {/* Current Speaker Indicator */}
          {conversation.status === 'active' && (
            <div className="flex items-center justify-center p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${
                  conversation.currentSpeaker === 'user' ? 'bg-blue-500 animate-pulse' :
                  conversation.currentSpeaker === 'assistant' ? 'bg-green-500 animate-pulse' :
                  'bg-slate-300'
                }`} />
                <span className="text-sm font-medium">
                  {conversation.currentSpeaker === 'user' ? 'You are speaking' :
                   conversation.currentSpeaker === 'assistant' ? 'AI is responding' :
                   'Listening...'}
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Conversation Transcript */}
      {conversation.messages.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Live Transcript</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {conversation.messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-slate-100 text-slate-900'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs opacity-70">
                        {message.role === 'user' ? 'You' : 'AI Agent'}
                      </span>
                      <span className="text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    {message.confidence && (
                      <div className="text-xs opacity-70 mt-1">
                        Confidence: {Math.round(message.confidence * 100)}%
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
