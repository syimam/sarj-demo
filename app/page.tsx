"use client";

import React from "react";
import Link from "next/link";
import {
  Phone,
  TrendingUp,
  Users,
  Clock,
  ArrowRight,
  Bot,
  Zap,
  MessageSquare,
  Sparkles,
  Heart,
  Coffee,
  BarChart3,
  Activity
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  const currentHour = new Date().getHours();
  const getGreeting = () => {
    if (currentHour < 12) return "Good morning";
    if (currentHour < 17) return "Good afternoon";
    return "Good evening";
  };
  const quickStats = [
    {
      label: "Active Agents",
      value: "12",
      icon: Bot,
      change: "+2 today"
    },
    {
      label: "Calls Today",
      value: "1,847",
      icon: Phone,
      change: "+23%"
    },
    {
      label: "Success Rate",
      value: "94.2%",
      icon: TrendingUp,
      change: "+1.8%"
    },
    {
      label: "Avg Response",
      value: "1.2s",
      icon: Clock,
      change: "-0.3s"
    },
  ];

  const recentHighlights = [
    {
      title: "Peak Performance Day!",
      description: "Your agents handled 1,847 calls with 94.2% success rate",
      time: "Today",
      type: "success",
      icon: Sparkles
    },
    {
      title: "New Agent Deployed",
      description: "Customer Support Agent v2.1 is now live",
      time: "2 hours ago",
      type: "info",
      icon: Bot
    },
    {
      title: "Cost Optimization",
      description: "Saved $45 this week through token optimization",
      time: "Yesterday",
      type: "success",
      icon: TrendingUp
    },
  ];

  return (
    <div className="h-full w-full">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="border-b border-gray-200 bg-white px-6 py-4">
          <h1 className="text-2xl font-bold text-black">
            {getGreeting()}! 👋
          </h1>
          <p className="text-gray-600">Welcome back to your AI call center. Here's what's happening today.</p>
        </div>

        <div className="flex-1 overflow-auto p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto space-y-6">

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickStats.map((stat, index) => {
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

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Highlights */}
              <Card className="lg:col-span-2 border-0 shadow-sm bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium text-gray-900 flex items-center">
                    <Sparkles className="h-5 w-5 mr-3 text-[#674ea7]" />
                    Today's Highlights
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="space-y-4">
                    {recentHighlights.map((highlight, index) => {
                      const Icon = highlight.icon;
                      return (
                        <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="p-2 bg-[#674ea7]/10 rounded-lg">
                            <Icon className="h-4 w-4 text-[#674ea7]" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 mb-1">
                              {highlight.title}
                            </h4>
                            <p className="text-sm font-light text-gray-600 mb-2">
                              {highlight.description}
                            </p>
                            <span className="text-xs font-light text-gray-500">
                              {highlight.time}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <Link href="/dashboard">
                      <Button className="w-full bg-[#674ea7] hover:bg-[#674ea7]/90 text-white">
                        <BarChart3 className="mr-2 h-4 w-4" />
                        View Full Dashboard
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium text-gray-900 flex items-center">
                    <Zap className="h-5 w-5 mr-3 text-[#674ea7]" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0 space-y-3">
                  <Link href="/calls" className="block">
                    <Button variant="outline" className="w-full justify-start hover:bg-[#674ea7]/5 border-gray-200">
                      <Phone className="h-4 w-4 mr-3 text-[#674ea7]" />
                      <span className="font-light">View Recent Calls</span>
                    </Button>
                  </Link>
                  <Link href="/agents" className="block">
                    <Button variant="outline" className="w-full justify-start hover:bg-[#674ea7]/5 border-gray-200">
                      <Users className="h-4 w-4 mr-3 text-[#674ea7]" />
                      <span className="font-light">Manage Agents</span>
                    </Button>
                  </Link>
                  <Link href="/scenarios" className="block">
                    <Button variant="outline" className="w-full justify-start hover:bg-[#674ea7]/5 border-gray-200">
                      <MessageSquare className="h-4 w-4 mr-3 text-[#674ea7]" />
                      <span className="font-light">Create Scenario</span>
                    </Button>
                  </Link>
                  <Link href="/outbound" className="block">
                    <Button variant="outline" className="w-full justify-start hover:bg-[#674ea7]/5 border-gray-200">
                      <TrendingUp className="h-4 w-4 mr-3 text-[#674ea7]" />
                      <span className="font-light">Start Campaign</span>
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Status & Welcome Message */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* System Status */}
              <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">
                        All Systems Healthy
                      </h3>
                      <p className="text-sm font-light text-gray-600">
                        12 agents active • 99.9% uptime • Updated 2 min ago
                      </p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-green-300">
                      <Heart className="h-3 w-3 mr-1" />
                      Healthy
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Welcome Message */}
              <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-[#674ea7]/10 rounded-lg">
                      <Coffee className="h-5 w-5 text-[#674ea7]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">
                        Ready to optimize your calls?
                      </h3>
                      <p className="text-sm font-light text-gray-600">
                        Your AI agents are performing great today!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
