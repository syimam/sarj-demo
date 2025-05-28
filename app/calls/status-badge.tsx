import { CheckCircle2, Clock, Info, Loader2, TimerOff } from "lucide-react";

import z from "zod";

export const ZCallStatus = z.enum([
  "queued",
  "in_progress",
  "completed",
  "timeout",
  "max_duration_reached",
  "failed",
]);

export type CallStatus = z.infer<typeof ZCallStatus>;

export const StatusBadge = ({ status }: { status: CallStatus | string }) => {
  // Determine styling based on status
  const getStatusStyle = (status: CallStatus | string): string => {
    switch (status) {
      case "completed":
        return "bg-green-50 text-green-700 border border-green-100";
      case "in_progress":
        return "bg-amber-50 text-amber-700 border border-amber-100";
      case "queued":
        return "bg-purple-50 text-purple-700 border border-purple-100";
      case "failed":
      case "timeout":
      case "max_duration_reached":
        return "bg-amber-50 text-amber-700 border border-slate-100";
      case "missed":
        return "bg-red-50 text-red-700 border border-red-100";
      default:
        return "bg-slate-50 text-slate-700 border border-slate-100";
    }
  };

  const DisplayStatusIcon: React.FC<{ status: CallStatus | string }> = ({ status }) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-3 h-3 mr-1" />;
      case "in_progress":
        return <Loader2 className="w-3 h-3 mr-1 animate-spin" />;
      case "max_duration_reached":
        return <Info className="w-3 h-3 mr-1" />;
      case "failed":
      case "missed":
        return <Info className="w-3 h-3 mr-1" />;
      case "timeout":
        return <TimerOff className="w-3 h-3 mr-1" />;
      case "queued":
        return <Clock className="w-3 h-3 mr-1" />;
      default:
        return <Clock className="w-3 h-3 mr-1" />;
    }
  };

  const formatStatusText = (status: CallStatus | string) => {
    return status?.replace(/_/g, " ")
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold ${getStatusStyle(status)}`}
    >
      <DisplayStatusIcon status={status} />
      {formatStatusText(status)}
    </span>
  );
};
