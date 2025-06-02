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
    },
    {
      title: "Calls Today",
      value: "1,247",
      change: "+15% vs yesterday",
      icon: PhoneOutgoing,
    },
    {
      title: "Success Rate",
      value: "68.4%",
      change: "+2.1% this week",
      icon: BarChart3,
    },
  ];

  return (
    <div className="h-full w-full">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="border-b border-gray-200 bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-black">Outbound Campaigns</h1>
              <p className="text-gray-600">Manage and monitor your outbound calling campaigns</p>
            </div>
            <Button className="bg-[#674ea7] hover:bg-[#674ea7]/90 text-white">
              <Plus className="mr-2 h-4 w-4" />
              New Campaign
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
                      <div className="text-xs font-light text-gray-500">{stat.title}</div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Main Content */}
            <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
              <CardContent className="p-12">
                <div className="text-center">
                  <div className="p-6 bg-[#674ea7]/10 rounded-full inline-block mb-6">
                    <PhoneOutgoing className="h-12 w-12 text-[#674ea7]" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-4">Outbound Campaign Management</h3>
                  <p className="text-gray-600 max-w-md mx-auto font-light">
                    Your outbound campaign management interface will be displayed here.
                    You'll be able to create, schedule, and monitor automated calling campaigns.
                  </p>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
}
