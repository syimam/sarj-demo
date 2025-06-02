"use client";

import React, { useState } from "react";
import { z } from "zod";

import { EnhancedCallsTable } from "./enhanced-calls-table";
import { CallDetailsDrawer } from "./call-details-drawer";
import { LoadingOverlay } from "@/components/ui/loading";

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

  // Sample transcript data
  const sampleTranscripts = [
    [
      { role: "assistant" as const, content: "Hello! Thank you for calling. How can I help you today?", timestamp: "2024-01-15T10:00:00Z" },
      { role: "user" as const, content: "Hi, I'd like to make a reservation for tonight.", timestamp: "2024-01-15T10:00:05Z" },
      { role: "assistant" as const, content: "I'd be happy to help you with a reservation. For how many people?", timestamp: "2024-01-15T10:00:10Z" },
      { role: "user" as const, content: "For 4 people, around 7 PM if possible.", timestamp: "2024-01-15T10:00:15Z" },
      { role: "assistant" as const, content: "Perfect! I have availability at 7:15 PM for a party of 4. Would that work for you?", timestamp: "2024-01-15T10:00:20Z" },
      { role: "user" as const, content: "That sounds great! Can I get that reserved?", timestamp: "2024-01-15T10:00:25Z" },
      { role: "assistant" as const, content: "Absolutely! I'll need a name and phone number for the reservation.", timestamp: "2024-01-15T10:00:30Z" }
    ],
    [
      { role: "assistant" as const, content: "Good morning! Thank you for calling our dental office. How may I assist you?", timestamp: "2024-01-15T09:00:00Z" },
      { role: "user" as const, content: "I need to schedule a cleaning appointment.", timestamp: "2024-01-15T09:00:05Z" },
      { role: "assistant" as const, content: "I'd be happy to schedule that for you. When was your last cleaning?", timestamp: "2024-01-15T09:00:10Z" },
      { role: "user" as const, content: "It's been about 6 months.", timestamp: "2024-01-15T09:00:15Z" },
      { role: "assistant" as const, content: "Perfect timing! I have openings next week. Would Tuesday at 2 PM work?", timestamp: "2024-01-15T09:00:20Z" }
    ],
    [
      { role: "assistant" as const, content: "Thank you for calling! I'm calling about your recent order. Is this a good time to talk?", timestamp: "2024-01-15T14:00:00Z" },
      { role: "user" as const, content: "Yes, what about my order?", timestamp: "2024-01-15T14:00:05Z" },
      { role: "assistant" as const, content: "I wanted to confirm your delivery address and let you know it's on its way!", timestamp: "2024-01-15T14:00:10Z" },
      { role: "user" as const, content: "Great! When should I expect it?", timestamp: "2024-01-15T14:00:15Z" },
      { role: "assistant" as const, content: "It should arrive within the next 2 hours. You'll receive a text when the driver is nearby.", timestamp: "2024-01-15T14:00:20Z" }
    ]
  ];

  return {
    id: `call_${i.toString().padStart(4, '0')}${Math.random().toString(36).substring(2, 9)}`,
    createdAt,
    userId: `usr_${Math.floor(Math.random() * 100)}`,
    phoneNumber: `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`,
    scenario,
    language: ['English', 'Spanish', 'Arabic'][Math.floor(Math.random() * 3)],
    sipTrunkId: `sip_${Math.random().toString(36).substring(2, 9)}`,
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
    transcript: Math.random() > 0.2 ? sampleTranscripts[i % sampleTranscripts.length] : undefined,
    audioUrl: `https://example.com/audio/call_${i}.mp3`,
    responseBody: Math.random() > 0.4 ? {
      success: status === 'completed',
      rating: Math.floor(Math.random() * 5) + 1,
      notes: `Call handled for ${scenario} scenario`,
      customerSatisfaction: Math.floor(Math.random() * 5) + 1,
      resolvedIssue: Math.random() > 0.3
    } : undefined
  };
});

const users = [
    { id: "usr_2k4j8h3m9n1p", email: "sarah.chen@email.com" },
    { id: "usr_9x8y7z6w5v4u", email: "alex.johnson@business.com" },
    { id: "usr_3a2b1c4d5e6f", email: "mike.rodriguez@company.com" },
    { id: "usr_7h8i9j0k1l2m", email: "jennifer.smith@enterprise.com" },
];


function CallsDashboardClient({ calls, usersById }: { calls: any[], usersById: any }) {
    const [selectedCall, setSelectedCall] = useState<any>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isDrawerLoading, setIsDrawerLoading] = useState(false);
    const [isTableLoading, setIsTableLoading] = useState(false);

    const handleCallClick = async (call: any) => {
        setIsDrawerLoading(true);
        setIsDrawerOpen(true);

        // Simulate loading time for call details
        setTimeout(() => {
            setSelectedCall(call);
            setIsDrawerLoading(false);
        }, 800);
    };

    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
        setIsDrawerLoading(false);
        setTimeout(() => {
            setSelectedCall(null);
        }, 300);
    };

    return (
        <div className="h-full w-full">
            <div className="flex flex-col h-full">
                {/* Header */}
                <div className="border-b border-gray-200 bg-white px-6 py-4">
                    <h1 className="text-2xl font-bold text-black">Calls</h1>
                    <p className="text-gray-600">Monitor and manage all call activities</p>
                </div>

                <div className="flex-1 overflow-auto p-6 bg-gray-50">
                    <div className="max-w-7xl mx-auto">
                        {/* Enhanced Calls Table */}
                        <LoadingOverlay isLoading={isTableLoading} loadingText="Loading calls...">
                            <EnhancedCallsTable
                                calls={calls}
                                usersById={usersById}
                                onCallClick={handleCallClick}
                            />
                        </LoadingOverlay>
                    </div>
                </div>
            </div>

            {/* Call Details Drawer */}
            <CallDetailsDrawer
                call={selectedCall}
                isOpen={isDrawerOpen}
                isLoading={isDrawerLoading}
                onClose={handleCloseDrawer}
            />
        </div>
    );
}

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

    return <CallsDashboardClient calls={calls} usersById={usersById} />;
}
