"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Phone, Users, Clock, TrendingUp, Activity, BarChart3, Headphones, Zap } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function Dashboard() {
  const stats = [
    {
      label: "Total Calls",
      value: "1,847",
      change: "+12%",
      changeType: "positive",
      icon: Phone
    },
    {
      label: "Active Agents",
      value: "12",
      change: "+2",
      changeType: "positive",
      icon: Users
    },
    {
      label: "Success Rate",
      value: "94.2%",
      change: "+1.8%",
      changeType: "positive",
      icon: TrendingUp
    },
    {
      label: "Avg Duration",
      value: "3:24",
      change: "-8%",
      changeType: "positive",
      icon: Clock
    },
    {
      label: "Total Cost",
      value: "$480.50",
      change: "-5%",
      changeType: "positive",
      icon: BarChart3
    },
    {
      label: "Avg Sentiment",
      value: "8.2/10",
      change: "+0.5",
      changeType: "positive",
      icon: Activity
    }
  ];

  const agents = [
    { name: "Customer Support", status: "active", calls: 456, sentiment: 8.5, efficiency: 94 },
    { name: "Sales Assistant", status: "active", calls: 234, sentiment: 7.8, efficiency: 89 },
    { name: "Technical Help", status: "active", calls: 189, sentiment: 8.1, efficiency: 92 },
    { name: "Billing Support", status: "active", calls: 167, sentiment: 8.7, efficiency: 96 }
  ];

  const sentimentData = [
    { emotion: "Positive", count: 1247, percentage: 67.5, color: "bg-[#674ea7]" },
    { emotion: "Neutral", count: 431, percentage: 23.3, color: "bg-gray-400" },
    { emotion: "Negative", count: 169, percentage: 9.2, color: "bg-black" }
  ];

  const [selectedPeriod, setSelectedPeriod] = React.useState('daily');
  const [tokenPeriod, setTokenPeriod] = React.useState('daily');
  const [sentimentPeriod, setSentimentPeriod] = React.useState('daily');
  const [agentsPeriod, setAgentsPeriod] = React.useState('daily');

  const callVolumeData = {
    daily: [
      { time: "00:00", calls: 45 },
      { time: "02:00", calls: 32 },
      { time: "04:00", calls: 23 },
      { time: "06:00", calls: 67 },
      { time: "08:00", calls: 156 },
      { time: "10:00", calls: 189 },
      { time: "12:00", calls: 234 },
      { time: "14:00", calls: 221 },
      { time: "16:00", calls: 198 },
      { time: "18:00", calls: 145 },
      { time: "20:00", calls: 87 },
      { time: "22:00", calls: 54 }
    ],
    monthly: [
      { time: "Jan", calls: 3420 },
      { time: "Feb", calls: 3890 },
      { time: "Mar", calls: 4250 },
      { time: "Apr", calls: 3980 },
      { time: "May", calls: 4560 },
      { time: "Jun", calls: 5120 },
      { time: "Jul", calls: 4890 },
      { time: "Aug", calls: 5340 },
      { time: "Sep", calls: 4720 },
      { time: "Oct", calls: 5680 },
      { time: "Nov", calls: 6120 },
      { time: "Dec", calls: 5890 }
    ],
    yearly: [
      { time: "2019", calls: 42000 },
      { time: "2020", calls: 38500 },
      { time: "2021", calls: 45200 },
      { time: "2022", calls: 52800 },
      { time: "2023", calls: 58900 },
      { time: "2024", calls: 61200 }
    ]
  };

  const sentimentChartData = {
    daily: [
      { name: 'Positive', value: 67.5, count: 1247, color: '#674ea7' },
      { name: 'Neutral', value: 23.3, count: 431, color: '#9ca3af' },
      { name: 'Negative', value: 9.2, count: 169, color: '#374151' }
    ],
    monthly: [
      { name: 'Positive', value: 71.2, count: 15840, color: '#674ea7' },
      { name: 'Neutral', value: 20.8, count: 4620, color: '#9ca3af' },
      { name: 'Negative', value: 8.0, count: 1780, color: '#374151' }
    ],
    yearly: [
      { name: 'Positive', value: 69.8, count: 185200, color: '#674ea7' },
      { name: 'Neutral', value: 22.1, count: 58600, color: '#9ca3af' },
      { name: 'Negative', value: 8.1, count: 21500, color: '#374151' }
    ]
  };

  const tokenUsageData = {
    daily: [
      { time: "00:00", tokens: 12500 },
      { time: "02:00", tokens: 8900 },
      { time: "04:00", tokens: 6700 },
      { time: "06:00", tokens: 15600 },
      { time: "08:00", tokens: 34200 },
      { time: "10:00", tokens: 42800 },
      { time: "12:00", tokens: 56700 },
      { time: "14:00", tokens: 51200 },
      { time: "16:00", tokens: 47800 },
      { time: "18:00", tokens: 32400 },
      { time: "20:00", tokens: 21600 },
      { time: "22:00", tokens: 14300 }
    ],
    monthly: [
      { time: "Jan", tokens: 890000 },
      { time: "Feb", tokens: 1020000 },
      { time: "Mar", tokens: 1150000 },
      { time: "Apr", tokens: 980000 },
      { time: "May", tokens: 1280000 },
      { time: "Jun", tokens: 1420000 },
      { time: "Jul", tokens: 1350000 },
      { time: "Aug", tokens: 1580000 },
      { time: "Sep", tokens: 1240000 },
      { time: "Oct", tokens: 1680000 },
      { time: "Nov", tokens: 1820000 },
      { time: "Dec", tokens: 1750000 }
    ],
    yearly: [
      { time: "2019", tokens: 8900000 },
      { time: "2020", tokens: 7200000 },
      { time: "2021", tokens: 12400000 },
      { time: "2022", tokens: 15800000 },
      { time: "2023", tokens: 18900000 },
      { time: "2024", tokens: 21200000 }
    ]
  };

  const topAgentsData = {
    daily: [
      { name: "Customer Support Pro", calls: 156, tokens: 45600, sentiment: 8.7, efficiency: 94 },
      { name: "Sales Assistant AI", calls: 134, tokens: 38200, sentiment: 8.2, efficiency: 91 },
      { name: "Technical Helper", calls: 98, tokens: 32400, sentiment: 8.5, efficiency: 89 },
      { name: "Billing Support", calls: 87, tokens: 28900, sentiment: 8.9, efficiency: 96 },
      { name: "General Inquiry", calls: 76, tokens: 24100, sentiment: 8.1, efficiency: 88 }
    ],
    monthly: [
      { name: "Customer Support Pro", calls: 4680, tokens: 1368000, sentiment: 8.6, efficiency: 93 },
      { name: "Sales Assistant AI", calls: 4020, tokens: 1146000, sentiment: 8.3, efficiency: 90 },
      { name: "Technical Helper", calls: 2940, tokens: 972000, sentiment: 8.4, efficiency: 88 },
      { name: "Billing Support", calls: 2610, tokens: 867000, sentiment: 8.8, efficiency: 95 },
      { name: "General Inquiry", calls: 2280, tokens: 723000, sentiment: 8.0, efficiency: 87 }
    ],
    yearly: [
      { name: "Customer Support Pro", calls: 56160, tokens: 16416000, sentiment: 8.5, efficiency: 92 },
      { name: "Sales Assistant AI", calls: 48240, tokens: 13752000, sentiment: 8.2, efficiency: 89 },
      { name: "Technical Helper", calls: 35280, tokens: 11664000, sentiment: 8.3, efficiency: 87 },
      { name: "Billing Support", calls: 31320, tokens: 10404000, sentiment: 8.7, efficiency: 94 },
      { name: "General Inquiry", calls: 27360, tokens: 8676000, sentiment: 7.9, efficiency: 86 }
    ]
  };

  const recentActivity = [
    {
      time: "2 min ago",
      event: "High satisfaction call completed",
      type: "success",
      sentiment: "positive"
    },
    {
      time: "5 min ago",
      event: "Agent efficiency improved by 15%",
      type: "success",
      sentiment: "positive"
    },
    {
      time: "8 min ago",
      event: "Negative sentiment detected - escalated",
      type: "warning",
      sentiment: "negative"
    },
    {
      time: "12 min ago",
      event: "New voice model deployed successfully",
      type: "info",
      sentiment: "neutral"
    }
  ];

  return (
    <div className="h-full w-full">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="border-b border-gray-200 bg-white px-6 py-4">
          <h1 className="text-2xl font-bold text-black">AI Agent Dashboard</h1>
          <p className="text-gray-600">Monitor performance, sentiment, and optimize your AI call center</p>
        </div>

        <div className="flex-1 overflow-auto p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto space-y-6">

            {/* Simple Metrics Row */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
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

            {/* Enhanced Charts with Individual Time Period Controls */}
            <div className="space-y-6">

              {/* Call Volume Chart - Full Width */}
              <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-medium text-gray-900 flex items-center justify-between">
                    <div className="flex items-center">
                      <BarChart3 className="h-6 w-6 text-[#674ea7] mr-3" />
                      Call Volume Analysis
                    </div>
                    <div className="flex bg-gray-50 rounded-lg p-1">
                      {['daily', 'monthly', 'yearly'].map((period) => (
                        <button
                          key={period}
                          onClick={() => setSelectedPeriod(period)}
                          className={`px-3 py-1 text-xs font-light rounded-md transition-all ${
                            selectedPeriod === period
                              ? 'bg-[#674ea7] text-white font-medium'
                              : 'text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          {period.charAt(0).toUpperCase() + period.slice(1)}
                        </button>
                      ))}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={callVolumeData[selectedPeriod]}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis
                          dataKey="time"
                          stroke="#64748b"
                          fontSize={12}
                          fontWeight={300}
                        />
                        <YAxis
                          stroke="#64748b"
                          fontSize={12}
                          fontWeight={300}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            fontSize: '12px',
                            fontWeight: 300
                          }}
                          labelStyle={{ color: '#374151', fontWeight: 500 }}
                          formatter={(value) => [value, 'Calls']}
                        />
                        <Line
                          type="monotone"
                          dataKey="calls"
                          stroke="#674ea7"
                          strokeWidth={3}
                          dot={{ fill: '#674ea7', strokeWidth: 2, r: 5 }}
                          activeDot={{ r: 7, stroke: '#674ea7', strokeWidth: 2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-[#674ea7]/5 rounded-lg text-center">
                      <div className="text-lg font-semibold text-[#674ea7]">
                        {Math.max(...callVolumeData[selectedPeriod].map(d => d.calls)).toLocaleString()}
                      </div>
                      <div className="text-xs font-light text-[#674ea7]">Peak Volume</div>
                    </div>
                    <div className="p-4 bg-[#674ea7]/5 rounded-lg text-center">
                      <div className="text-lg font-semibold text-[#674ea7]">
                        {Math.round(callVolumeData[selectedPeriod].reduce((a, b) => a + b.calls, 0) / callVolumeData[selectedPeriod].length).toLocaleString()}
                      </div>
                      <div className="text-xs font-light text-[#674ea7]">Average Volume</div>
                    </div>
                    <div className="p-4 bg-[#674ea7]/5 rounded-lg text-center">
                      <div className="text-lg font-semibold text-[#674ea7]">
                        {callVolumeData[selectedPeriod].reduce((a, b) => a + b.calls, 0).toLocaleString()}
                      </div>
                      <div className="text-xs font-light text-[#674ea7]">Total Volume</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Sentiment Chart - Full Width */}
              <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-medium text-gray-900 flex items-center justify-between">
                    <div className="flex items-center">
                      <Activity className="h-6 w-6 text-[#674ea7] mr-3" />
                      Sentiment Distribution
                    </div>
                    <div className="flex bg-gray-50 rounded-lg p-1">
                      {['daily', 'monthly', 'yearly'].map((period) => (
                        <button
                          key={period}
                          onClick={() => setSentimentPeriod(period)}
                          className={`px-3 py-1 text-xs font-light rounded-md transition-all ${
                            sentimentPeriod === period
                              ? 'bg-[#674ea7] text-white font-medium'
                              : 'text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          {period.charAt(0).toUpperCase() + period.slice(1)}
                        </button>
                      ))}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={sentimentChartData[sentimentPeriod]}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={120}
                            paddingAngle={3}
                            dataKey="value"
                          >
                            {sentimentChartData[sentimentPeriod].map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'white',
                              border: '1px solid #e2e8f0',
                              borderRadius: '8px',
                              fontSize: '12px',
                              fontWeight: 300
                            }}
                            formatter={(value, name) => [`${value}%`, name]}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="space-y-6">
                      {sentimentChartData[sentimentPeriod].map((item, index) => (
                        <div key={index} className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              <div
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: item.color }}
                              />
                              <span className="font-medium text-gray-900">{item.name}</span>
                            </div>
                            <span className="text-lg font-semibold text-gray-900">{item.value}%</span>
                          </div>
                          <div className="text-sm font-light text-gray-600">
                            {item.count.toLocaleString()} calls
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Token Usage Chart */}
              <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-medium text-gray-900 flex items-center justify-between">
                    <div className="flex items-center">
                      <Zap className="h-6 w-6 text-[#674ea7] mr-3" />
                      Token Usage Analysis
                    </div>
                    <div className="flex bg-gray-50 rounded-lg p-1">
                      {['daily', 'monthly', 'yearly'].map((period) => (
                        <button
                          key={period}
                          onClick={() => setTokenPeriod(period)}
                          className={`px-3 py-1 text-xs font-light rounded-md transition-all ${
                            tokenPeriod === period
                              ? 'bg-[#674ea7] text-white font-medium'
                              : 'text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          {period.charAt(0).toUpperCase() + period.slice(1)}
                        </button>
                      ))}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={tokenUsageData[tokenPeriod]}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis
                          dataKey="time"
                          stroke="#64748b"
                          fontSize={12}
                          fontWeight={300}
                        />
                        <YAxis
                          stroke="#64748b"
                          fontSize={12}
                          fontWeight={300}
                          tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            fontSize: '12px',
                            fontWeight: 300
                          }}
                          labelStyle={{ color: '#374151', fontWeight: 500 }}
                          formatter={(value) => [value.toLocaleString(), 'Tokens']}
                        />
                        <Line
                          type="monotone"
                          dataKey="tokens"
                          stroke="#674ea7"
                          strokeWidth={3}
                          dot={{ fill: '#674ea7', strokeWidth: 2, r: 5 }}
                          activeDot={{ r: 7, stroke: '#674ea7', strokeWidth: 2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-[#674ea7]/5 rounded-lg text-center">
                      <div className="text-lg font-semibold text-[#674ea7]">
                        {Math.max(...tokenUsageData[tokenPeriod].map(d => d.tokens)).toLocaleString()}
                      </div>
                      <div className="text-xs font-light text-[#674ea7]">Peak Tokens</div>
                    </div>
                    <div className="p-4 bg-[#674ea7]/5 rounded-lg text-center">
                      <div className="text-lg font-semibold text-[#674ea7]">
                        {Math.round(tokenUsageData[tokenPeriod].reduce((a, b) => a + b.tokens, 0) / tokenUsageData[tokenPeriod].length).toLocaleString()}
                      </div>
                      <div className="text-xs font-light text-[#674ea7]">Avg Tokens</div>
                    </div>
                    <div className="p-4 bg-[#674ea7]/5 rounded-lg text-center">
                      <div className="text-lg font-semibold text-[#674ea7]">
                        {tokenUsageData[tokenPeriod].reduce((a, b) => a + b.tokens, 0).toLocaleString()}
                      </div>
                      <div className="text-xs font-light text-[#674ea7]">Total Tokens</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Top Agents Table */}
              <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-medium text-gray-900 flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="h-6 w-6 text-[#674ea7] mr-3" />
                      Top Performing Agents
                    </div>
                    <div className="flex bg-gray-50 rounded-lg p-1">
                      {['daily', 'monthly', 'yearly'].map((period) => (
                        <button
                          key={period}
                          onClick={() => setAgentsPeriod(period)}
                          className={`px-3 py-1 text-xs font-light rounded-md transition-all ${
                            agentsPeriod === period
                              ? 'bg-[#674ea7] text-white font-medium'
                              : 'text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          {period.charAt(0).toUpperCase() + period.slice(1)}
                        </button>
                      ))}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-medium text-gray-900">Agent Name</th>
                          <th className="text-right py-3 px-4 font-medium text-gray-900">Calls</th>
                          <th className="text-right py-3 px-4 font-medium text-gray-900">Tokens</th>
                          <th className="text-right py-3 px-4 font-medium text-gray-900">Sentiment</th>
                          <th className="text-right py-3 px-4 font-medium text-gray-900">Efficiency</th>
                        </tr>
                      </thead>
                      <tbody>
                        {topAgentsData[agentsPeriod].map((agent, index) => (
                          <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-4 px-4">
                              <div className="flex items-center space-x-3">
                                <div className="p-2 bg-[#674ea7]/10 rounded-lg">
                                  <Headphones className="h-4 w-4 text-[#674ea7]" />
                                </div>
                                <span className="font-medium text-gray-900">{agent.name}</span>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-right font-semibold text-gray-900">
                              {agent.calls.toLocaleString()}
                            </td>
                            <td className="py-4 px-4 text-right font-light text-gray-600">
                              {agent.tokens.toLocaleString()}
                            </td>
                            <td className="py-4 px-4 text-right">
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#674ea7]/10 text-[#674ea7]">
                                {agent.sentiment}/10
                              </span>
                            </td>
                            <td className="py-4 px-4 text-right">
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                {agent.efficiency}%
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Summary */}
            <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-medium text-gray-900 flex items-center">
                  <TrendingUp className="h-6 w-6 text-[#674ea7] mr-3" />
                  Performance Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-[#674ea7]/5 rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <Headphones className="h-5 w-5 text-[#674ea7] mr-2" />
                      <span className="text-xs font-light text-[#674ea7] bg-[#674ea7]/10 px-2 py-1 rounded">Active</span>
                    </div>
                    <div className="text-2xl font-semibold text-gray-900 mb-1">12</div>
                    <div className="text-sm font-light text-gray-600">AI Agents</div>
                  </div>

                  <div className="text-center p-4 bg-[#674ea7]/5 rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <Clock className="h-5 w-5 text-[#674ea7] mr-2" />
                      <span className="text-xs font-light text-[#674ea7] bg-[#674ea7]/10 px-2 py-1 rounded">↓ 15%</span>
                    </div>
                    <div className="text-2xl font-semibold text-gray-900 mb-1">2.8s</div>
                    <div className="text-sm font-light text-gray-600">Avg Response</div>
                  </div>

                  <div className="text-center p-4 bg-[#674ea7]/5 rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <Zap className="h-5 w-5 text-[#674ea7] mr-2" />
                      <span className="text-xs font-light text-[#674ea7] bg-[#674ea7]/10 px-2 py-1 rounded">↑ 2.1%</span>
                    </div>
                    <div className="text-2xl font-semibold text-gray-900 mb-1">97.3%</div>
                    <div className="text-sm font-light text-gray-600">Voice Clarity</div>
                  </div>

                  <div className="text-center p-4 bg-[#674ea7]/5 rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <Activity className="h-5 w-5 text-[#674ea7] mr-2" />
                      <span className="text-xs font-light text-[#674ea7] bg-[#674ea7]/10 px-2 py-1 rounded">↑ 0.5</span>
                    </div>
                    <div className="text-2xl font-semibold text-gray-900 mb-1">8.2/10</div>
                    <div className="text-sm font-light text-gray-600">Avg Sentiment</div>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
}