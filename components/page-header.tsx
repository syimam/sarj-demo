"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  children?: React.ReactNode;
}

export function PageHeader({ title, description, breadcrumbs = [], children }: PageHeaderProps) {
  return (
    <div className="border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 lg:px-6 py-4">
      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <nav className="flex items-center space-x-1 text-sm text-slate-500 dark:text-slate-400 mb-2">
          <Link 
            href="/" 
            className="flex items-center hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
          >
            <Home className="h-4 w-4" />
          </Link>
          {breadcrumbs.map((item, index) => (
            <React.Fragment key={index}>
              <ChevronRight className="h-4 w-4 text-slate-400 dark:text-slate-500" />
              {item.href ? (
                <Link 
                  href={item.href}
                  className="hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-slate-900 dark:text-slate-100 font-medium">
                  {item.label}
                </span>
              )}
            </React.Fragment>
          ))}
        </nav>
      )}

      {/* Title and Description */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {title}
          </h1>
          {description && (
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              {description}
            </p>
          )}
        </div>
        
        {/* Optional actions */}
        {children && (
          <div className="flex items-center space-x-2">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
