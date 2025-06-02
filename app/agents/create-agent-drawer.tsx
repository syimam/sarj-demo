"use client";

import React, { useState } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Bot,
  User,
  Brain,
  Database,
  Wrench,
  CheckCircle,
  Upload,
  Play,
  Mic,
  Settings,
  Globe,
  Calendar,
  FileText,
  Search,
  Zap
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { LoadingSpinner } from "@/components/ui/loading";

interface CreateAgentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AgentData {
  name: string;
  profilePicture: string | null;
  voice: string;
  personalityPrompt: string;
  knowledgeDomain: string[];
  responseStyle: string;
  exampleInteractions: Array<{ user: string; agent: string }>;
  enableMemory: boolean;
  memoryScope: string;
  memoryEntries: Array<{ key: string; value: string }>;
  enabledTools: string[];
  isPublished: boolean;
}

const STEPS = [
  { id: 1, title: "Basic Identity", icon: User, description: "Name, picture, and voice" },
  { id: 2, title: "Personality", icon: Brain, description: "Behavior and response style" },
  { id: 3, title: "Memory", icon: Database, description: "Context and memory settings" },
  { id: 4, title: "Tools", icon: Wrench, description: "Capabilities and integrations" },
  { id: 5, title: "Review", icon: CheckCircle, description: "Summary and confirmation" }
];

const VOICE_OPTIONS = [
  { id: "sarah", name: "Sarah", description: "Professional female voice", sample: "Hello, I'm Sarah, your AI assistant." },
  { id: "james", name: "James", description: "Friendly male voice", sample: "Hi there! I'm James, ready to help you today." },
  { id: "emma", name: "Emma", description: "Warm female voice", sample: "Welcome! I'm Emma, your personal AI companion." },
  { id: "alex", name: "Alex", description: "Neutral professional voice", sample: "Greetings! I'm Alex, here to assist you." }
];

const KNOWLEDGE_DOMAINS = [
  "Customer Support", "Sales", "Healthcare", "Education", "Finance",
  "Technology", "Travel", "Real Estate", "Legal", "Marketing"
];

const RESPONSE_STYLES = [
  { id: "formal", name: "Formal", description: "Professional and structured responses" },
  { id: "friendly", name: "Friendly", description: "Warm and conversational tone" },
  { id: "concise", name: "Concise", description: "Brief and to-the-point answers" },
  { id: "detailed", name: "Detailed", description: "Comprehensive and thorough responses" }
];

const AVAILABLE_TOOLS = [
  { id: "web_search", name: "Web Search", description: "Search the internet for information", icon: Search },
  { id: "document_reading", name: "Document Reading", description: "Read and analyze documents", icon: FileText },
  { id: "calendar_access", name: "Calendar Access", description: "Schedule and manage appointments", icon: Calendar },
  { id: "api_calls", name: "Custom API Calls", description: "Integrate with external services", icon: Zap },
  { id: "file_access", name: "File Access", description: "Read and write files", icon: Upload }
];

