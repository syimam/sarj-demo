import React from "react";
import { Bot, Wrench, Brain, Zap } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AgentBuilder() {
  const features = [
    {
      title: "Voice Configuration",
      description: "Configure voice characteristics, tone, and speaking patterns",
      icon: Bot,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Conversation Flow",
      description: "Design conversation logic and response patterns",
      icon: Brain,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Integration Setup",
      description: "Connect with CRM, databases, and external APIs",
      icon: Zap,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Training & Testing",
      description: "Train your agent and test different scenarios",
      icon: Wrench,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <div className="h-full w-full">
      <div className="flex flex-col h-full p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">AI Agent Builder</h1>
          <p className="text-slate-600">Create and customize AI agents with advanced conversation capabilities.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div className={`p-2 rounded-lg ${feature.bgColor} mr-3`}>
                      <Icon className={`h-5 w-5 ${feature.color}`} />
                    </div>
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Bot className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">AI Agent Builder</h3>
            <p className="text-slate-600 max-w-md">
              The AI agent builder interface will be available here. 
              You'll be able to create sophisticated AI agents with custom personalities, knowledge bases, and conversation flows.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
