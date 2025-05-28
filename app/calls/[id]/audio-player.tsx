"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, Download, SkipBack, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface AudioPlayerProps {
  audioUrl: string;
  duration: number;
  title?: string;
}

export function AudioPlayer({ audioUrl, duration, title = "Call Recording" }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      setIsLoading(true);
      audioRef.current.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedData = () => {
    setIsLoading(false);
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      const newTime = (value[0] / 100) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0] / 100;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const skipTime = (seconds: number) => {
    if (audioRef.current) {
      const newTime = Math.max(0, Math.min(duration, audioRef.current.currentTime + seconds));
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const downloadAudio = () => {
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = `${title}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('loadeddata', handleLoadedData);
      audio.addEventListener('ended', () => setIsPlaying(false));

      return () => {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('loadeddata', handleLoadedData);
        audio.removeEventListener('ended', () => setIsPlaying(false));
      };
    }
  }, []);

  return (
    <div className="space-y-2">
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      {/* Main Controls */}
      <div className="flex items-center space-x-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => skipTime(-10)}
          className="h-7 w-7 p-0"
        >
          <SkipBack className="h-3 w-3" />
        </Button>

        <Button
          variant="default"
          size="sm"
          onClick={togglePlayPause}
          disabled={isLoading}
          className="h-8 w-8 p-0 rounded-full"
        >
          {isLoading ? (
            <div className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4 ml-0.5" />
          )}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => skipTime(10)}
          className="h-7 w-7 p-0"
        >
          <SkipForward className="h-3 w-3" />
        </Button>

        <div className="flex-1 space-y-1">
          {/* Progress Bar */}
          <Slider
            value={[duration > 0 ? (currentTime / duration) * 100 : 0]}
            onValueChange={handleSeek}
            max={100}
            step={0.1}
            className="w-full"
          />

          {/* Time Display */}
          <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-1">
          <Volume2 className="h-3 w-3 text-slate-500" />
          <Slider
            value={[volume * 100]}
            onValueChange={handleVolumeChange}
            max={100}
            step={1}
            className="w-16"
          />
        </div>

        {/* Download Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={downloadAudio}
          className="h-7 w-7 p-0"
        >
          <Download className="h-3 w-3" />
        </Button>
      </div>

      {/* Compact Waveform */}
      <div className="h-10 bg-slate-100 dark:bg-slate-800 rounded flex items-center justify-center">
        <div className="flex items-end space-x-0.5 h-6">
          {Array.from({ length: 40 }, (_, i) => (
            <div
              key={i}
              className={`w-0.5 bg-blue-500 rounded-sm transition-all duration-150 ${
                (currentTime / duration) * 40 > i ? 'opacity-100' : 'opacity-30'
              }`}
              style={{
                height: `${Math.random() * 100 + 20}%`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
