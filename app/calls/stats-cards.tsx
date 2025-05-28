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
      title: "Average Call Duration",
      value: formatDuration(Math.round(averageDuration)),
      icon: Clock,
      description: "Avg time per completed call",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Total Calls Today",
      value: totalCallsToday.toString(),
      icon: Phone,
      description: "Calls made today",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Success Rate",
      value: `${successRate.toFixed(1)}%`,
      icon: TrendingUp,
      description: "Completed calls ratio",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      title: "Total Calls",
      value: calls.length.toString(),
      icon: CheckCircle,
      description: "All time calls",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Active Calls",
      value: activeCalls.toString(),
      icon: Activity,
      description: "Currently in progress",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Failed Calls",
      value: failedCalls.toString(),
      icon: AlertCircle,
      description: "Failed or timed out",
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="hover:shadow-md transition-shadow dark:bg-slate-800 dark:border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 px-3 pt-3">
              <CardTitle className="text-xs font-medium text-slate-600 dark:text-slate-400 leading-tight">
                {stat.title}
              </CardTitle>
              <div className={`p-1 rounded-md ${stat.bgColor} dark:bg-opacity-20`}>
                <Icon className={`h-3 w-3 ${stat.color} dark:opacity-80`} />
              </div>
            </CardHeader>
            <CardContent className="px-3 pb-3">
              <div className="text-lg font-bold text-slate-900 dark:text-slate-100">{stat.value}</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">{stat.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
