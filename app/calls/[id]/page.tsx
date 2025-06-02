import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  Globe,
  Settings,
  ChevronRight,
  ArrowDownLeft,
  ArrowUpRight,
  Bot,
  Headphones,
  Code,
  MessageSquare
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { DisplayLocalTime } from "../display-local-time";
import { TranscriptChat } from "./transcript-chat";
import { AudioPlayer } from "./audio-player";
import { ScenarioBadge } from "../scenario-badge";
import { StatusBadge } from "../status-badge";
// import { CopyableText, CopyButton, PhoneCopyButton } from "./call-details-client";
import { AccordionCard } from "./accordion-card";

// Sample call data with multiple calls
const getSampleCallDetails = (id: string) => {
  // No need for async since this is just sample data

  const sampleCalls = {
    "call_123456789": {
      id: "call_123456789",
      direction: "inbound",
      endedAt: "2024-01-15T14:32:45Z",
      language: "en-US",
      phoneNumber: "+1 (555) 234-5678",
      scenario: "technical-support",
      sipStatus: "completed",
      sipTrunkId: "trunk_us_east_001",
      startedAt: "2024-01-15T14:28:12Z",
      status: "completed",
      totalDuration: 273,
      userId: "usr_2k4j8h3m9n1p",
      transcript: [
        {
          role: "assistant",
          content: "Hi there! Thanks for calling TechFlow Support. I'm Maya, your AI assistant. How can I help you today?",
          timestamp: "2024-01-15T14:28:15Z"
        },
        {
          role: "user",
          content: "Hey Maya, I'm having issues with my app crashing every time I try to upload a file. It's been happening for the past two days.",
          timestamp: "2024-01-15T14:28:28Z"
        },
        {
          role: "assistant",
          content: "I'm sorry to hear about the app crashes. That must be frustrating. Let me help you troubleshoot this. Can you tell me what type of files you're trying to upload and approximately how large they are?",
          timestamp: "2024-01-15T14:28:45Z"
        },
        {
          role: "user",
          content: "They're mostly PDF documents, around 5-10 MB each. I've tried with different files but same issue.",
          timestamp: "2024-01-15T14:29:02Z"
        },
        {
          role: "assistant",
          content: "Thanks for that info. PDF files of that size should work fine. Let's try a few quick fixes. First, can you try force-closing the app and reopening it? Then attempt to upload a smaller file, maybe under 2MB?",
          timestamp: "2024-01-15T14:29:18Z"
        },
        {
          role: "user",
          content: "Okay, let me try that... I closed the app and reopened it. Now trying with a smaller PDF... Oh wow, that worked! The smaller file uploaded successfully.",
          timestamp: "2024-01-15T14:29:55Z"
        },
        {
          role: "assistant",
          content: "Great! It sounds like there might be a memory issue with larger files. I'm going to escalate this to our development team and also send you a workaround. For now, try compressing your PDFs before uploading. Would you like me to email you instructions on how to do that?",
          timestamp: "2024-01-15T14:30:12Z"
        },
        {
          role: "user",
          content: "Yes, that would be super helpful! My email is sarah.chen@email.com",
          timestamp: "2024-01-15T14:30:28Z"
        },
        {
          role: "assistant",
          content: "Perfect! I've sent the PDF compression guide to sarah.chen@email.com and created a bug report for our dev team. You should receive a follow-up within 24 hours about the fix. Is there anything else I can help you with today?",
          timestamp: "2024-01-15T14:31:45Z"
        },
        {
          role: "user",
          content: "No, that's everything. Thanks so much Maya, you've been really helpful!",
          timestamp: "2024-01-15T14:32:02Z"
        },
        {
          role: "assistant",
          content: "You're very welcome, Sarah! I'm glad we could get that sorted out. Have a great day and don't hesitate to reach out if you need any more help!",
          timestamp: "2024-01-15T14:32:15Z"
        }
      ],
      responseBody: {
        issue_type: "technical_bug",
        resolution_status: "escalated_with_workaround",
        customer_satisfaction: 9.1,
        resolution_time_seconds: 273,
        follow_up_required: true,
        follow_up_eta: "24_hours",
        tags: ["app_crash", "file_upload", "pdf", "memory_issue"],
        escalation: {
          team: "mobile_development",
          priority: "medium",
          ticket_id: "DEV-2024-0115-001"
        }
      },
      audioUrl: "/api/calls/call_123456789/audio.mp3",
      audioWaveform: [0.1, 0.3, 0.2, 0.8, 0.4, 0.6, 0.9, 0.3, 0.7, 0.2, 0.5, 0.8, 0.1, 0.4, 0.6, 0.9, 0.2, 0.7, 0.3, 0.5, 0.8, 0.1, 0.6, 0.4, 0.9, 0.2, 0.7, 0.3, 0.5, 0.8]
    },

    "call_987654321": {
      id: "call_987654321",
      direction: "outbound",
      endedAt: "2024-01-15T16:45:30Z",
      language: "en-US",
      phoneNumber: "+1 (555) 987-6543",
      scenario: "customer-onboarding",
      sipStatus: "completed",
      sipTrunkId: "trunk_us_west_002",
      startedAt: "2024-01-15T16:38:15Z",
      status: "completed",
      totalDuration: 435,
      userId: "usr_9x8y7z6w5v4u",
      transcript: [
        {
          role: "assistant",
          content: "Hello! This is Alex from sarj.ai calling to welcome you to our platform. Is this a good time to chat about getting you set up?",
          timestamp: "2024-01-15T16:38:20Z"
        },
        {
          role: "user",
          content: "Hi Alex! Yes, perfect timing. I just signed up yesterday and I'm excited to get started.",
          timestamp: "2024-01-15T16:38:35Z"
        },
        {
          role: "assistant",
          content: "That's wonderful! I'm here to make sure you have everything you need for a smooth start. Have you had a chance to explore the dashboard yet?",
          timestamp: "2024-01-15T16:38:50Z"
        },
        {
          role: "user",
          content: "I logged in briefly but honestly, there's so much there. I wasn't sure where to begin.",
          timestamp: "2024-01-15T16:39:05Z"
        },
        {
          role: "assistant",
          content: "That's completely normal! Let me walk you through the key areas. First, let's start with setting up your first AI agent. This will be your main tool for handling customer interactions. Are you at your computer right now?",
          timestamp: "2024-01-15T16:39:20Z"
        },
        {
          role: "user",
          content: "Yes, I have the dashboard open. I can see there's an 'Agent Builder' section.",
          timestamp: "2024-01-15T16:39:40Z"
        },
        {
          role: "assistant",
          content: "Perfect! Click on Agent Builder. This is where you'll create your first AI agent. What type of business are you in? This will help me guide you to the right template.",
          timestamp: "2024-01-15T16:39:55Z"
        },
        {
          role: "user",
          content: "I run a small e-commerce business selling handmade jewelry. Most of my customer inquiries are about product details, shipping, and returns.",
          timestamp: "2024-01-15T16:40:15Z"
        },
        {
          role: "assistant",
          content: "That's perfect for our e-commerce template! You should see a template called 'E-commerce Support' - it's pre-configured for exactly those types of inquiries. Can you see it?",
          timestamp: "2024-01-15T16:40:35Z"
        },
        {
          role: "user",
          content: "Yes! I can see it. Should I click on it?",
          timestamp: "2024-01-15T16:40:50Z"
        },
        {
          role: "assistant",
          content: "Absolutely! Go ahead and click on it. This template will give you a great starting point. You can always customize it later to match your specific needs and brand voice.",
          timestamp: "2024-01-15T16:41:05Z"
        },
        {
          role: "user",
          content: "Okay, I clicked it and now I see a form asking for my business details. This looks much more manageable!",
          timestamp: "2024-01-15T16:41:25Z"
        },
        {
          role: "assistant",
          content: "Excellent! Fill out those details - your business name, typical products, return policy, etc. The more information you provide, the better your AI agent will be at helping your customers. I'll send you a setup checklist via email after this call. Any questions so far?",
          timestamp: "2024-01-15T16:41:45Z"
        },
        {
          role: "user",
          content: "This is really helpful, thank you! One question - how quickly can I have this up and running?",
          timestamp: "2024-01-15T16:42:10Z"
        },
        {
          role: "assistant",
          content: "Great question! Once you complete the setup form, your agent will be ready for testing immediately. I'd recommend spending about 30 minutes testing it with different scenarios, then you can go live. The whole process typically takes under an hour. Would you like me to schedule a follow-up call to check how everything's going?",
          timestamp: "2024-01-15T16:42:30Z"
        },
        {
          role: "user",
          content: "That would be amazing! How about tomorrow afternoon?",
          timestamp: "2024-01-15T16:42:50Z"
        },
        {
          role: "assistant",
          content: "Perfect! I'll schedule a follow-up call for tomorrow at 2 PM. You'll receive a calendar invite shortly. In the meantime, feel free to explore and don't hesitate to reach out if you have any questions. Welcome to sarj.ai!",
          timestamp: "2024-01-15T16:43:15Z"
        }
      ],
      responseBody: {
        issue_type: "onboarding_support",
        resolution_status: "completed_successfully",
        customer_satisfaction: 9.8,
        resolution_time_seconds: 435,
        follow_up_required: true,
        follow_up_eta: "24_hours",
        tags: ["new_customer", "onboarding", "e_commerce", "agent_setup"],
        escalation: null,
        next_steps: ["complete_agent_setup", "test_scenarios", "follow_up_call"]
      },
      audioUrl: "/api/calls/call_987654321/audio.mp3",
      audioWaveform: [0.2, 0.4, 0.3, 0.7, 0.5, 0.8, 0.6, 0.4, 0.9, 0.3, 0.6, 0.7, 0.2, 0.5, 0.8, 0.4, 0.3, 0.6, 0.9, 0.2, 0.7, 0.5, 0.8, 0.3, 0.6, 0.4, 0.9, 0.2, 0.7, 0.5]
    },

    "call_456789123": {
      id: "call_456789123",
      direction: "inbound",
      endedAt: "2024-01-15T11:15:22Z",
      language: "en-US",
      phoneNumber: "+1 (555) 456-7890",
      scenario: "billing-inquiry",
      sipStatus: "completed",
      sipTrunkId: "trunk_us_central_003",
      startedAt: "2024-01-15T11:12:08Z",
      status: "completed",
      totalDuration: 194,
      userId: "usr_3a2b1c4d5e6f",
      transcript: [
        {
          role: "assistant",
          content: "Hello! Thank you for calling sarj.ai billing support. I'm Jordan, your AI assistant. How can I help you with your account today?",
          timestamp: "2024-01-15T11:12:12Z"
        },
        {
          role: "user",
          content: "Hi Jordan, I received my monthly bill and there's a charge I don't recognize. It says 'Premium Features' for $29.99 but I don't remember signing up for anything premium.",
          timestamp: "2024-01-15T11:12:25Z"
        },
        {
          role: "assistant",
          content: "I understand your concern about the unexpected charge. Let me look into your account right away. Can you please confirm the email address associated with your account?",
          timestamp: "2024-01-15T11:12:40Z"
        },
        {
          role: "user",
          content: "Sure, it's mike.rodriguez@company.com",
          timestamp: "2024-01-15T11:12:55Z"
        },
        {
          role: "assistant",
          content: "Thank you, Mike. I can see your account here. Looking at your billing history, the Premium Features charge was activated on January 10th when you upgraded your AI agent to handle advanced analytics. This includes detailed call reports and sentiment analysis.",
          timestamp: "2024-01-15T11:13:15Z"
        },
        {
          role: "user",
          content: "Oh wait, you're right! I remember now. I was testing the analytics features last week. Is there a way to see what's included in this premium package?",
          timestamp: "2024-01-15T11:13:35Z"
        },
        {
          role: "assistant",
          content: "Absolutely! Your Premium Features include advanced analytics, sentiment analysis, custom reporting, priority support, and extended call history. You can view all these features in your dashboard under 'Account Settings' > 'Subscription Details'. Would you like me to walk you through any of these features?",
          timestamp: "2024-01-15T11:13:55Z"
        },
        {
          role: "user",
          content: "That's helpful, thank you. Actually, I think I want to keep it. The analytics have been really useful for understanding my customers better.",
          timestamp: "2024-01-15T11:14:15Z"
        },
        {
          role: "assistant",
          content: "That's great to hear! The analytics really do provide valuable insights. Your next billing date is February 15th. Is there anything else I can help you with regarding your account or billing?",
          timestamp: "2024-01-15T11:14:35Z"
        },
        {
          role: "user",
          content: "No, that clears everything up. Thanks for the quick help, Jordan!",
          timestamp: "2024-01-15T11:14:50Z"
        },
        {
          role: "assistant",
          content: "You're very welcome, Mike! I'm glad we could resolve that quickly. If you have any other questions about your premium features or billing, don't hesitate to call us. Have a great day!",
          timestamp: "2024-01-15T11:15:05Z"
        }
      ],
      responseBody: {
        issue_type: "billing_inquiry",
        resolution_status: "resolved_successfully",
        customer_satisfaction: 9.5,
        resolution_time_seconds: 194,
        follow_up_required: false,
        follow_up_eta: null,
        tags: ["billing", "premium_features", "account_clarification", "retention"],
        escalation: null,
        billing_action: "no_refund_requested"
      },
      audioUrl: "/api/calls/call_456789123/audio.mp3",
      audioWaveform: [0.3, 0.5, 0.4, 0.6, 0.7, 0.5, 0.8, 0.4, 0.6, 0.3, 0.7, 0.5, 0.4, 0.8, 0.6, 0.3, 0.5, 0.7, 0.4, 0.6, 0.8, 0.3, 0.5, 0.7, 0.4, 0.6, 0.8, 0.3, 0.5, 0.7]
    },

    "call_789123456": {
      id: "call_789123456",
      direction: "outbound",
      endedAt: "2024-01-15T09:28:45Z",
      language: "en-US",
      phoneNumber: "+1 (555) 789-1234",
      scenario: "sales-follow-up",
      sipStatus: "completed",
      sipTrunkId: "trunk_us_east_001",
      startedAt: "2024-01-15T09:22:30Z",
      status: "completed",
      totalDuration: 375,
      userId: "usr_7h8i9j0k1l2m",
      transcript: [
        {
          role: "assistant",
          content: "Good morning! This is Sam from sarj.ai. I'm calling to follow up on your interest in our AI customer service platform. Is this a good time to chat?",
          timestamp: "2024-01-15T09:22:35Z"
        },
        {
          role: "user",
          content: "Hi Sam! Yes, I've been expecting your call. I filled out the form on your website last week about potentially upgrading our customer service.",
          timestamp: "2024-01-15T09:22:50Z"
        },
        {
          role: "assistant",
          content: "Perfect! I see you're currently handling about 200 customer inquiries per day manually. That must be quite demanding for your team. What's your biggest challenge with your current setup?",
          timestamp: "2024-01-15T09:23:10Z"
        },
        {
          role: "user",
          content: "Honestly, it's the repetitive questions. About 60% of our calls are the same basic questions about hours, locations, and pricing. My team spends so much time on these that they can't focus on the complex issues that really need human attention.",
          timestamp: "2024-01-15T09:23:35Z"
        },
        {
          role: "assistant",
          content: "That's exactly what our AI agents excel at! They can handle those routine inquiries 24/7, freeing up your human agents for the complex problems. Based on your volume, I'd estimate you could reduce your team's workload by about 60-70%. Would you like to see how this would work with your specific use cases?",
          timestamp: "2024-01-15T09:24:00Z"
        },
        {
          role: "user",
          content: "That sounds promising. What about the setup process? We can't afford to have our customer service down while implementing something new.",
          timestamp: "2024-01-15T09:24:20Z"
        },
        {
          role: "assistant",
          content: "Great question! We do a parallel implementation - your AI agent runs alongside your current system initially. We start with a small percentage of calls, monitor performance, and gradually increase as you gain confidence. Most clients are fully transitioned within 2-3 weeks with zero downtime.",
          timestamp: "2024-01-15T09:24:45Z"
        },
        {
          role: "user",
          content: "That's reassuring. What about cost? We're a mid-size company, so budget is definitely a consideration.",
          timestamp: "2024-01-15T09:25:05Z"
        },
        {
          role: "assistant",
          content: "I understand budget is important. Based on your call volume, you'd be looking at our Professional plan at $299 per month, which includes unlimited calls and our full feature set. Considering you're probably spending $3000+ monthly on staff time for those routine calls, the ROI is typically very strong. Would you like me to prepare a detailed cost analysis for your specific situation?",
          timestamp: "2024-01-15T09:25:30Z"
        },
        {
          role: "user",
          content: "Yes, that would be helpful. Also, could we do a trial or demo to see how it works with our actual customers?",
          timestamp: "2024-01-15T09:25:50Z"
        },
        {
          role: "assistant",
          content: "Absolutely! We offer a 14-day free trial where we set up an AI agent specifically for your business. You can test it with real customers on a small scale. I can also schedule a live demo next week where I'll show you exactly how it would handle your most common inquiries. Which would you prefer to start with?",
          timestamp: "2024-01-15T09:26:15Z"
        },
        {
          role: "user",
          content: "Let's start with the demo first, then move to the trial if it looks good. When are you available next week?",
          timestamp: "2024-01-15T09:26:35Z"
        },
        {
          role: "assistant",
          content: "Perfect approach! I have availability Tuesday at 2 PM or Wednesday at 10 AM. The demo will take about 30 minutes and I'll customize it to show your specific use cases. Which time works better for you?",
          timestamp: "2024-01-15T09:26:55Z"
        },
        {
          role: "user",
          content: "Tuesday at 2 PM works great. Should I have anyone else from my team join?",
          timestamp: "2024-01-15T09:27:15Z"
        },
        {
          role: "assistant",
          content: "I'd recommend having your customer service manager and maybe someone from IT if possible. I'll send you a calendar invite with a preparation checklist. Looking forward to showing you how sarj.ai can transform your customer service!",
          timestamp: "2024-01-15T09:27:35Z"
        }
      ],
      responseBody: {
        issue_type: "sales_follow_up",
        resolution_status: "demo_scheduled",
        customer_satisfaction: 8.9,
        resolution_time_seconds: 375,
        follow_up_required: true,
        follow_up_eta: "7_days",
        tags: ["sales", "demo_scheduled", "mid_size_business", "professional_plan"],
        escalation: null,
        sales_stage: "demo_scheduled",
        next_steps: ["send_calendar_invite", "prepare_custom_demo", "follow_up_after_demo"]
      },
      audioUrl: "/api/calls/call_789123456/audio.mp3",
      audioWaveform: [0.4, 0.6, 0.5, 0.8, 0.7, 0.6, 0.9, 0.5, 0.7, 0.4, 0.8, 0.6, 0.5, 0.9, 0.7, 0.4, 0.6, 0.8, 0.5, 0.7, 0.9, 0.4, 0.6, 0.8, 0.5, 0.7, 0.9, 0.4, 0.6, 0.8]
    }
  };

  // Return the requested call or a default call if not found
  return sampleCalls[id as keyof typeof sampleCalls] || sampleCalls["call_123456789"];
};

