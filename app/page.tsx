import React from "react";
import Link from "next/link";
import {
  Phone,
  TrendingUp,
  Users,
  Clock,
  ArrowUpRight,
  Activity,
  CheckCircle,
  AlertCircle
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const stats = [
    {
      title: "Total Calls Today",
      value: "1,234",
      change: "+12%",
      changeType: "positive",
      icon: Phone,
    },
    {
      title: "Active Agents",
      value: "45",
      change: "+2",
      changeType: "positive",
      icon: Users,
    },
    {
      title: "Avg Call Duration",
      value: "3:42",
      change: "-8%",
      changeType: "positive",
      icon: Clock,
    },
    {
      title: "Success Rate",
      value: "94.2%",
      change: "+1.2%",
      changeType: "positive",
      icon: TrendingUp,
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "call_completed",
      message: "Call with +1 (555) 123-4567 completed successfully",
      time: "2 minutes ago",
      icon: CheckCircle,
      iconColor: "text-green-600",
    },
    {
      id: 2,
      type: "call_failed",
      message: "Call attempt to +1 (555) 987-6543 failed",
      time: "5 minutes ago",
      icon: AlertCircle,
      iconColor: "text-red-600",
    },
    {
      id: 3,
      type: "agent_login",
      message: "Agent Sarah Johnson logged in",
      time: "12 minutes ago",
      icon: Users,
      iconColor: "text-blue-600",
    },
    {
      id: 4,
      type: "call_completed",
      message: "Call with +1 (555) 456-7890 completed successfully",
      time: "18 minutes ago",
      icon: CheckCircle,
      iconColor: "text-green-600",
    },
  ];

  return (
    <div className="h-full w-full">
      <div className="flex flex-col h-full p-6 space-y-6">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Welcome to sarj.ai</h1>
            <p className="text-slate-600">Here's what's happening with your AI call center today.</p>
          </div>
          <Button asChild>
            <Link href="/calls">
              View All Calls
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 pt-4">
                  <CardTitle className="text-xs font-medium text-slate-600 leading-tight">
                    {stat.title}
                  </CardTitle>
                  <div className="p-1.5 rounded-lg bg-slate-50">
                    <Icon className="h-3.5 w-3.5 text-slate-400" />
                  </div>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <div className="text-xl font-bold text-slate-900">{stat.value}</div>
                  <p className={`text-xs mt-0.5 leading-tight ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change} from yesterday
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="mr-2 h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <Icon className={`h-5 w-5 mt-0.5 ${activity.iconColor}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-900">{activity.message}</p>
                        <p className="text-xs text-slate-500">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button asChild className="w-full justify-start" variant="outline">
                  <Link href="/calls">
                    <Phone className="mr-2 h-4 w-4" />
                    View All Calls
                  </Link>
                </Button>
                <Button asChild className="w-full justify-start" variant="outline">
                  <Link href="/agents">
                    <Users className="mr-2 h-4 w-4" />
                    Manage AI Agents
                  </Link>
                </Button>
                <Button asChild className="w-full justify-start" variant="outline">
                  <Link href="/outbound">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Outbound Campaigns
                  </Link>
                </Button>
                <Button asChild className="w-full justify-start" variant="outline">
                  <Link href="/scenarios">
                    <Activity className="mr-2 h-4 w-4" />
                    Call Scenarios
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
