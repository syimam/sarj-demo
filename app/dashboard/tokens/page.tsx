import React from "react";
import {
  Zap,
  TrendingUp,
  TrendingDown,
  DollarSign,
  AlertTriangle,
  Settings,
  Download,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Target
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader } from "@/components/page-header";

export default function TokenDashboard() {
  // Token usage data
  const tokenMetrics = [
    {
      title: "Total Tokens Used",
      value: "2.4M",
      change: "+15%",
      changeType: "neutral",
      description: "This month"
    },
    {
      title: "Input Tokens",
      value: "1.2M",
      change: "+12%",
      changeType: "neutral",
      description: "50% of total"
    },
    {
      title: "Output Tokens",
      value: "1.2M",
      change: "+18%",
      changeType: "neutral",
      description: "50% of total"
    },
    {
      title: "Cost This Month",
      value: "$480.50",
      change: "+8%",
      changeType: "negative",
      description: "vs last month"
    },
    {
      title: "Avg Cost per Call",
      value: "$0.23",
      change: "-12%",
      changeType: "positive",
      description: "Optimized"
    },
    {
      title: "Monthly Budget",
      value: "48%",
      change: "Used",
      changeType: "neutral",
      description: "$1,000 limit"
    }
  ];

  // Agent token usage
  const agentTokenUsage = [
    { agent: "Customer Support", tokens: "890K", cost: "$89.50", efficiency: 92, trend: "up" },
    { agent: "Sales Assistant", tokens: "456K", cost: "$45.60", efficiency: 87, trend: "down" },
    { agent: "Technical Help", tokens: "378K", cost: "$37.80", efficiency: 78, trend: "up" },
    { agent: "Billing Support", tokens: "234K", cost: "$23.40", efficiency: 95, trend: "stable" },
    { agent: "Appointment Bot", tokens: "145K", cost: "$14.50", efficiency: 98, trend: "up" }
  ];

  // Daily usage pattern
  const dailyUsage = [
    { day: "Mon", tokens: 340000, cost: 68.00 },
    { day: "Tue", tokens: 380000, cost: 76.00 },
    { day: "Wed", tokens: 420000, cost: 84.00 },
    { day: "Thu", tokens: 390000, cost: 78.00 },
    { day: "Fri", tokens: 450000, cost: 90.00 },
    { day: "Sat", tokens: 280000, cost: 56.00 },
    { day: "Sun", tokens: 240000, cost: 48.00 }
  ];

  // Token type breakdown
  const tokenBreakdown = [
    { type: "GPT-4 Input", tokens: "800K", cost: "$120.00", percentage: 33 },
    { type: "GPT-4 Output", tokens: "600K", cost: "$180.00", percentage: 25 },
    { type: "GPT-3.5 Input", tokens: "400K", cost: "$8.00", percentage: 17 },
    { type: "GPT-3.5 Output", tokens: "400K", cost: "$16.00", percentage: 17 },
    { type: "Embeddings", tokens: "200K", cost: "$2.00", percentage: 8 }
  ];

  // Optimization opportunities
  const optimizations = [
    {
      title: "Prompt Optimization",
      description: "Reduce average prompt length by 15%",
      potential: "$45/month",
      difficulty: "Easy",
      impact: "Medium"
    },
    {
      title: "Model Selection",
      description: "Use GPT-3.5 for simple queries",
      potential: "$120/month",
      difficulty: "Medium",
      impact: "High"
    },
    {
      title: "Response Caching",
      description: "Cache common responses",
      potential: "$80/month",
      difficulty: "Hard",
      impact: "High"
    },
    {
      title: "Context Management",
      description: "Optimize conversation context",
      potential: "$35/month",
      difficulty: "Easy",
      impact: "Low"
    }
  ];

  return (
    <div className="h-full w-full">
      <div className="flex flex-col h-full">
        <PageHeader
          title="Token Usage & Costs"
          description="Monitor AI token consumption, costs, and optimization opportunities"
        />

        <div className="flex-1 overflow-auto p-6 space-y-6">
          {/* Budget Alert */}
          <Alert className="border-yellow-200 bg-yellow-50">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              You've used 48% of your monthly token budget ($480.50 of $1,000). 
              <Button variant="link" className="p-0 h-auto text-yellow-800 underline ml-1">
                Adjust limits
              </Button>
            </AlertDescription>
          </Alert>

          {/* Token Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {tokenMetrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Zap className="h-4 w-4 text-yellow-500" />
                    <span className={`text-xs font-medium ${
                      metric.changeType === 'positive' ? 'text-green-600' : 
                      metric.changeType === 'negative' ? 'text-red-600' : 'text-slate-600'
                    }`}>
                      {metric.change}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-slate-900">{metric.value}</div>
                  <div className="text-xs text-slate-500">{metric.title}</div>
                  <div className="text-xs text-slate-400 mt-1">{metric.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Usage Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Daily Usage Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2 text-blue-500" />
                    Daily Token Usage
                  </div>
                  <Select defaultValue="7d">
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7d">7 days</SelectItem>
                      <SelectItem value="30d">30 days</SelectItem>
                    </SelectContent>
                  </Select>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 flex items-end justify-between space-x-2">
                  {dailyUsage.map((day, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div className="w-full bg-slate-100 rounded-t relative" style={{ height: '160px' }}>
                        <div 
                          className="bg-blue-500 rounded-t absolute bottom-0 w-full"
                          style={{ height: `${(day.tokens / 450000) * 100}%` }}
                        />
                      </div>
                      <div className="text-xs text-slate-600 mt-2">{day.day}</div>
                      <div className="text-xs text-slate-500">{(day.tokens / 1000).toFixed(0)}K</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Token Type Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="h-5 w-5 mr-2 text-purple-500" />
                  Token Type Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tokenBreakdown.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-900">{item.type}</span>
                        <div className="text-right">
                          <div className="text-sm font-medium text-slate-900">{item.cost}</div>
                          <div className="text-xs text-slate-500">{item.tokens}</div>
                        </div>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div 
                          className="bg-purple-500 h-2 rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Agent Token Usage */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2 text-green-500" />
                Agent Token Usage & Efficiency
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {agentTokenUsage.map((agent, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div>
                        <div className="font-medium text-slate-900">{agent.agent}</div>
                        <div className="text-sm text-slate-500">{agent.tokens} tokens</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <div className="text-sm font-medium text-slate-900">{agent.cost}</div>
                        <div className="text-xs text-slate-500">Cost</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-slate-900">{agent.efficiency}%</div>
                        <div className="text-xs text-slate-500">Efficiency</div>
                      </div>
                      <div className="w-6">
                        {agent.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-500" />}
                        {agent.trend === 'down' && <TrendingDown className="h-4 w-4 text-red-500" />}
                        {agent.trend === 'stable' && <div className="h-4 w-4 bg-slate-300 rounded-full" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Optimization Opportunities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2 text-orange-500" />
                Cost Optimization Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {optimizations.map((opt, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-slate-900">{opt.title}</h4>
                        <p className="text-sm text-slate-600 mt-1">{opt.description}</p>
                      </div>
                      <Badge variant="outline" className="text-green-600 border-green-200">
                        {opt.potential}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">Difficulty: {opt.difficulty}</span>
                      <span className="text-slate-500">Impact: {opt.impact}</span>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      Implement Optimization
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-3">
                <Button variant="default">
                  <Settings className="h-4 w-4 mr-2" />
                  Configure Limits
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Usage Data
                </Button>
                <Button variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Set Budget Alerts
                </Button>
                <Button variant="outline">
                  <Target className="h-4 w-4 mr-2" />
                  Optimization Wizard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