const formatDuration = (seconds: number | null) => {
  if (!seconds) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
};

interface CallDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function CallDetailsPage({ params }: CallDetailsPageProps) {
  const { id } = await params;
  const call = getSampleCallDetails(id);

  if (!call) {
    notFound();
  }

  return (
    <div className="h-full max-h-screen w-full flex flex-col overflow-hidden">
      {/* Compact Navigation Bar */}
      <div className="flex-shrink-0 border-b border-gray-200 bg-white px-4 lg:px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild className="text-gray-600 hover:text-[#674ea7]">
              <Link href="/calls">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Calls
              </Link>
            </Button>

            {/* Breadcrumb */}
            <nav className="hidden md:flex items-center space-x-1 text-sm text-gray-500">
              <Link href="/" className="hover:text-[#674ea7] transition-colors">
                Operations
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/calls" className="hover:text-[#674ea7] transition-colors">
                Calls
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-gray-900 font-medium">Details</span>
            </nav>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="border-gray-200 text-gray-600 hover:text-[#674ea7] hover:border-[#674ea7]">
              <Headphones className="h-4 w-4 mr-2" />
              Listen
            </Button>
            <Button variant="outline" size="sm" className="border-gray-200 text-gray-600 hover:text-[#674ea7] hover:border-[#674ea7]">
              <Code className="h-4 w-4 mr-2" />
              API
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-h-0 p-4 lg:p-6 space-y-4 overflow-auto bg-gray-50">
        {/* Call Overview Card */}
        <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4 md:p-6">
            <div className="space-y-6">
              {/* Top Row: Call Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Left: Call Info */}
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-full ${call.direction === 'inbound' ? 'bg-[#674ea7]/10' : 'bg-emerald-100'}`}>
                    {call.direction === 'inbound' ? (
                      <ArrowDownLeft className="h-5 w-5 text-[#674ea7]" />
                    ) : (
                      <ArrowUpRight className="h-5 w-5 text-emerald-600" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                      {call.phoneNumber}
                      {/* <PhoneCopyButton phoneNumber={call.phoneNumber} /> */}
                    </h2>
                    <div className="flex items-center mt-1 space-x-2">
                      <Badge variant={call.direction === 'inbound' ? 'default' : 'secondary'} className="capitalize bg-[#674ea7]/10 text-[#674ea7] border-[#674ea7]/20">
                        {call.direction}
                      </Badge>
                      <ScenarioBadge scenario={call.scenario} />
                      <StatusBadge status={call.status} />
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      <DisplayLocalTime date={call.startedAt} />
                    </p>
                  </div>
                </div>

                {/* Right: Quick Stats */}
                <div className="flex flex-wrap gap-4 md:gap-6">
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-gray-500 uppercase tracking-wide">Duration</span>
                    <span className="text-lg font-bold text-gray-900 flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-[#674ea7]" />
                      {formatDuration(call.totalDuration)}
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="text-xs text-gray-500 uppercase tracking-wide">Language</span>
                    <span className="text-lg font-bold text-gray-900 flex items-center">
                      <Globe className="h-4 w-4 mr-1 text-[#674ea7]" />
                      {call.language}
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="text-xs text-gray-500 uppercase tracking-wide">Messages</span>
                    <span className="text-lg font-bold text-gray-900 flex items-center">
                      <MessageSquare className="h-4 w-4 mr-1 text-[#674ea7]" />
                      {call.transcript.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Row: Details Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Voice Analysis */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Bot className="h-4 w-4 mr-2 text-[#674ea7]" />
                      <span className="text-sm font-medium text-gray-700">Voice Analysis</span>
                    </div>
                    <Button variant="outline" size="sm" className="text-xs h-7 border-gray-200 text-gray-600 hover:text-[#674ea7] hover:border-[#674ea7]">
                      Generate Clone
                    </Button>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Sentiment</span>
                      <span className="font-medium text-green-600">Positive</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Emotion</span>
                      <span className="font-medium text-gray-900">Satisfied</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Speech Rate</span>
                      <span className="font-medium text-gray-900">Normal</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Clarity</span>
                      <span className="font-medium text-gray-900">95%</span>
                    </div>
                  </div>
                </div>

                {/* Call Metadata */}
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Settings className="h-4 w-4 mr-2 text-[#674ea7]" />
                    <span className="text-sm font-medium text-gray-700">Call Metadata</span>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Call ID</p>
                      <p className="text-sm text-gray-900 font-medium font-mono">{call.id}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">User ID</p>
                      <p className="text-sm text-gray-900 font-medium font-mono">{call.userId}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">SIP Trunk ID</p>
                      <p className="text-sm text-gray-900 font-medium font-mono">{call.sipTrunkId}</p>
                    </div>
                  </div>
                </div>

                {/* Timestamps */}
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-[#674ea7]" />
                    <span className="text-sm font-medium text-gray-700">Call Timeline</span>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Started At</p>
                      <p className="text-sm text-gray-900 font-medium" title={call.startedAt}>
                        <DisplayLocalTime date={call.startedAt} />
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Ended At</p>
                      <p className="text-sm text-gray-900 font-medium" title={call.endedAt}>
                        <DisplayLocalTime date={call.endedAt} />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Column - Transcript */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm h-[500px] flex flex-col">
              <CardHeader className="pb-0 pt-4 px-4 md:px-6 flex-shrink-0 border-b border-gray-100">
                <CardTitle className="text-base flex items-center justify-between">
                  <div className="flex items-center">
                    <Bot className="h-4 w-4 mr-2 text-[#674ea7]" />
                    Conversation Transcript
                  </div>
                  {/* <CopyButton text={JSON.stringify(call.transcript)} size="default" /> */}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 flex-1 overflow-hidden">
                <div className="h-full overflow-auto p-4 md:p-6">
                  <TranscriptChat transcript={call.transcript} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Audio & Data */}
          <div className="space-y-4">
            {/* Audio Player */}
            <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-0 pt-4 px-4 md:px-6 flex-shrink-0">
                <CardTitle className="text-base flex items-center justify-between">
                  <div className="flex items-center">
                    <Headphones className="h-4 w-4 mr-2 text-[#674ea7]" />
                    Call Recording
                  </div>
                  <Badge variant="outline" className="text-xs border-[#674ea7]/20 text-[#674ea7]">
                    {formatDuration(call.totalDuration)}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <AudioPlayer
                  audioUrl={call.audioUrl}
                  duration={call.totalDuration}
                  title={`Call ${call.id}`}
                />
              </CardContent>
            </Card>

            {/* Response Data Accordion */}
            <AccordionCard
              title="Response Data"
              icon={<Code className="h-4 w-4 text-[#674ea7]" />}
              copyText={JSON.stringify(call.responseBody)}
              defaultOpen={false}
            >
              <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-auto">
                <pre className="text-xs text-gray-800 font-mono whitespace-pre-wrap">
                  {JSON.stringify(call.responseBody, null, 2)}
                </pre>
              </div>
            </AccordionCard>
          </div>
        </div>
      </div>
    </div>
  );
}
