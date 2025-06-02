"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Phone,
  Users,
  PhoneOutgoing,
  FileText,
  Shield,
  Building,
  Webhook,
  Key,
  Bot,
  X,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Home,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";
import { useLoading } from "./loading-provider";

const navigation = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    type: "section",
    name: "Dashboard",
  },
  {
    name: "Overview",
    href: "/dashboard",
    icon: BarChart3,
  },
  {
    type: "section",
    name: "Operations",
  },
  {
    name: "Agents",
    href: "/agents",
    icon: Users,
  },
  {
    name: "Outbound",
    href: "/outbound",
    icon: PhoneOutgoing,
  },
  {
    name: "Calls",
    href: "/calls",
    icon: Phone,
  },
  {
    name: "Scenarios",
    href: "/scenarios",
    icon: FileText,
  },
  {
    type: "section",
    name: "Configuration",
  },
  {
    name: "Agent Builder",
    href: "/agent-builder",
    icon: Bot,
  },
  {
    name: "Admin",
    href: "/admin",
    icon: Shield,
  },
  {
    name: "Organizations",
    href: "/organizations",
    icon: Building,
  },
  {
    type: "section",
    name: "Integrations",
  },
  {
    name: "Webhooks",
    href: "/webhooks",
    icon: Webhook,
  },
  {
    name: "API Keys",
    href: "/api-keys",
    icon: Key,
  },
];

interface SidebarProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  onClose?: () => void;
}

export function Sidebar({ collapsed = false, onToggleCollapse, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { startPageTransition } = useLoading();

  const handleNavigation = (href: string) => {
    if (pathname !== href) {
      startPageTransition();
    }
  };

  return (
    <div className="flex h-full w-full flex-col bg-white border-r border-gray-200 shadow-lg lg:shadow-none">
      {/* Logo/Brand */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
        <div className="flex items-center space-x-3 min-w-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#674ea7] flex-shrink-0">
            <Bot className="h-5 w-5 text-white" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <h1 className="text-lg font-bold text-gray-900 truncate">sarj.ai</h1>
              <p className="text-xs text-gray-500 truncate">AI Call Management</p>
            </div>
          )}
        </div>

        {/* Mobile close button */}
        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden text-gray-500 hover:text-[#674ea7]"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {navigation.map((item, index) => {
          if (item.type === "section") {
            if (collapsed) {
              return (
                <div key={item.name} className={cn("mb-2", index > 0 && "mt-6")}>
                  <div className="h-px bg-gray-200 mx-2"></div>
                </div>
              );
            }
            return (
              <div key={item.name} className={cn("mb-2", index > 0 && "mt-6")}>
                <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {item.name}
                </h3>
              </div>
            );
          }

          const isActive = pathname === item.href;
          const Icon = item.icon!;

          return (
            <Link
              key={item.name}
              href={item.href!}
              title={collapsed ? item.name : undefined}
              onClick={() => handleNavigation(item.href!)}
              className={cn(
                "group flex items-center rounded-lg text-sm font-medium transition-colors mb-1 relative",
                collapsed ? "px-3 py-3 justify-center" : "px-3 py-2",
                isActive
                  ? "bg-[#674ea7]/10 text-[#674ea7] border border-[#674ea7]/20"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 flex-shrink-0",
                  collapsed ? "mr-0" : "mr-3",
                  isActive
                    ? "text-[#674ea7]"
                    : "text-gray-400 group-hover:text-gray-600"
                )}
              />
              {!collapsed && (
                <span className="truncate">{item.name}</span>
              )}

              {/* Tooltip for collapsed state */}
              {collapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                  {item.name}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-200">
        {/* User Info */}
        <div className="p-4">
          <div className={cn(
            "flex items-center",
            collapsed ? "justify-center" : "space-x-3"
          )}>
            <div className="h-8 w-8 rounded-full bg-[#674ea7]/10 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-medium text-[#674ea7]">AD</span>
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
                <p className="text-xs text-gray-500 truncate">admin@sarj.ai</p>
              </div>
            )}
            {!collapsed && (
              <ThemeToggle />
            )}
          </div>
          {collapsed && (
            <div className="flex justify-center mt-2">
              <ThemeToggle />
            </div>
          )}
        </div>

        {/* Desktop collapse toggle at bottom */}
        {onToggleCollapse && (
          <div className="border-t border-gray-200 p-2 hidden lg:block">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleCollapse}
              className="w-full flex items-center justify-center h-8 text-gray-500 hover:text-[#674ea7] hover:bg-gray-50"
            >
              {collapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
