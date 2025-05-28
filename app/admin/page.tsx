import React from "react";
import { Shield, Users, Settings, Activity, Database, Lock } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Admin() {
  const adminSections = [
    {
      title: "User Management",
      description: "Manage user accounts, roles, and permissions",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "System Settings",
      description: "Configure system-wide settings and preferences",
      icon: Settings,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Security & Access",
      description: "Manage security policies and access controls",
      icon: Lock,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "System Monitoring",
      description: "Monitor system performance and health",
      icon: Activity,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Data Management",
      description: "Backup, restore, and manage system data",
      icon: Database,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <div className="h-full w-full">
      <div className="flex flex-col h-full p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">System Administration</h1>
          <p className="text-slate-600">Manage system settings, users, and security configurations.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminSections.map((section) => {
            const Icon = section.icon;
            return (
              <Card key={section.title} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div className={`p-2 rounded-lg ${section.bgColor} mr-3`}>
                      <Icon className={`h-5 w-5 ${section.color}`} />
                    </div>
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">{section.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Shield className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">Administration Panel</h3>
            <p className="text-slate-600 max-w-md">
              The system administration interface will be available here. 
              You'll have access to all administrative functions and system management tools.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
