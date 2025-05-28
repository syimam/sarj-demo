import { Badge } from "@/components/ui/badge";

interface ScenarioBadgeProps {
  scenario: string;
}

export function ScenarioBadge({ scenario }: ScenarioBadgeProps) {
  const getScenarioColor = (scenario: string) => {
    const lowerScenario = scenario.toLowerCase();

    if (lowerScenario.includes("welcome")) {
      return "bg-blue-50 text-blue-700 border-blue-200";
    }
    if (lowerScenario.includes("survey")) {
      return "bg-purple-50 text-purple-700 border-purple-200";
    }
    if (lowerScenario.includes("appointment") || lowerScenario.includes("reminder")) {
      return "bg-green-50 text-green-700 border-green-200";
    }
    if (lowerScenario.includes("support") || lowerScenario.includes("help")) {
      return "bg-orange-50 text-orange-700 border-orange-200";
    }
    if (lowerScenario.includes("sales") || lowerScenario.includes("marketing")) {
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }

    // Default color
    return "bg-slate-50 text-slate-700 border-slate-200";
  };

  const formatScenarioText = (scenario: string) => {
    return scenario
      .split(/[-_\s]+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <Badge
      variant="outline"
      className={`${getScenarioColor(scenario)} font-semibold text-xs px-3 py-1.5 rounded-lg`}
    >
      {formatScenarioText(scenario)}
    </Badge>
  );
}
