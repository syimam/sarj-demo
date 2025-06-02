"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  Calendar,
  Filter,
  Download,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  Clock,
  Users,
  Phone,
  MessageSquare,
  Zap,
  DollarSign
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader } from "@/components/page-header";

export default function Analytics() {
  // State for select components
  const [timeRange, setTimeRange] = useState("7d");
  const [agentFilter, setAgentFilter] = useState("all");

  // Chart data (in real app, this would come from your analytics API)
  const callVolumeData = [
    { time: "00:00", calls: 45, tokens: 12000 },
    { time: "04:00", calls: 23, tokens: 6500 },
    { time: "08:00", calls: 156, tokens: 45000 },
    { time: "12:00", calls: 234, tokens: 67000 },
    { time: "16:00", calls: 189, tokens: 54000 },
    { time: "20:00", calls: 98, tokens: 28000 }
  ];

  const agentUtilization = [
    { agent: "Customer Support", utilization: 87, calls: 456, efficiency: 94 },
    { agent: "Sales Assistant", utilization: 72, calls: 234, efficiency: 89 },
    { agent: "Technical Help", utilization: 65, calls: 189, efficiency: 91 },
    { agent: "Billing Support", utilization: 58, calls: 167, efficiency: 96 },
    { agent: "Appointment Bot", utilization: 45, calls: 145, efficiency: 98 }
  ];

  const scenarioBreakdown = [
    { scenario: "Customer Support", percentage: 35, calls: 567, color: "bg-blue-500" },
    { scenario: "Sales Inquiry", percentage: 25, calls: 234, color: "bg-green-500" },
    { scenario: "Technical Issues", percentage: 20, calls: 189, color: "bg-purple-500" },
    { scenario: "Billing Questions", percentage: 12, calls: 167, color: "bg-orange-500" },
    { scenario: "Other", percentage: 8, calls: 145, color: "bg-slate-500" }
  ];

  const performanceMetrics = [
    { metric: "Average Response Time", value: "1.2s", trend: "+5%", trendType: "negative" },
    { metric: "Call Success Rate", value: "94.2%", trend: "+2.1%", trendType: "positive" },
    { metric: "Customer Satisfaction", value: "4.6/5", trend: "+0.3", trendType: "positive" },
    { metric: "Token Efficiency", value: "89%", trend: "+7%", trendType: "positive" },
    { metric: "Cost per Successful Call", value: "$0.23", trend: "-12%", trendType: "positive" },
    { metric: "Agent Uptime", value: "99.8%", trend: "+0.1%", trendType: "positive" }
  ];

  return (
    <div className="h-full w-full">
      <div className="flex flex-col h-full">
        <PageHeader
          title="Analytics & Reports"
          description="Deep insights into your AI agent performance and usage patterns"
        />

        <div className="flex-1 overflow-auto p-6 space-y-6">
          {/* Filters & Controls */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1d">Last 24h</SelectItem>
                      <SelectItem value="7d">Last 7 days</SelectItem>
                      <SelectItem value="30d">Last 30 days</SelectItem>
                      <SelectItem value="90d">Last 90 days</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={agentFilter} onValueChange={setAgentFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Agents</SelectItem>
                      <SelectItem value="support">Customer Support</SelectItem>
                      <SelectItem value="sales">Sales Assistant</SelectItem>
                      <SelectItem value="technical">Technical Help</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    More Filters
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Overview */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {performanceMetrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="text-sm text-slate-600 mb-1">{metric.metric}</div>
                  <div className="text-2xl font-bold text-slate-900 mb-1">{metric.value}</div>
                  <div className={`text-xs font-medium ${
                    metric.trendType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.trend} vs last period
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Call Volume Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-blue-500" />
                  Call Volume & Token Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-between space-x-2">
                  {callVolumeData.map((data, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div className="w-full bg-slate-100 rounded-t relative" style={{ height: '200px' }}>
                        <div
                          className="bg-blue-500 rounded-t absolute bottom-0 w-full"
                          style={{ height: `${(data.calls / 250) * 100}%` }}
                        />
                        <div
                          className="bg-green-500 rounded-t absolute bottom-0 w-1/2"
                          style={{ height: `${(data.tokens / 70000) * 100}%` }}
                        />
                      </div>
                      <div className="text-xs text-slate-600 mt-2">{data.time}</div>
                      <div className="text-xs text-slate-500">{data.calls}</div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded" />
                    <span className="text-sm text-slate-600">Calls</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded" />
                    <span className="text-sm text-slate-600">Tokens</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Scenario Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="h-5 w-5 mr-2 text-purple-500" />
                  Scenario Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scenarioBreakdown.map((scenario, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded ${scenario.color}`} />
                        <span className="text-sm text-slate-900">{scenario.scenario}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-slate-900">{scenario.percentage}%</div>
                        <div className="text-xs text-slate-500">{scenario.calls} calls</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Agent Utilization */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2 text-green-500" />
                Agent Utilization & Efficiency
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {agentUtilization.map((agent, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-900">{agent.agent}</span>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-slate-600">{agent.calls} calls</span>
                        <span className="text-slate-600">{agent.efficiency}% efficiency</span>
                        <span className="font-medium text-slate-900">{agent.utilization}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${agent.utilization}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Insights & Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-orange-500" />
                AI Insights & Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-900">Performance Improvement</h4>
                      <p className="text-sm text-green-700 mt-1">
                        Your Customer Support agent efficiency increased by 12% this week. Consider applying similar optimizations to other agents.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Zap className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-900">Token Optimization</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        Technical Help agent is using 23% more tokens than average. Review prompts for optimization opportunities.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900">Peak Hours Analysis</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Call volume peaks at 12-2 PM. Consider scaling up agent capacity during these hours for better response times.
                      </p>
                    </div>
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
