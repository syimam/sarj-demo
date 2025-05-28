import React from "react";
import { z } from "zod";

import { StatsCards } from "./stats-cards";
import { EnhancedCallsTable } from "./enhanced-calls-table";
import { PageHeader } from "@/components/page-header";

export type CallsDashboardProps = {
    searchParams: Promise<{
        cursor?: string;
    }>;
};

const ZSearchParams = z.object({
    cursor: z.string().optional(),
});

const LIMIT = 10;

// Sample data with various scenarios
const scenarios = [
  "hotel", "food-delivery", "dentist", "burgerizzr", "restaurant", "morni-outbound",
  "morni-inbound", "mismar", "combat", "sweater", "hospital", "vision-bank",
  "trukker", "alfarhan", "syarah", "technogym", "aaji-dental", "drive7-inbound",
  "drive7-outbound", "trukker-outbound", "riyadh-combat-club", "riyadh-combat-club-renewal",
  "sifi", "car-platform", "aromatic", "bonat", "medgulf-outbound", "medgulf-inbound",
  "delta", "debt-collector"
];

const statuses = ["completed", "in_progress", "failed"];
const sipStatuses = ["completed", "active", "failed", "busy", "no_answer"];
const directions = ["inbound", "outbound"] as const;

// Generate sample calls with various scenarios
const oldCalls = Array.from({ length: 50 }, (_, i) => {
  const scenario = scenarios[i % scenarios.length];
  const status = statuses[i % statuses.length];
  const direction = directions[i % directions.length];
  const sipStatus = sipStatuses[i % sipStatuses.length];
  const duration = Math.floor(Math.random() * 600) + 30; // 30 seconds to 10 minutes
  const createdAt = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(); // Last 7 days

  return {
    id: `call_${i.toString().padStart(4, '0')}${Math.random().toString(36).substring(2, 9)}`,
    createdAt,
    userId: `usr_${Math.floor(Math.random() * 100)}`,
    phoneNumber: `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`,
    scenario,
    scenarioData: Math.random() > 0.3 ? {
      type: scenario.includes('outbound') ? 'outbound' : 'inbound',
      priority: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
      category: scenario.split('-')[0]
    } : undefined,
    status,
    sipStatus: Math.random() > 0.2 ? sipStatus : undefined,
    totalDuration: duration,
    startedAt: createdAt,
    endedAt: status === 'completed' ? new Date(new Date(createdAt).getTime() + duration * 1000).toISOString() : new Date(new Date(createdAt).getTime() + duration * 1000).toISOString(),
    direction,
    responseBody: Math.random() > 0.4 ? {
      success: status === 'completed',
      rating: Math.floor(Math.random() * 5) + 1,
      notes: `Call handled for ${scenario} scenario`
    } : undefined
  };
});

const users = [
    { id: "usr_2k4j8h3m9n1p", email: "sarah.chen@email.com" },
    { id: "usr_9x8y7z6w5v4u", email: "alex.johnson@business.com" },
    { id: "usr_3a2b1c4d5e6f", email: "mike.rodriguez@company.com" },
    { id: "usr_7h8i9j0k1l2m", email: "jennifer.smith@enterprise.com" },
];


export default async function CallsDashboard({
    searchParams,
}: CallsDashboardProps) {
    const { cursor } = ZSearchParams.parse(await searchParams);
    const callResponse = {
        calls: oldCalls,
        cursor: cursor,
        limit: LIMIT,
    };
    const calls = callResponse.calls
    const usersById = Object.fromEntries(users.map((user) => [user.id, user]));

    return (
        <div className="h-full w-full flex flex-col overflow-hidden">
            {/* Page Header */}
            <PageHeader
                title="Calls"
                description="Monitor and manage all call activities"
                breadcrumbs={[
                    { label: "Operations" },
                    { label: "Calls" }
                ]}
            />

            <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-shrink-0 p-4 lg:p-6 pb-0">
                    {/* Dashboard Stats Cards */}
                    <StatsCards calls={calls} />
                </div>

                {/* Enhanced Calls Table - Takes remaining space */}
                <div className="flex-1 min-h-0 px-4 lg:px-6 pb-4 lg:pb-6 overflow-hidden">
                    <EnhancedCallsTable calls={calls} usersById={usersById} />
                </div>
            </div>
        </div>
    );
}
