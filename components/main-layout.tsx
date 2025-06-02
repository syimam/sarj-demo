"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Sidebar } from "./sidebar";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { LoadingProvider } from "./loading-provider";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <LoadingProvider>
      <div className="flex h-screen bg-gray-50 overflow-hidden w-full">
      {/* Mobile sidebar overlay */}
      <div className={`
        fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden
        transition-opacity duration-300 ease-in-out
        ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `} onClick={() => setSidebarOpen(false)} />

      {/* Sidebar Container */}
      <div className={`
        fixed inset-y-0 left-0 z-50 lg:relative lg:inset-auto
        transition-all duration-300 ease-in-out flex-shrink-0
        ${sidebarCollapsed ? 'lg:w-16' : 'lg:w-64'}
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        w-64
      `}>
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Mobile menu button - only visible on mobile when sidebar is closed */}
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
            className="flex items-center space-x-2 text-gray-700 hover:text-[#674ea7]"
          >
            <Menu className="h-5 w-5" />
            <span className="text-sm font-medium">Menu</span>
          </Button>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
    </LoadingProvider>
  );
}
