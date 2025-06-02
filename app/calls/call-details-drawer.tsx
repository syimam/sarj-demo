"use client";

import React, { useState } from "react";
import {
  X,
  Clock,
  Globe,
  Settings,
  ArrowDownLeft,
  ArrowUpRight,
  Bot,
  Headphones,
  Code,
  MessageSquare,
  Play,
  Pause,
  Volume2,
  SkipBack,
  SkipForward,
  Download,
  Share2
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DrawerSkeleton, LoadingSpinner } from "@/components/ui/loading";

import { DisplayLocalTime } from "./display-local-time";
import { TranscriptChat } from "./[id]/transcript-chat";
import { ScenarioBadge } from "./scenario-badge";
import { StatusBadge } from "./status-badge";

interface Call {
  id: string;
  createdAt: string;
  userId: string;
  phoneNumber: string;
  scenario: string;
  scenarioData?: any;
  status: string;
  sipStatus?: string;
  totalDuration: number;
  startedAt: string;
  endedAt: string | null;
  direction: "inbound" | "outbound";
  responseBody?: any;
  language?: string;
  sipTrunkId?: string;
  transcript?: Array<{
    role: "assistant" | "user";
    content: string;
    timestamp: string;
  }>;
  audioUrl?: string;
  audioWaveform?: number[];
}

interface CallDetailsDrawerProps {
  call: Call | null;
  isOpen: boolean;
  isLoading?: boolean;
  onClose: () => void;
}

const formatDuration = (seconds: number | null) => {
  if (!seconds) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
};

