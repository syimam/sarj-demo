"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DisplayLocalTime } from "../display-local-time";

interface TranscriptMessage {
  role: string;
  content: string;
  timestamp: string;
}

interface TranscriptChatProps {
  transcript: TranscriptMessage[];
}

export function TranscriptChat({ transcript }: TranscriptChatProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyMessage = async (content: string, index: number) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const copyFullTranscript = async () => {
    const fullTranscript = transcript
      .map(msg => `${msg.role === 'user' ? 'Caller' : 'AI Agent'}: ${msg.content}`)
      .join('\n\n');

    try {
      await navigator.clipboard.writeText(fullTranscript);
      setCopiedIndex(-1);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy transcript: ', err);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Compact Header with copy button */}
      <div className="flex-shrink-0 flex justify-between items-center mb-4">
        <div className="text-xs text-slate-600 dark:text-slate-400">
          {transcript.length} messages • {transcript.filter(m => m.role === 'user').length} caller, {transcript.filter(m => m.role === 'assistant').length} AI agent
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyFullTranscript}
          className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 h-6 w-6 p-0"
        >
          {copiedIndex === -1 ? (
            <Check className="h-3 w-3 text-green-600" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
        </Button>
      </div>

      {/* Chat messages - Fill remaining space */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
        {transcript.map((message, index) => (
          <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} group`}>
            <div className={`max-w-[80%] ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
              {/* Message bubble */}
              <div className={`relative px-3 py-2 rounded-2xl ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-600'
              }`}>
                {/* Copy button */}
                <button
                  onClick={() => copyMessage(message.content, index)}
                  className={`absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded ${
                    message.role === 'user' ? 'hover:bg-blue-600' : 'hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  {copiedIndex === index ? (
                    <Check className="h-2.5 w-2.5 text-green-600" />
                  ) : (
                    <Copy className={`h-2.5 w-2.5 ${message.role === 'user' ? 'text-blue-100' : 'text-slate-400 dark:text-slate-500'}`} />
                  )}
                </button>

                {/* Message content */}
                <p className="text-xs leading-relaxed pr-6">{message.content}</p>
              </div>

              {/* Message info */}
              <div className={`flex items-center space-x-2 mt-1 px-1 ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}>
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                  {message.role === 'user' ? 'Caller' : 'AI Agent'}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-500">
                  <DisplayLocalTime date={message.timestamp} />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
