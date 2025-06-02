"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function LoadingSpinner({ size = "md", className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6", 
    lg: "h-8 w-8",
    xl: "h-12 w-12"
  };

  return (
    <Loader2 
      className={cn(
        "animate-spin text-[#674ea7]", 
        sizeClasses[size], 
        className
      )} 
    />
  );
}

interface LoadingOverlayProps {
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
  loadingText?: string;
}

export function LoadingOverlay({ 
  isLoading, 
  children, 
  className,
  loadingText = "Loading..." 
}: LoadingOverlayProps) {
  return (
    <div className={cn("relative", className)}>
      {children}
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="flex flex-col items-center space-y-3">
            <LoadingSpinner size="lg" />
            <p className="text-sm text-gray-600 font-medium">{loadingText}</p>
          </div>
        </div>
      )}
    </div>
  );
}

interface PageLoadingProps {
  loadingText?: string;
}

export function PageLoading({ loadingText = "Loading page..." }: PageLoadingProps) {
  return (
    <div className="h-full w-full flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-[#674ea7] border-t-transparent rounded-full animate-spin"></div>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{loadingText}</h3>
          <p className="text-sm text-gray-500">Please wait while we load your content</p>
        </div>
      </div>
    </div>
  );
}

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div 
      className={cn(
        "animate-pulse rounded-md bg-gray-200", 
        className
      )} 
    />
  );
}

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

export function TableSkeleton({ rows = 5, columns = 6 }: TableSkeletonProps) {
  return (
    <div className="border-0 shadow-sm bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden">
      {/* Header Skeleton */}
      <div className="bg-[#674ea7]/5 p-4 border-b border-[#674ea7]/20">
        <div className="grid grid-cols-6 gap-4">
          {Array.from({ length: columns }, (_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      </div>
      
      {/* Rows Skeleton */}
      <div className="divide-y divide-gray-100">
        {Array.from({ length: rows }, (_, i) => (
          <div key={i} className="p-4">
            <div className="grid grid-cols-6 gap-4 items-center">
              {Array.from({ length: columns }, (_, j) => (
                <Skeleton 
                  key={j} 
                  className={cn(
                    "h-4",
                    j === 0 ? "w-24" : j === columns - 1 ? "w-16" : "w-full"
                  )} 
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface CardSkeletonProps {
  className?: string;
}

export function CardSkeleton({ className }: CardSkeletonProps) {
  return (
    <div className={cn("border-0 shadow-sm bg-white/80 backdrop-blur-sm rounded-xl p-6", className)}>
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
    </div>
  );
}

interface DrawerSkeletonProps {
  isOpen: boolean;
}

export function DrawerSkeleton({ isOpen }: DrawerSkeletonProps) {
  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 z-40' : 'opacity-0 pointer-events-none -z-10'
        }`}
      />

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-5xl bg-white shadow-2xl transform transition-transform duration-500 ease-out ${
        isOpen ? 'translate-x-0 z-50' : 'translate-x-full z-50'
      }`}>
        {/* Drawer Handle */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-1 h-20 bg-[#674ea7] rounded-l-full"></div>
        
        {/* Header Skeleton */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
          <Skeleton className="h-8 w-8 rounded" />
        </div>

        {/* Audio Section Skeleton */}
        <div className="bg-gradient-to-r from-[#674ea7]/5 to-[#674ea7]/10 border-b border-gray-100 p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Skeleton className="h-8 w-8 rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
              <div className="flex space-x-2">
                <Skeleton className="h-8 w-8 rounded" />
                <Skeleton className="h-8 w-8 rounded" />
              </div>
            </div>
            
            {/* Waveform Skeleton */}
            <Skeleton className="h-16 w-full rounded-lg" />
            
            {/* Progress Skeleton */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <Skeleton className="h-3 w-8" />
                <Skeleton className="h-3 w-8" />
              </div>
              <Skeleton className="h-1 w-full rounded-full" />
            </div>
            
            {/* Controls Skeleton */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Skeleton className="h-8 w-8 rounded" />
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-8 w-8 rounded" />
              </div>
              <div className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-1 w-20 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Skeleton */}
        <div className="border-b border-gray-100">
          <div className="grid grid-cols-4 h-12">
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="flex items-center justify-center">
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }, (_, i) => (
              <CardSkeleton key={i} className="p-4" />
            ))}
          </div>
          <CardSkeleton className="h-32" />
        </div>
      </div>
    </>
  );
}
