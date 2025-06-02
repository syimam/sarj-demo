"use client";

import React, { useState } from "react";
import { Users, Plus, Search, UserCheck, UserX, Bot, Headphones, Activity, Clock, Zap, X, Sparkles } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CreateAgentDrawer } from "./create-agent-drawer";

export default function Agents() {
  const [isCreateDrawerOpen, setIsCreateDrawerOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  // Simulate having agents or not (set to empty array for first-time experience)
  // Change this to [] to see first-time experience
  const [agents, setAgents] = React.useState([
    {
      id: 1,
      name: "Customer Support Pro",
      type: "Customer Support",
      status: "active",
      calls: 156,
      sentiment: 8.7,
      efficiency: 94,
      lastActive: "2 min ago"
    },
    {
      id: 2,
      name: "Sales Assistant AI",
      type: "Sales",
      status: "active",
      calls: 134,
      sentiment: 8.2,
      efficiency: 91,
      lastActive: "5 min ago"
    },
    {
      id: 3,
      name: "Technical Helper",
      type: "Technical Support",
      status: "active",
      calls: 98,
      sentiment: 8.5,
      efficiency: 89,
      lastActive: "1 min ago"
    },
    {
      id: 4,
      name: "Billing Support",
      type: "Billing",
      status: "offline",
      calls: 87,
      sentiment: 8.9,
      efficiency: 96,
      lastActive: "1 hour ago"
    }
  ]);

  const stats = [
    {
      label: "Total Agents",
      value: agents.length.toString(),
      change: "+2 this week",
      icon: Bot
    },
    {
      label: "Active Agents",
      value: agents.filter(a => a.status === 'active').length.toString(),
      change: "Currently online",
      icon: UserCheck
    },
    {
      label: "Avg Sentiment",
      value: (agents.reduce((acc, agent) => acc + agent.sentiment, 0) / agents.length).toFixed(1),
      change: "+0.3 this week",
      icon: Activity
    }
  ];

  // Check if this is first time (no agents)
  const isFirstTime = agents.length === 0;

  // Filter agents based on search
  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isFirstTime) {
    // First-time experience - full page takeover
    return (
      <div className="h-full w-full">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="border-b border-gray-200 bg-white px-6 py-4">
            <h1 className="text-2xl font-bold text-black">AI Agents</h1>
            <p className="text-gray-600">Create and manage your AI agents for different call scenarios</p>
          </div>

          <div className="flex-1 overflow-auto p-6 bg-gray-50">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col items-center justify-center min-h-[600px] text-center">
                <div className="p-8 bg-[#674ea7]/10 rounded-full mb-8">
                  <Bot className="h-24 w-24 text-[#674ea7]" />
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Welcome to AI Agents! 🤖
                </h2>

                <p className="text-lg font-light text-gray-600 mb-8 max-w-2xl">
                  Create your first AI agent to start handling calls automatically.
                  Our agents can handle customer support, sales, technical help, and more.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl">
                  <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm p-6 text-center">
                    <div className="p-3 bg-[#674ea7]/10 rounded-lg inline-block mb-4">
                      <Headphones className="h-6 w-6 text-[#674ea7]" />
                    </div>
                    <h3 className="font-medium text-gray-900 mb-2">Smart Conversations</h3>
                    <p className="text-sm font-light text-gray-600">
                      AI agents that understand context and provide natural responses
                    </p>
                  </Card>

                  <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm p-6 text-center">
                    <div className="p-3 bg-[#674ea7]/10 rounded-lg inline-block mb-4">
                      <Activity className="h-6 w-6 text-[#674ea7]" />
                    </div>
                    <h3 className="font-medium text-gray-900 mb-2">Real-time Analytics</h3>
                    <p className="text-sm font-light text-gray-600">
                      Monitor performance, sentiment, and efficiency in real-time
                    </p>
                  </Card>

                  <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm p-6 text-center">
                    <div className="p-3 bg-[#674ea7]/10 rounded-lg inline-block mb-4">
                      <Zap className="h-6 w-6 text-[#674ea7]" />
                    </div>
                    <h3 className="font-medium text-gray-900 mb-2">Easy Setup</h3>
                    <p className="text-sm font-light text-gray-600">
                      Get started in minutes with our intuitive agent builder
                    </p>
                  </Card>
                </div>

                <Button
                  onClick={() => setIsCreateDrawerOpen(true)}
                  className="bg-[#674ea7] hover:bg-[#674ea7]/90 text-white px-8 py-3 text-lg"
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Create Your First Agent
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="border-b border-gray-200 bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-black">AI Agents</h1>
              <p className="text-gray-600">Manage your AI agents and their configurations</p>
            </div>
            <Button
              onClick={() => setIsCreateDrawerOpen(true)}
              className="bg-[#674ea7] hover:bg-[#674ea7]/90 text-white"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Agent
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto space-y-6">

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <Card key={index} className="border-0 shadow-sm bg-white/80 backdrop-blur-sm hover:shadow-md transition-all">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="p-2 bg-[#674ea7]/10 rounded-lg">
                          <IconComponent className="h-4 w-4 text-[#674ea7]" />
                        </div>
                        <span className="text-xs font-light text-[#674ea7] bg-[#674ea7]/5 px-2 py-1 rounded">
                          {stat.change}
                        </span>
                      </div>
                      <div className="text-lg font-semibold text-gray-900 mb-1">{stat.value}</div>
                      <div className="text-xs font-light text-gray-500">{stat.label}</div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Search */}
            <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search agents..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-gray-200"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Agents Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAgents.map((agent) => (
                <Card key={agent.id} className="border-0 shadow-sm bg-white/80 backdrop-blur-sm hover:shadow-md transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-[#674ea7]/10 rounded-lg">
                        <Headphones className="h-5 w-5 text-[#674ea7]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{agent.name}</h3>
                        <p className="text-sm font-light text-gray-600">{agent.type}</p>
                      </div>
                      <Badge className={`${
                        agent.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {agent.status}
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-light text-gray-600">Calls Handled</span>
                        <span className="font-semibold text-gray-900">{agent.calls}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm font-light text-gray-600">Sentiment Score</span>
                        <span className="font-semibold text-[#674ea7]">{agent.sentiment}/10</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm font-light text-gray-600">Efficiency</span>
                        <span className="font-semibold text-green-600">{agent.efficiency}%</span>
                      </div>

                      <div className="pt-2 border-t border-gray-100">
                        <span className="text-xs font-light text-gray-500">
                          Last active: {agent.lastActive}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Create Agent Drawer */}
      <CreateAgentDrawer
        isOpen={isCreateDrawerOpen}
        onClose={() => setIsCreateDrawerOpen(false)}
      />
    </div>
  );
}
