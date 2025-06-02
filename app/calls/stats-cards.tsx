import { Clock, Phone, TrendingUp, CheckCircle, AlertCircle, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Call {
  id: string;
  createdAt: string;
  direction: string;
  status: string;
  totalDuration: number;
  startedAt: string;
  endedAt: string;
}

interface StatsCardsProps {
  calls: Call[];
}

export function StatsCards({ calls }: StatsCardsProps) {
  // Calculate stats
  const today = new Date().toDateString();
  const todaysCalls = calls.filter(call =>
    new Date(call.createdAt).toDateString() === today
  );

  const totalCallsToday = todaysCalls.length;

  const completedCalls = calls.filter(call => call.status === "completed");
  const successRate = calls.length > 0 ? (completedCalls.length / calls.length) * 100 : 0;

  const totalDuration = completedCalls.reduce((sum, call) => sum + (call.totalDuration || 0), 0);
  const averageDuration = completedCalls.length > 0 ? totalDuration / completedCalls.length : 0;

  const activeCalls = calls.filter(call => call.status === "in_progress").length;
  const failedCalls = calls.filter(call =>
    call.status === "failed" || call.status === "timeout" || call.status === "max_duration_reached"
  ).length;

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const stats = [
    {
      label: "Avg Duration",
      value: formatDuration(Math.round(averageDuration)),
      icon: Clock,
      change: "Per call"
    },
    {
      label: "Today's Calls",
      value: totalCallsToday.toString(),
      icon: Phone,
      change: "+12% vs yesterday"
    },
    {
      label: "Success Rate",
      value: `${successRate.toFixed(1)}%`,
      icon: TrendingUp,
      change: "+2.3% this week"
    },
    {
      label: "Total Calls",
      value: calls.length.toString(),
      icon: CheckCircle,
      change: "All time"
    },
    {
      label: "Active Calls",
      value: activeCalls.toString(),
      icon: Activity,
      change: "In progress"
    },
    {
      label: "Failed Calls",
      value: failedCalls.toString(),
      icon: AlertCircle,
      change: "Need attention"
    },
  ];

  return (
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
  );
}
