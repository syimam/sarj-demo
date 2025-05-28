import React from "react";
import { PhoneOutgoing, Plus, Play, Pause, BarChart3 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Outbound() {
  const stats = [
    {
      title: "Active Campaigns",
      value: "8",
      change: "2 running now",
      icon: Play,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Calls Today",
      value: "1,247",
      change: "+15% vs yesterday",
      icon: PhoneOutgoing,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Success Rate",
      value: "68.4%",
      change: "+2.1% this week",
      icon: BarChart3,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="h-full w-full">
      <div className="flex flex-col h-full p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Outbound Campaigns</h1>
            <p className="text-slate-600">Manage and monitor your outbound calling campaigns.</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Campaign
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 pt-4">
                  <CardTitle className="text-xs font-medium text-slate-600 leading-tight">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-1.5 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-3.5 w-3.5 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <div className="text-xl font-bold text-slate-900">{stat.value}</div>
                  <p className="text-xs text-slate-500 mt-0.5 leading-tight">{stat.change}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <PhoneOutgoing className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">Outbound Campaign Management</h3>
            <p className="text-slate-600 max-w-md">
              Your outbound campaign management interface will be displayed here.
              You'll be able to create, schedule, and monitor automated calling campaigns.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