export function CallDetailsDrawer({ call, isOpen, isLoading = false, onClose }: CallDetailsDrawerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(75);

  // Show loading skeleton when loading or no call data
  if (isLoading || (!call && isOpen)) {
    return <DrawerSkeleton isOpen={isOpen} />;
  }

  if (!call) return null;

  const togglePlay = () => setIsPlaying(!isPlaying);
  const progress = call.totalDuration ? (currentTime / call.totalDuration) * 100 : 0;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 z-40' : 'opacity-0 pointer-events-none -z-10'
        }`}
        onClick={onClose}
      />

      {/* Drawer - slides from right */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-5xl bg-white shadow-2xl transform transition-transform duration-500 ease-out ${
        isOpen ? 'translate-x-0 z-50' : 'translate-x-full z-50'
      }`}>
        {/* Drawer Handle */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-1 h-20 bg-[#674ea7] rounded-l-full"></div>

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${call.direction === 'inbound' ? 'bg-[#674ea7]/10' : 'bg-emerald-100'}`}>
              {call.direction === 'inbound' ? (
                <ArrowDownLeft className="h-4 w-4 text-[#674ea7]" />
              ) : (
                <ArrowUpRight className="h-4 w-4 text-emerald-600" />
              )}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{call.phoneNumber}</h2>
              <div className="flex items-center space-x-2">
                <Badge className="bg-[#674ea7]/10 text-[#674ea7] border-[#674ea7]/20 text-xs">
                  {call.direction}
                </Badge>
                <ScenarioBadge scenario={call.scenario} />
                <StatusBadge status={call.status} />
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Audio Player Section - Full Width */}
        <div className="bg-gradient-to-r from-[#674ea7]/5 to-[#674ea7]/10 border-b border-gray-100">
          <div className="p-6">
            {/* Audio Info */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-[#674ea7]/10 rounded-lg">
                  <Headphones className="h-5 w-5 text-[#674ea7]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Call Recording</h3>
                  <p className="text-sm text-gray-500">
                    <DisplayLocalTime date={call.startedAt} /> • {formatDuration(call.totalDuration)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-[#674ea7]">
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-[#674ea7]">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Waveform Visualization */}
            <div className="mb-4">
              <div className="flex items-center justify-center h-16 bg-white/50 rounded-lg border border-white/20">
                <div className="flex items-end space-x-1 h-12">
                  {Array.from({ length: 50 }, (_, i) => (
                    <div
                      key={i}
                      className={`w-1 rounded-full transition-all duration-200 ${
                        i < (progress / 100) * 50 ? 'bg-[#674ea7]' : 'bg-gray-300'
                      }`}
                      style={{
                        height: `${Math.random() * 100 + 20}%`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                <span>{Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')}</span>
                <span>{Math.floor(call.totalDuration / 60)}:{(call.totalDuration % 60).toString().padStart(2, '0')}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div
                  className="bg-[#674ea7] h-1 rounded-full transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Audio Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-[#674ea7]">
                  <SkipBack className="h-4 w-4" />
                </Button>
                <Button
                  onClick={togglePlay}
                  className="bg-[#674ea7] hover:bg-[#674ea7]/90 text-white w-10 h-10 rounded-full p-0"
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-[#674ea7]">
                  <SkipForward className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                <Volume2 className="h-4 w-4 text-gray-500" />
                <div className="w-20 bg-gray-200 rounded-full h-1">
                  <div
                    className="bg-[#674ea7] h-1 rounded-full"
                    style={{ width: `${volume}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="flex-1 overflow-hidden">
          <Tabs defaultValue="overview" className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-4 bg-gray-50 border-b border-gray-100 rounded-none h-12">
              <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:text-[#674ea7] data-[state=active]:border-b-2 data-[state=active]:border-[#674ea7]">
                Overview
              </TabsTrigger>
              <TabsTrigger value="transcript" className="data-[state=active]:bg-white data-[state=active]:text-[#674ea7] data-[state=active]:border-b-2 data-[state=active]:border-[#674ea7]">
                Transcript
              </TabsTrigger>
              <TabsTrigger value="analysis" className="data-[state=active]:bg-white data-[state=active]:text-[#674ea7] data-[state=active]:border-b-2 data-[state=active]:border-[#674ea7]">
                Analysis
              </TabsTrigger>
              <TabsTrigger value="data" className="data-[state=active]:bg-white data-[state=active]:text-[#674ea7] data-[state=active]:border-b-2 data-[state=active]:border-[#674ea7]">
                Data
              </TabsTrigger>
            </TabsList>

            {/* Tab Content */}
            <div className="flex-1 overflow-hidden">
              <TabsContent value="overview" className="h-full m-0">
                <ScrollArea className="h-full">
                  <div className="p-6 space-y-6">
                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white p-4 rounded-lg border border-gray-100">
                        <div className="flex items-center space-x-2 mb-2">
                          <Clock className="h-4 w-4 text-[#674ea7]" />
                          <span className="text-xs text-gray-500 uppercase tracking-wide">Duration</span>
                        </div>
                        <div className="text-lg font-semibold text-gray-900">{formatDuration(call.totalDuration)}</div>
                      </div>
                      {call.language && (
                        <div className="bg-white p-4 rounded-lg border border-gray-100">
                          <div className="flex items-center space-x-2 mb-2">
                            <Globe className="h-4 w-4 text-[#674ea7]" />
                            <span className="text-xs text-gray-500 uppercase tracking-wide">Language</span>
                          </div>
                          <div className="text-lg font-semibold text-gray-900">{call.language}</div>
                        </div>
                      )}
                      {call.transcript && (
                        <div className="bg-white p-4 rounded-lg border border-gray-100">
                          <div className="flex items-center space-x-2 mb-2">
                            <MessageSquare className="h-4 w-4 text-[#674ea7]" />
                            <span className="text-xs text-gray-500 uppercase tracking-wide">Messages</span>
                          </div>
                          <div className="text-lg font-semibold text-gray-900">{call.transcript.length}</div>
                        </div>
                      )}
                      <div className="bg-white p-4 rounded-lg border border-gray-100">
                        <div className="flex items-center space-x-2 mb-2">
                          <Settings className="h-4 w-4 text-[#674ea7]" />
                          <span className="text-xs text-gray-500 uppercase tracking-wide">Status</span>
                        </div>
                        <div className="text-lg font-semibold text-gray-900 capitalize">{call.status}</div>
                      </div>
                    </div>

                    {/* Call Metadata */}
                    <div className="bg-white p-6 rounded-lg border border-gray-100">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Settings className="h-5 w-5 mr-2 text-[#674ea7]" />
                        Call Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Call ID</p>
                          <p className="font-mono text-sm text-gray-900">{call.id}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">User ID</p>
                          <p className="font-mono text-sm text-gray-900">{call.userId}</p>
                        </div>
                        {call.sipTrunkId && (
                          <div>
                            <p className="text-sm text-gray-500 mb-1">SIP Trunk ID</p>
                            <p className="font-mono text-sm text-gray-900">{call.sipTrunkId}</p>
                          </div>
                        )}
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Started At</p>
                          <p className="text-sm text-gray-900"><DisplayLocalTime date={call.startedAt} /></p>
                        </div>
                        {call.endedAt && (
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Ended At</p>
                            <p className="text-sm text-gray-900"><DisplayLocalTime date={call.endedAt} /></p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="transcript" className="h-full m-0">
                <ScrollArea className="h-full">
                  <div className="p-6">
                    {call.transcript && call.transcript.length > 0 ? (
                      <div className="bg-white rounded-lg border border-gray-100">
                        <div className="p-4 border-b border-gray-100">
                          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                            <Bot className="h-5 w-5 mr-2 text-[#674ea7]" />
                            Conversation Transcript
                          </h3>
                        </div>
                        <div className="p-4">
                          <TranscriptChat transcript={call.transcript} />
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-64 bg-white rounded-lg border border-gray-100">
                        <div className="text-center">
                          <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                          <p className="text-gray-500">No transcript available for this call</p>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="analysis" className="h-full m-0">
                <ScrollArea className="h-full">
                  <div className="p-6 space-y-6">
                    {/* Voice Analysis */}
                    <div className="bg-white p-6 rounded-lg border border-gray-100">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Bot className="h-5 w-5 mr-2 text-[#674ea7]" />
                        Voice Analysis
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Sentiment</span>
                          <span className="font-medium text-green-600">Positive</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Emotion</span>
                          <span className="font-medium text-gray-900">Satisfied</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Speech Rate</span>
                          <span className="font-medium text-gray-900">Normal</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Clarity</span>
                          <span className="font-medium text-gray-900">95%</span>
                        </div>
                      </div>
                    </div>

                    {/* Call Quality Metrics */}
                    <div className="bg-white p-6 rounded-lg border border-gray-100">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Call Quality</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-gray-500">Audio Quality</span>
                            <span className="text-sm font-medium">92%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-gray-500">Connection Stability</span>
                            <span className="text-sm font-medium">88%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '88%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-gray-500">Voice Clarity</span>
                            <span className="text-sm font-medium">95%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-[#674ea7] h-2 rounded-full" style={{ width: '95%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="data" className="h-full m-0">
                <ScrollArea className="h-full">
                  <div className="p-6">
                    {call.responseBody && Object.keys(call.responseBody).length > 0 ? (
                      <div className="bg-white rounded-lg border border-gray-100">
                        <div className="p-4 border-b border-gray-100">
                          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                            <Code className="h-5 w-5 mr-2 text-[#674ea7]" />
                            Response Data
                          </h3>
                        </div>
                        <div className="p-4">
                          <div className="bg-gray-50 rounded-lg p-4 overflow-auto">
                            <pre className="text-sm text-gray-800 font-mono whitespace-pre-wrap">
                              {JSON.stringify(call.responseBody, null, 2)}
                            </pre>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-64 bg-white rounded-lg border border-gray-100">
                        <div className="text-center">
                          <Code className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                          <p className="text-gray-500">No response data available for this call</p>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </>
  );
}
