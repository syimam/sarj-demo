import React from "react";
import { Settings, Bell, Shield, Phone, Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  const settingsCategories = [
    {
      title: "Call Settings",
      description: "Configure call routing, recording, and quality settings",
      icon: Phone,
      items: ["Call Routing", "Recording Settings", "Quality Monitoring", "IVR Configuration"]
    },
    {
      title: "User Management",
      description: "Manage agents, roles, and permissions",
      icon: Users,
      items: ["Agent Accounts", "Role Management", "Permissions", "Team Settings"]
    },
    {
      title: "Notifications",
      description: "Configure alerts and notification preferences",
      icon: Bell,
      items: ["Email Alerts", "SMS Notifications", "Dashboard Alerts", "Report Schedules"]
    },
    {
      title: "Security",
      description: "Security settings and access controls",
      icon: Shield,
      items: ["Two-Factor Auth", "API Keys", "Access Logs", "Data Encryption"]
    }
  ];

  return (
    <div className="h-full w-full">
      <div className="flex flex-col h-full p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
          <p className="text-slate-600">Configure your call center system settings and preferences.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {settingsCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Card key={category.title} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon className="mr-3 h-5 w-5 text-blue-600" />
                    {category.title}
                  </CardTitle>
                  <p className="text-sm text-slate-600">{category.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.items.map((item) => (
                      <li key={item} className="text-sm text-slate-700 hover:text-blue-600 cursor-pointer">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Settings className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">System Configuration</h3>
            <p className="text-slate-600 max-w-md">
              Detailed configuration options will be available here. 
              You'll be able to customize all aspects of your call center system.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
