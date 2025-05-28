import React from "react";
import { FileText, Plus, Search, MessageSquare, Users, Calendar } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Scenarios() {
  const stats = [
    {
      title: "Total Scenarios",
      value: "12",
      change: "3 active",
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Customer Service",
      value: "5",
      change: "Most used",
      icon: MessageSquare,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Sales & Marketing",
      value: "4",
      change: "High conversion",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Appointments",
      value: "3",
      change: "Scheduling",
      icon: Calendar,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <div className="h-full w-full">
      <div className="flex flex-col h-full p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Call Scenarios</h1>
            <p className="text-slate-600">Manage conversation templates and call flows for your AI agents.</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Scenario
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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

        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Search scenarios..."
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <FileText className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">Scenario Management</h3>
            <p className="text-slate-600 max-w-md">
              Your call scenario management interface will be displayed here.
              You'll be able to create, edit, and organize conversation templates and call flows for different use cases.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
