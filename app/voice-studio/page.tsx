import React from "react";
import { Mic, Bot, Waveform, Headphones, Zap, Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/page-header";

export default function VoiceStudio() {
  const features = [
    {
      title: "Text-to-Speech Synthesis",
      description: "Convert text to lifelike speech with 32 languages and 3000+ voices",
      icon: Mic,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      href: "/voice-studio/text-to-speech",
      status: "Available",
      capabilities: ["Ultra-low latency (75ms)", "32 languages", "Emotional expression"]
    },
    {
      title: "Voice Cloning Studio",
      description: "Create custom AI agent voices from audio samples",
      icon: Bot,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      href: "/voice-studio/voice-cloning",
      status: "Available",
      capabilities: ["Professional cloning", "Instant cloning", "Voice design"]
    },
    {
      title: "Live Conversation AI",
      description: "Real-time conversational AI with voice interaction",
      icon: Waveform,
      color: "text-green-600",
      bgColor: "bg-green-50",
      href: "/voice-studio/live-conversation",
      status: "Beta",
      capabilities: ["Real-time STT/TTS", "WebSocket streaming", "Emotion detection"]
    },
    {
      title: "Voice Analysis",
      description: "Analyze call recordings for sentiment, emotion, and quality",
      icon: Headphones,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      href: "/voice-studio/voice-analysis",
      status: "Coming Soon",
      capabilities: ["Sentiment analysis", "Emotion detection", "Speech quality metrics"]
    },
    {
      title: "Speech-to-Text",
      description: "Convert speech to text with high accuracy and speed",
      icon: Zap,
      color: "text-red-600",
      bgColor: "bg-red-50",
      href: "/voice-studio/speech-to-text",
      status: "Available",
      capabilities: ["Real-time transcription", "Multiple languages", "Speaker diarization"]
    },
    {
      title: "Voice Dubbing",
      description: "Automatically dub content into different languages",
      icon: Users,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      href: "/voice-studio/dubbing",
      status: "Available",
      capabilities: ["Multi-language dubbing", "Voice preservation", "Lip-sync optimization"]
    },
  ];

  const useCases = [
    {
      title: "Customer Service Enhancement",
      description: "Create personalized AI agents with custom voices for each department",
      benefits: ["Consistent brand voice", "24/7 availability", "Multilingual support"]
    },
    {
      title: "Call Quality Analysis",
      description: "Analyze customer calls for sentiment, satisfaction, and training insights",
      benefits: ["Automated QA scoring", "Emotion tracking", "Performance insights"]
    },
    {
      title: "Agent Training",
      description: "Generate realistic training scenarios with various customer personas",
      benefits: ["Diverse scenarios", "Consistent training", "Cost-effective"]
    },
    {
      title: "Outbound Campaigns",
      description: "Scale personalized outbound calls with natural-sounding AI voices",
      benefits: ["Higher engagement", "Scalable campaigns", "Cost reduction"]
    }
  ];

  return (
    <div className="h-full w-full">
      <div className="flex flex-col h-full">
        <PageHeader
          title="Voice Studio"
          description="Powered by ElevenLabs AI - Transform your call center with advanced voice technology"
        />

        <div className="flex-1 overflow-auto p-6 space-y-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">3000+</div>
                <div className="text-sm text-slate-600">Available Voices</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">32</div>
                <div className="text-sm text-slate-600">Languages</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">75ms</div>
                <div className="text-sm text-slate-600">Latency</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">99.9%</div>
                <div className="text-sm text-slate-600">Uptime</div>
              </CardContent>
            </Card>
          </div>

          {/* Features Grid */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Voice AI Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Card key={feature.title} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className={`p-3 rounded-lg ${feature.bgColor}`}>
                          <Icon className={`h-6 w-6 ${feature.color}`} />
                        </div>
                        <Badge 
                          variant={feature.status === 'Available' ? 'default' : 
                                  feature.status === 'Beta' ? 'secondary' : 'outline'}
                          className="text-xs"
                        >
                          {feature.status}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-slate-600 text-sm">{feature.description}</p>
                      
                      <div className="space-y-2">
                        <div className="text-xs font-medium text-slate-700">Key Capabilities:</div>
                        <ul className="space-y-1">
                          {feature.capabilities.map((capability, index) => (
                            <li key={index} className="text-xs text-slate-600 flex items-center">
                              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mr-2" />
                              {capability}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button 
                        className="w-full" 
                        variant={feature.status === 'Available' ? 'default' : 'outline'}
                        disabled={feature.status === 'Coming Soon'}
                      >
                        {feature.status === 'Available' ? 'Try Now' : 
                         feature.status === 'Beta' ? 'Join Beta' : 'Coming Soon'}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Use Cases */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Use Cases for Your Call Center</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {useCases.map((useCase, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{useCase.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-slate-600 text-sm">{useCase.description}</p>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-slate-700">Benefits:</div>
                      <ul className="space-y-1">
                        {useCase.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="text-sm text-slate-600 flex items-center">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Integration Info */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    Ready to Integrate ElevenLabs?
                  </h3>
                  <p className="text-slate-600 mb-4">
                    Transform your call center with cutting-edge voice AI technology. Get started with our 
                    comprehensive integration guide and API documentation.
                  </p>
                  <div className="flex gap-3">
                    <Button>View API Documentation</Button>
                    <Button variant="outline">Contact Sales</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
