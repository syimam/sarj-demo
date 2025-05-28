import React from "react";
import { Users, Plus, Search, UserCheck, UserX } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/page-header";

export default function Agents() {
  const stats = [
    {
      title: "Total Agents",
      value: "24",
      change: "+2 this week",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Active Agents",
      value: "18",
      change: "Currently online",
      icon: UserCheck,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Offline Agents",
      value: "6",
      change: "Not available",
      icon: UserX,
      color: "text-slate-600",
      bgColor: "bg-slate-50",
    },
  ];

  return (
    <div className="h-full w-full flex flex-col overflow-hidden">
      {/* Page Header */}
      <PageHeader
        title="AI Agents"
        description="Manage your AI agents and their configurations"
        breadcrumbs={[
          { label: "Operations" },
          { label: "Agents" }
        ]}
      >
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Agent
        </Button>
      </PageHeader>

      <div className="flex-1 flex flex-col overflow-hidden p-6 space-y-6">

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

        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Search agents..."
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Users className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">AI Agent Management</h3>
            <p className="text-slate-600 max-w-md">
              Your AI agent management interface will be displayed here.
              You'll be able to create, configure, and monitor your AI agents for different call scenarios.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
