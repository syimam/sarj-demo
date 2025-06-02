"use client";

import { useState, useRef } from "react";
import { Play, Pause, Volume2, Mic, Download, Waveform } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

interface Voice {
  voice_id: string;
  name: string;
  category: string;
  description: string;
  preview_url?: string;
}

interface VoiceSynthesisProps {
  callId?: string;
  scenario?: string;
}

export function VoiceSynthesis({ callId, scenario }: VoiceSynthesisProps) {
  const [text, setText] = useState("");
  const [selectedVoice, setSelectedVoice] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [stability, setStability] = useState([0.5]);
  const [similarity, setSimilarity] = useState([0.75]);
  const [model, setModel] = useState("eleven_multilingual_v2");
  
  const audioRef = useRef<HTMLAudioElement>(null);

  // Sample voices - in real implementation, fetch from ElevenLabs API
  const voices: Voice[] = [
    { voice_id: "21m00Tcm4TlvDq8ikWAM", name: "Rachel", category: "Professional", description: "Calm, professional female voice" },
    { voice_id: "AZnzlk1XvdvUeBnXmlld", name: "Domi", category: "Conversational", description: "Friendly, approachable female voice" },
    { voice_id: "EXAVITQu4vr4xnSDxMaL", name: "Bella", category: "Narrative", description: "Expressive, storytelling voice" },
    { voice_id: "ErXwobaYiN019PkySvjV", name: "Antoni", category: "Professional", description: "Clear, authoritative male voice" },
    { voice_id: "VR6AewLTigWG4xSOukaG", name: "Arnold", category: "Conversational", description: "Warm, engaging male voice" },
  ];

  const generateSpeech = async () => {
    if (!text.trim() || !selectedVoice) return;

    setIsGenerating(true);
    try {
      // In real implementation, call ElevenLabs API
      const response = await fetch('/api/elevenlabs/text-to-speech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          voice_id: selectedVoice,
          model_id: model,
          voice_settings: {
            stability: stability[0],
            similarity_boost: similarity[0],
            style: 0.0,
            use_speaker_boost: true
          }
        })
      });

      if (response.ok) {
        const audioBlob = await response.blob();
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
      }
    } catch (error) {
      console.error('Error generating speech:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const togglePlayback = () => {
    if (!audioRef.current || !audioUrl) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const downloadAudio = () => {
    if (!audioUrl) return;
    
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = `voice-synthesis-${callId || 'generated'}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Waveform className="h-5 w-5 text-purple-500" />
          ElevenLabs Voice Synthesis
          {scenario && <Badge variant="outline">{scenario}</Badge>}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Text Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Text to Synthesize</label>
          <Textarea
            placeholder="Enter the text you want to convert to speech..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            className="resize-none"
          />
          <div className="text-xs text-slate-500">
            {text.length} characters • {Math.ceil(text.length / 4)} estimated tokens
          </div>
        </div>

        {/* Voice Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Voice Selection</label>
          <Select value={selectedVoice} onValueChange={setSelectedVoice}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a voice..." />
            </SelectTrigger>
            <SelectContent>
              {voices.map((voice) => (
                <SelectItem key={voice.voice_id} value={voice.voice_id}>
                  <div className="flex flex-col">
                    <span className="font-medium">{voice.name}</span>
                    <span className="text-xs text-slate-500">{voice.description}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Model Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Model</label>
          <Select value={model} onValueChange={setModel}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="eleven_multilingual_v2">
                <div className="flex flex-col">
                  <span>Multilingual v2</span>
                  <span className="text-xs text-slate-500">Highest quality, 29 languages</span>
                </div>
              </SelectItem>
              <SelectItem value="eleven_flash_v2_5">
                <div className="flex flex-col">
                  <span>Flash v2.5</span>
                  <span className="text-xs text-slate-500">Ultra-low latency (~75ms)</span>
                </div>
              </SelectItem>
              <SelectItem value="eleven_turbo_v2_5">
                <div className="flex flex-col">
                  <span>Turbo v2.5</span>
                  <span className="text-xs text-slate-500">Balanced quality & speed</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Voice Settings */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Stability: {stability[0].toFixed(2)}
            </label>
            <Slider
              value={stability}
              onValueChange={setStability}
              max={1}
              min={0}
              step={0.01}
              className="w-full"
            />
            <p className="text-xs text-slate-500">
              Higher values = more consistent, lower = more expressive
            </p>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Similarity: {similarity[0].toFixed(2)}
            </label>
            <Slider
              value={similarity}
              onValueChange={setSimilarity}
              max={1}
              min={0}
              step={0.01}
              className="w-full"
            />
            <p className="text-xs text-slate-500">
              How closely to match the original voice
            </p>
          </div>
        </div>

        {/* Generate Button */}
        <Button 
          onClick={generateSpeech}
          disabled={!text.trim() || !selectedVoice || isGenerating}
          className="w-full"
          size="lg"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
              Generating Speech...
            </>
          ) : (
            <>
              <Mic className="h-4 w-4 mr-2" />
              Generate Speech
            </>
          )}
        </Button>

        {/* Audio Player */}
        {audioUrl && (
          <div className="space-y-3 p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Generated Audio</span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={togglePlayback}
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={downloadAudio}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <audio
              ref={audioRef}
              src={audioUrl}
              onEnded={() => setIsPlaying(false)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="w-full"
              controls
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
