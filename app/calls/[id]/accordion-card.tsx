"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyButton } from "./call-details-client";

interface AccordionCardProps {
  title: string;
  icon: React.ReactNode;
  copyText?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export function AccordionCard({ 
  title, 
  icon, 
  copyText, 
  defaultOpen = false, 
  children 
}: AccordionCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Card className="border-slate-200 dark:border-slate-700 shadow-sm">
      <CardHeader 
        className="pb-0 pt-4 px-4 md:px-6 flex-shrink-0 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <CardTitle className="text-base flex items-center justify-between">
          <div className="flex items-center">
            {icon}
            <span className="ml-2">{title}</span>
          </div>
          <div className="flex items-center gap-2">
            {copyText && (
              <CopyButton text={copyText} size="default" />
            )}
            <ChevronDown 
              className={`h-4 w-4 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
            />
          </div>
        </CardTitle>
      </CardHeader>
      {isOpen && (
        <CardContent className="p-4 md:p-6 pt-0">
          {children}
        </CardContent>
      )}
    </Card>
  );
}
