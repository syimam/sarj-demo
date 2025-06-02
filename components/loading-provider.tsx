"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { PageLoading } from "@/components/ui/loading";

interface LoadingContextType {
  isPageLoading: boolean;
  setPageLoading: (loading: boolean) => void;
  startPageTransition: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}

interface LoadingProviderProps {
  children: React.ReactNode;
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [isPageLoading, setIsPageLoading] = useState(false);
  const pathname = usePathname();

  const setPageLoading = (loading: boolean) => {
    setIsPageLoading(loading);
  };

  const startPageTransition = () => {
    setIsPageLoading(true);
    // Auto-hide after 2 seconds as fallback
    setTimeout(() => {
      setIsPageLoading(false);
    }, 2000);
  };

  // Handle route changes
  useEffect(() => {
    setIsPageLoading(false);
  }, [pathname]);

  return (
    <LoadingContext.Provider value={{ isPageLoading, setPageLoading, startPageTransition }}>
      {children}
      {isPageLoading && (
        <div className="fixed inset-0 z-[100] bg-white">
          <PageLoading loadingText="Loading page..." />
        </div>
      )}
    </LoadingContext.Provider>
  );
}