export function CreateAgentDrawer({ isOpen, onClose }: CreateAgentDrawerProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [agentData, setAgentData] = useState<AgentData>({
    name: "",
    profilePicture: null,
    voice: "",
    personalityPrompt: "",
    knowledgeDomain: [],
    responseStyle: "",
    exampleInteractions: [{ user: "", agent: "" }],
    enableMemory: true,
    memoryScope: "session",
    memoryEntries: [{ key: "", value: "" }],
    enabledTools: [],
    isPublished: false
  });

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = async (publish: boolean = false) => {
    setIsLoading(true);
    setTimeout(() => {
      setAgentData({ ...agentData, isPublished: publish });
      setIsLoading(false);
      if (publish) {
        onClose();
      }
    }, 1500);
  };

  const updateAgentData = (updates: Partial<AgentData>) => {
    setAgentData({ ...agentData, ...updates });
  };

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return agentData.name.length > 0 && agentData.voice.length > 0;
      case 2:
        return agentData.personalityPrompt.length > 0 && agentData.responseStyle.length > 0;
      case 3:
        return true;
      case 4:
        return true;
      case 5:
        return true;
      default:
        return false;
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 z-40' : 'opacity-0 pointer-events-none -z-10'
        }`}
        onClick={onClose}
      />

      <div className={`fixed top-0 right-0 h-full w-full max-w-6xl bg-white shadow-2xl transform transition-transform duration-500 ease-out ${
        isOpen ? 'translate-x-0 z-50' : 'translate-x-full z-50'
      }`}>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-1 h-20 bg-[#674ea7] rounded-l-full"></div>

        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#674ea7]/10 rounded-lg">
              <Bot className="h-6 w-6 text-[#674ea7]" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Create New Agent</h2>
              <p className="text-sm text-gray-500">Step {currentStep} of {STEPS.length}: {STEPS[currentStep - 1].title}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="bg-gray-50 border-b border-gray-100 px-6 py-4">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            {STEPS.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;

              return (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                      isCompleted
                        ? 'bg-[#674ea7] border-[#674ea7] text-white'
                        : isActive
                          ? 'border-[#674ea7] text-[#674ea7] bg-white'
                          : 'border-gray-300 text-gray-400 bg-white'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <StepIcon className="h-5 w-5" />
                      )}
                    </div>
                    <div className="mt-2 text-center">
                      <p className={`text-xs font-medium ${
                        isActive ? 'text-[#674ea7]' : isCompleted ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {step.title}
                      </p>
                      <p className="text-xs text-gray-400 hidden sm:block">{step.description}</p>
                    </div>
                  </div>
                  {index < STEPS.length - 1 && (
                    <div className={`w-16 h-0.5 mx-4 ${
                      isCompleted ? 'bg-[#674ea7]' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col">
          <ScrollArea className="flex-1">
            <div className="p-6">
              {currentStep === 1 && (
                <div className="max-w-4xl mx-auto space-y-6">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">Basic Identity Setup</h3>
                    <p className="text-gray-600">Define how your agent introduces itself to users</p>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
                        <CardHeader>
                          <CardTitle className="flex items-center text-lg">
                            <User className="h-5 w-5 mr-2 text-[#674ea7]" />
                            Agent Information
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <Label htmlFor="agent-name" className="text-sm font-medium text-gray-700">
                              Agent Name *
                            </Label>
                            <Input
                              id="agent-name"
                              placeholder="e.g., Sarah Customer Support"
                              value={agentData.name}
                              onChange={(e) => updateAgentData({ name: e.target.value })}
                              className="mt-1"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="space-y-6">
                      <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
                        <CardHeader>
                          <CardTitle className="flex items-center text-lg">
                            <Mic className="h-5 w-5 mr-2 text-[#674ea7]" />
                            Voice Selection *
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <RadioGroup
                            value={agentData.voice}
                            onValueChange={(value) => updateAgentData({ voice: value })}
                          >
                            {VOICE_OPTIONS.map((voice) => (
                              <div key={voice.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                                <RadioGroupItem value={voice.id} id={voice.id} />
                                <div className="flex-1">
                                  <Label htmlFor={voice.id} className="font-medium cursor-pointer">
                                    {voice.name}
                                  </Label>
                                  <p className="text-sm text-gray-500">{voice.description}</p>
                                </div>
                                <Button variant="ghost" size="sm" className="text-[#674ea7] hover:bg-[#674ea7]/10">
                                  <Play className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </RadioGroup>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="max-w-4xl mx-auto space-y-6">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">Personality & Behavior Settings</h3>
                    <p className="text-gray-600">Define your agent's tone, expertise, and conversation style</p>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
                        <CardHeader>
                          <CardTitle className="flex items-center text-lg">
                            <Brain className="h-5 w-5 mr-2 text-[#674ea7]" />
                            Personality Prompt *
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Textarea
                            placeholder="You are a friendly travel assistant who helps people plan trips..."
                            value={agentData.personalityPrompt}
                            onChange={(e) => updateAgentData({ personalityPrompt: e.target.value })}
                            className="min-h-32 resize-none"
                          />
                          <p className="text-xs text-gray-500 mt-2">
                            {agentData.personalityPrompt.length}/500 characters
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="space-y-6">
                      <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
                        <CardHeader>
                          <CardTitle className="flex items-center text-lg">
                            <Settings className="h-5 w-5 mr-2 text-[#674ea7]" />
                            Response Style *
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <RadioGroup
                            value={agentData.responseStyle}
                            onValueChange={(value) => updateAgentData({ responseStyle: value })}
                          >
                            {RESPONSE_STYLES.map((style) => (
                              <div key={style.id} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                                <RadioGroupItem value={style.id} id={style.id} className="mt-1" />
                                <div className="flex-1">
                                  <Label htmlFor={style.id} className="font-medium cursor-pointer">
                                    {style.name}
                                  </Label>
                                  <p className="text-sm text-gray-500">{style.description}</p>
                                </div>
                              </div>
                            ))}
                          </RadioGroup>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="max-w-4xl mx-auto space-y-6">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">Memory & Context Handling</h3>
                    <p className="text-gray-600">Configure how your agent remembers and uses conversation context</p>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
                        <CardHeader>
                          <CardTitle className="flex items-center text-lg">
                            <Database className="h-5 w-5 mr-2 text-[#674ea7]" />
                            Memory Configuration
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label className="font-medium">Enable Memory</Label>
                              <p className="text-sm text-gray-500">Allow agent to remember conversations</p>
                            </div>
                            <Switch
                              checked={agentData.enableMemory}
                              onCheckedChange={(checked) => updateAgentData({ enableMemory: checked })}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="space-y-6">
                      <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
                        <CardHeader>
                          <CardTitle className="flex items-center text-lg">
                            <FileText className="h-5 w-5 mr-2 text-[#674ea7]" />
                            Pre-configured Memory
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-sm text-gray-600">
                            Add key information the agent should remember about users or context.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="max-w-4xl mx-auto space-y-6">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">Tools & Abilities</h3>
                    <p className="text-gray-600">Extend your agent's capabilities with powerful tools and integrations</p>
                  </div>
                  <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center text-lg">
                        <Wrench className="h-5 w-5 mr-2 text-[#674ea7]" />
                        Available Tools
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {AVAILABLE_TOOLS.map((tool) => {
                          const ToolIcon = tool.icon;
                          const isEnabled = agentData.enabledTools.includes(tool.id);

                          return (
                            <div
                              key={tool.id}
                              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                isEnabled
                                  ? 'border-[#674ea7] bg-[#674ea7]/5'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                              onClick={() => {
                                if (isEnabled) {
                                  updateAgentData({
                                    enabledTools: agentData.enabledTools.filter(t => t !== tool.id)
                                  });
                                } else {
                                  updateAgentData({
                                    enabledTools: [...agentData.enabledTools, tool.id]
                                  });
                                }
                              }}
                            >
                              <div className="flex items-start space-x-3">
                                <div className={`p-2 rounded-lg ${
                                  isEnabled ? 'bg-[#674ea7]/10' : 'bg-gray-100'
                                }`}>
                                  <ToolIcon className={`h-5 w-5 ${
                                    isEnabled ? 'text-[#674ea7]' : 'text-gray-500'
                                  }`} />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <h4 className="font-medium text-gray-900">{tool.name}</h4>
                                    <Checkbox
                                      checked={isEnabled}
                                      onChange={() => {}}
                                      className="pointer-events-none"
                                    />
                                  </div>
                                  <p className="text-sm text-gray-500 mt-1">{tool.description}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {currentStep === 5 && (
                <div className="max-w-4xl mx-auto space-y-6">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">Agent Summary & Confirmation</h3>
                    <p className="text-gray-600">Review your agent configuration before publishing</p>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
                        <CardHeader>
                          <CardTitle className="flex items-center text-lg">
                            <Bot className="h-5 w-5 mr-2 text-[#674ea7]" />
                            Agent Preview
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center space-x-4 mb-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#674ea7]/20 to-[#674ea7]/40 rounded-lg flex items-center justify-center">
                              <Bot className="h-8 w-8 text-[#674ea7]" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">
                                {agentData.name || "Unnamed Agent"}
                              </h3>
                              <p className="text-sm text-gray-500">
                                Voice: {VOICE_OPTIONS.find(v => v.id === agentData.voice)?.name || "Not selected"}
                              </p>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <Label className="font-medium text-gray-900">Personality</Label>
                              <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                                {agentData.personalityPrompt || "No personality defined"}
                              </p>
                            </div>
                            <div>
                              <Label className="font-medium text-gray-900">Response Style</Label>
                              <p className="text-sm text-gray-600 mt-1">
                                {RESPONSE_STYLES.find(s => s.id === agentData.responseStyle)?.name || "Not selected"}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="space-y-6">
                      <Card className="border-0 shadow-sm bg-[#674ea7]/5 border-[#674ea7]/20">
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <CheckCircle className="h-12 w-12 text-[#674ea7] mx-auto mb-3" />
                            <h3 className="font-semibold text-gray-900 mb-2">Ready to Publish!</h3>
                            <p className="text-sm text-gray-600 mb-4">
                              Your agent is configured and ready to start helping users.
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="border-t border-gray-100 bg-white px-6 py-4 flex-shrink-0">
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="flex items-center"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              <div className="flex items-center space-x-3">
                {currentStep === STEPS.length ? (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => handleSave(false)}
                      disabled={isLoading}
                      className="flex items-center"
                    >
                      {isLoading && <LoadingSpinner size="sm" className="mr-2" />}
                      Save as Draft
                    </Button>
                    <Button
                      onClick={() => handleSave(true)}
                      disabled={isLoading}
                      className="bg-[#674ea7] hover:bg-[#674ea7]/90 text-white flex items-center"
                    >
                      {isLoading && <LoadingSpinner size="sm" className="mr-2" />}
                      Publish Agent
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={handleNext}
                    disabled={!isStepValid(currentStep)}
                    className="bg-[#674ea7] hover:bg-[#674ea7]/90 text-white flex items-center"
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
