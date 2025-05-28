"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Download, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface AudioWaveformProps {
  audioUrl?: string;
  waveformData: number[];
  duration: number;
}

export function AudioWaveform({ audioUrl, waveformData, duration }: AudioWaveformProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState([75]);
  const audioRef = useRef<HTMLAudioElement>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleSeek = (value: number[]) => {
    const newTime = (value[0] / 100) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value[0] / 100;
    }
  };

  const progress = (currentTime / duration) * 100;

  return (
    <div className="space-y-4">
      {/* Audio element */}
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
          preload="metadata"
        />
      )}

      {/* Waveform Visualization */}
      <div className="relative">
        <div className="flex items-end justify-center space-x-1 h-20 bg-slate-50 rounded-lg p-3 overflow-hidden">
          {waveformData.map((amplitude, index) => {
            const height = Math.max(3, amplitude * 60);
            const isActive = (index / waveformData.length) * 100 <= progress;

            return (
              <div
                key={index}
                className={`w-1 rounded-full transition-all duration-150 ${
                  isActive
                    ? 'bg-blue-500'
                    : 'bg-slate-300'
                }`}
                style={{ height: `${height}px` }}
              />
            );
          })}
        </div>

        {/* Progress overlay */}
        <div
          className="absolute top-0 left-0 h-full bg-blue-500/10 rounded-lg transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Compact Controls */}
      <div className="space-y-3">
        {/* Play/Pause and Time */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={togglePlayPause}
              className="w-8 h-8 rounded-full p-0"
              disabled={!audioUrl}
            >
              {isPlaying ? (
                <Pause className="h-3 w-3" />
              ) : (
                <Play className="h-3 w-3 ml-0.5" />
              )}
            </Button>

            <div className="text-xs text-slate-600 font-mono">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" disabled={!audioUrl} className="h-6 w-6 p-0">
              <Download className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Progress Slider */}
        <Slider
          value={[progress]}
          onValueChange={handleSeek}
          max={100}
          step={0.1}
          className="w-full"
          disabled={!audioUrl}
        />

        {/* Volume Control */}
        <div className="flex items-center space-x-2">
          <Volume2 className="h-3 w-3 text-slate-400" />
          <Slider
            value={volume}
            onValueChange={handleVolumeChange}
            max={100}
            step={1}
            className="w-20"
            disabled={!audioUrl}
          />
          <span className="text-xs text-slate-500 w-8">{volume[0]}%</span>
        </div>
      </div>

      {/* Audio Status */}
      {!audioUrl && (
        <div className="text-center py-2">
          <p className="text-xs text-slate-500">Audio recording not available</p>
          <p className="text-xs text-slate-400">Waveform shows call activity pattern</p>
        </div>
      )}
    </div>
  );
}
