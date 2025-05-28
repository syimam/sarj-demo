import React from "react";
import { BarChart3, TrendingUp, Users, Clock } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Analytics() {
  return (
    <div className="h-full w-full">
      <div className="flex flex-col h-full p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Analytics</h1>
          <p className="text-slate-600">Detailed insights and performance metrics for your call center.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 pt-4">
              <CardTitle className="text-xs font-medium text-slate-600 leading-tight">
                Total Calls This Month
              </CardTitle>
              <div className="p-1.5 rounded-lg bg-slate-50">
                <BarChart3 className="h-3.5 w-3.5 text-slate-400" />
              </div>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="text-xl font-bold text-slate-900">12,345</div>
              <p className="text-xs text-green-600 mt-0.5 leading-tight">+15% from last month</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 pt-4">
              <CardTitle className="text-xs font-medium text-slate-600 leading-tight">
                Average Response Time
              </CardTitle>
              <div className="p-1.5 rounded-lg bg-slate-50">
                <Clock className="h-3.5 w-3.5 text-slate-400" />
              </div>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="text-xl font-bold text-slate-900">2.3s</div>
              <p className="text-xs text-green-600 mt-0.5 leading-tight">-0.5s from last month</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 pt-4">
              <CardTitle className="text-xs font-medium text-slate-600 leading-tight">
                Customer Satisfaction
              </CardTitle>
              <div className="p-1.5 rounded-lg bg-slate-50">
                <TrendingUp className="h-3.5 w-3.5 text-slate-400" />
              </div>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="text-xl font-bold text-slate-900">4.8/5</div>
              <p className="text-xs text-green-600 mt-0.5 leading-tight">+0.2 from last month</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 pt-4">
              <CardTitle className="text-xs font-medium text-slate-600 leading-tight">
                Active Agents
              </CardTitle>
              <div className="p-1.5 rounded-lg bg-slate-50">
                <Users className="h-3.5 w-3.5 text-slate-400" />
              </div>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="text-xl font-bold text-slate-900">45</div>
              <p className="text-xs text-green-600 mt-0.5 leading-tight">+3 from last month</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">Analytics Dashboard</h3>
            <p className="text-slate-600 max-w-md">
              Detailed analytics and reporting features will be available here.
              This includes call volume trends, agent performance metrics, and customer satisfaction reports.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
