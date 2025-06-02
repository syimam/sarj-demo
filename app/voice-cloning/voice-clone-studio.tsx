"use client";

import { useState, useRef } from "react";
import { Upload, Mic, MicOff, Play, Pause, Trash2, Download, User, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface AudioSample {
  id: string;
  name: string;
  duration: number;
  url: string;
  file: File;
}

interface ClonedVoice {
  voice_id: string;
  name: string;
  status: 'processing' | 'ready' | 'failed';
  created_at: string;
  sample_count: number;
}

export function VoiceCloneStudio() {
  const [voiceName, setVoiceName] = useState("");
  const [voiceDescription, setVoiceDescription] = useState("");
  const [audioSamples, setAudioSamples] = useState<AudioSample[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isCloning, setIsCloning] = useState(false);
  const [cloneProgress, setCloneProgress] = useState(0);
  const [clonedVoices, setClonedVoices] = useState<ClonedVoice[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    files.forEach((file) => {
      if (file.type.startsWith('audio/')) {
        const url = URL.createObjectURL(file);
        const audio = new Audio(url);
        
        audio.addEventListener('loadedmetadata', () => {
          const sample: AudioSample = {
            id: Math.random().toString(36).substr(2, 9),
            name: file.name,
            duration: audio.duration,
            url,
            file
          };
          
          setAudioSamples(prev => [...prev, sample]);
        });
      }
    });
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        const file = new File([audioBlob], `recording-${Date.now()}.wav`, { type: 'audio/wav' });
        
        const sample: AudioSample = {
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          duration: 0, // Will be updated when audio loads
          url,
          file
        };
        
        setAudioSamples(prev => [...prev, sample]);
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const removeSample = (id: string) => {
    setAudioSamples(prev => {
      const sample = prev.find(s => s.id === id);
      if (sample) {
        URL.revokeObjectURL(sample.url);
      }
      return prev.filter(s => s.id !== id);
    });
  };

  const createVoiceClone = async () => {
    if (!voiceName.trim() || audioSamples.length === 0) return;

    setIsCloning(true);
    setCloneProgress(0);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setCloneProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 500);

      // In real implementation, upload files to ElevenLabs
      const formData = new FormData();
      formData.append('name', voiceName);
      formData.append('description', voiceDescription);
      
      audioSamples.forEach((sample, index) => {
        formData.append(`files`, sample.file);
      });

      const response = await fetch('/api/elevenlabs/voice-clone', {
        method: 'POST',
        body: formData
      });

      clearInterval(progressInterval);
      setCloneProgress(100);

      if (response.ok) {
        const result = await response.json();
        
        const newVoice: ClonedVoice = {
          voice_id: result.voice_id,
          name: voiceName,
          status: 'ready',
          created_at: new Date().toISOString(),
          sample_count: audioSamples.length
        };
        
        setClonedVoices(prev => [...prev, newVoice]);
        
        // Reset form
        setVoiceName("");
        setVoiceDescription("");
        setAudioSamples([]);
      }
    } catch (error) {
      console.error('Error creating voice clone:', error);
    } finally {
      setIsCloning(false);
      setTimeout(() => setCloneProgress(0), 2000);
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const totalDuration = audioSamples.reduce((sum, sample) => sum + sample.duration, 0);

  return (
    <div className="space-y-6">
      {/* Voice Clone Creation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-blue-500" />
            Create Voice Clone
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Voice Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Voice Name</label>
              <Input
                placeholder="e.g., Customer Service Agent"
                value={voiceName}
                onChange={(e) => setVoiceName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description (Optional)</label>
              <Input
                placeholder="e.g., Professional, friendly tone"
                value={voiceDescription}
                onChange={(e) => setVoiceDescription(e.target.value)}
              />
            </div>
          </div>

          {/* Audio Sample Collection */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Audio Samples</label>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Files
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={isRecording ? stopRecording : startRecording}
                  className={isRecording ? "text-red-600" : ""}
                >
                  {isRecording ? (
                    <>
                      <MicOff className="h-4 w-4 mr-2" />
                      Stop Recording
                    </>
                  ) : (
                    <>
                      <Mic className="h-4 w-4 mr-2" />
                      Record Audio
                    </>
                  )}
                </Button>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />

            {/* Sample Requirements */}
            <Alert>
              <AlertDescription>
                For best results, provide 3-5 audio samples (1-5 minutes each) with clear speech, 
                minimal background noise, and consistent audio quality. Total duration: {formatDuration(totalDuration)}
              </AlertDescription>
            </Alert>

            {/* Audio Samples List */}
            {audioSamples.length > 0 && (
              <div className="space-y-2">
                {audioSamples.map((sample) => (
                  <div key={sample.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Play className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{sample.name}</p>
                        <p className="text-xs text-slate-500">
                          {sample.duration > 0 ? formatDuration(sample.duration) : 'Loading...'}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSample(sample.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Clone Progress */}
          {isCloning && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Creating voice clone...</span>
                <span>{cloneProgress}%</span>
              </div>
              <Progress value={cloneProgress} className="w-full" />
            </div>
          )}

          {/* Create Clone Button */}
          <Button
            onClick={createVoiceClone}
            disabled={!voiceName.trim() || audioSamples.length === 0 || isCloning}
            className="w-full"
            size="lg"
          >
            {isCloning ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                Creating Voice Clone...
              </>
            ) : (
              <>
                <Bot className="h-4 w-4 mr-2" />
                Create Voice Clone
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Cloned Voices Library */}
      {clonedVoices.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-green-500" />
              Your Cloned Voices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {clonedVoices.map((voice) => (
                <div key={voice.voice_id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{voice.name}</h3>
                    <Badge 
                      variant={voice.status === 'ready' ? 'default' : 'secondary'}
                      className={voice.status === 'ready' ? 'bg-green-100 text-green-800' : ''}
                    >
                      {voice.status}
                    </Badge>
                  </div>
                  <div className="text-xs text-slate-500 space-y-1">
                    <p>Created: {new Date(voice.created_at).toLocaleDateString()}</p>
                    <p>Samples: {voice.sample_count}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Play className="h-3 w-3 mr-1" />
                      Test
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="h-3 w-3 mr-1" />
                      Use
                    </Button>
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
