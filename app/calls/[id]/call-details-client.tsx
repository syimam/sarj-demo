"use client";

import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
};

export const CopyableText = ({ text, label }: { text: string; label: string }) => (
  <div className="group flex items-center justify-between">
    <div>
      <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">{label}</p>
      <p className="font-mono text-sm text-slate-900 dark:text-slate-100">{text}</p>
    </div>
    <Button
      variant="ghost"
      size="sm"
      className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
      onClick={() => copyToClipboard(text)}
    >
      <Copy className="h-3 w-3" />
    </Button>
  </div>
);

export const CopyButton = ({ text, className = "", size = "sm" }: { text: string; className?: string; size?: "sm" | "default" }) => (
  <Button
    variant="ghost"
    size={size}
    className={`${size === "sm" ? "h-6 w-6" : "h-8 w-8"} p-0 ${className}`}
    onClick={() => copyToClipboard(text)}
  >
    <Copy className={size === "sm" ? "h-3 w-3" : "h-4 w-4"} />
  </Button>
);

export const PhoneCopyButton = ({ phoneNumber }: { phoneNumber: string }) => (
  <Button
    variant="ghost"
    size="sm"
    className="ml-2 h-6 w-6 p-0"
    onClick={() => copyToClipboard(phoneNumber)}
  >
    <Copy className="h-3 w-3" />
  </Button>
);
