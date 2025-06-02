"use client";

import React, { useState, useMemo } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Eye,
  Database,
  Play,
  Volume2,
  Pause,
  X,
  Slash,
} from "lucide-react";
import { LoadingSpinner, TableSkeleton } from "@/components/ui/loading";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StatusBadge } from "./status-badge";
import { DisplayLocalTime } from "./display-local-time";

interface Call {
  id: string;
  createdAt: string;
  userId: string;
  phoneNumber: string;
  scenario: string;
  scenarioData?: any;
  status: string;
  sipStatus?: string;
  totalDuration: number;
  startedAt: string;
  endedAt: string | null;
  direction: "inbound" | "outbound";
  responseBody?: any;
}

interface User {
  id: string;
  email: string;
}

interface EnhancedCallsTableProps {
  calls: Call[];
  usersById: Record<string, User>;
  onCallClick?: (call: Call) => void;
}

type SortField = "createdAt" | "duration" | "status" | "phoneNumber";
type SortDirection = "asc" | "desc";

export function EnhancedCallsTable({ calls, usersById, onCallClick }: EnhancedCallsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [durationFilter, setDurationFilter] = useState("all");
  const [directionFilter, setDirectionFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [scenarioFilter, setScenarioFilter] = useState("all");
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [dataModalOpen, setDataModalOpen] = useState(false);
  const [responseModalOpen, setResponseModalOpen] = useState(false);
  const [audioModalOpen, setAudioModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<any>(null);
  const [selectedCall, setSelectedCall] = useState<any>(null);
  const [isFilterLoading, setIsFilterLoading] = useState(false);

  // Get unique scenarios for filter
  const uniqueScenarios = useMemo(() => {
    return Array.from(new Set(calls.map(call => call.scenario)));
  }, [calls]);

  // Filter and sort calls
  const filteredAndSortedCalls = useMemo(() => {
    let filtered = calls.filter(call => {
      const matchesSearch = searchTerm === "" ||
        call.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        call.phoneNumber.includes(searchTerm) ||
        call.scenario.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (usersById[call.userId]?.email || call.userId).toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDirection = directionFilter === "all" || call.direction === directionFilter;
      const matchesStatus = statusFilter === "all" || call.status === statusFilter;
      const matchesScenario = scenarioFilter === "all" || call.scenario === scenarioFilter;

      // Duration filter
      const matchesDuration = durationFilter === "all" || (() => {
        const duration = call.totalDuration || 0;
        switch (durationFilter) {
          case "short": return duration < 120; // < 2 minutes
          case "medium": return duration >= 120 && duration <= 300; // 2-5 minutes
          case "long": return duration > 300; // > 5 minutes
          default: return true;
        }
      })();

      return matchesSearch && matchesDirection && matchesStatus && matchesScenario && matchesDuration;
    });

    // Sort
    filtered.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortField) {
        case "createdAt":
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
          break;
        case "duration":
          aValue = a.totalDuration || 0;
          bValue = b.totalDuration || 0;
          break;
        case "status":
          aValue = a.status;
          bValue = b.status;
          break;
        case "phoneNumber":
          aValue = a.phoneNumber;
          bValue = b.phoneNumber;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [calls, searchTerm, directionFilter, statusFilter, scenarioFilter, durationFilter, sortField, sortDirection, usersById]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedCalls.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCalls = filteredAndSortedCalls.slice(startIndex, endIndex);

  // Reset to first page when filters change with loading
  React.useEffect(() => {
    setIsFilterLoading(true);
    setCurrentPage(1);

    // Simulate filter processing time
    const timer = setTimeout(() => {
      setIsFilterLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, directionFilter, statusFilter, scenarioFilter, durationFilter]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="h-3 w-3" />;
    return sortDirection === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />;
  };

  const formatDuration = (totalDuration: number) => {
    if (totalDuration !== null && totalDuration !== undefined) {
      return `${Math.floor(totalDuration / 60)}:${(totalDuration % 60).toString().padStart(2, "0")}`;
    }
    return "-";
  };

  return (
    <>
      {/* Calls Table with Integrated Filters */}
      <div className="border-0 shadow-sm bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden">
        {/* Filters */}
        <div className="p-6 border-b border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Search - Always visible, spans 2 columns on larger screens */}
            <div className="sm:col-span-2 lg:col-span-2">
              <label className="text-sm font-medium text-gray-700 mb-2 block">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                {isFilterLoading && searchTerm && (
                  <LoadingSpinner size="sm" className="absolute right-3 top-1/2 transform -translate-y-1/2" />
                )}
                <Input
                  placeholder="Search calls..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-10 border-gray-200 focus:border-[#674ea7] focus:ring-1 focus:ring-[#674ea7]/20 rounded-lg h-10 bg-white"
                />
              </div>
            </div>

            {/* Status Filter - Always visible */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="border-gray-200 rounded-lg h-10 bg-white focus:border-[#674ea7]">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Scenario Filter - Always visible */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Scenario</label>
              <Select value={scenarioFilter} onValueChange={setScenarioFilter}>
                <SelectTrigger className="border-gray-200 rounded-lg h-10 bg-white focus:border-[#674ea7]">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {uniqueScenarios.map(scenario => (
                    <SelectItem key={scenario} value={scenario}>
                      {scenario.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Direction Filter - Hidden on mobile */}
            <div className="hidden lg:block">
              <label className="text-sm font-medium text-gray-700 mb-2 block">Direction</label>
              <Select value={directionFilter} onValueChange={setDirectionFilter}>
                <SelectTrigger className="border-gray-200 rounded-lg h-10 bg-white focus:border-[#674ea7]">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="inbound">Inbound</SelectItem>
                  <SelectItem value="outbound">Outbound</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Duration Filter - Hidden on mobile */}
            <div className="hidden lg:block">
              <label className="text-sm font-medium text-gray-700 mb-2 block">Duration</label>
              <Select value={durationFilter} onValueChange={setDurationFilter}>
                <SelectTrigger className="border-gray-200 rounded-lg h-10 bg-white focus:border-[#674ea7]">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="short">&lt; 2 min</SelectItem>
                  <SelectItem value="medium">2-5 min</SelectItem>
                  <SelectItem value="long">&gt; 5 min</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Proper HTML Table */}
        <div className="overflow-auto">
          <table className="w-full">
            {/* Table Header */}
            <thead className="bg-[#674ea7]/5 sticky top-0 z-10">
              <tr className="border-b border-[#674ea7]/20">
                <th className="text-left py-3 px-4 text-xs font-medium text-[#674ea7] uppercase tracking-wide">
                  Call ID
                </th>
                <th className="hidden sm:table-cell text-left py-3 px-4 text-xs font-medium text-[#674ea7] uppercase tracking-wide">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("createdAt")}
                    className="h-auto p-0 font-medium text-[#674ea7] hover:text-[#674ea7]/80 transition-colors text-xs uppercase tracking-wide"
                  >
                    Created {getSortIcon("createdAt")}
                  </Button>
                </th>
                <th className="hidden md:table-cell text-left py-3 px-4 text-xs font-medium text-[#674ea7] uppercase tracking-wide">
                  Phone
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#674ea7] uppercase tracking-wide">
                  Scenario
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#674ea7] uppercase tracking-wide">
                  Status
                </th>
                <th className="hidden lg:table-cell text-left py-3 px-4 text-xs font-medium text-[#674ea7] uppercase tracking-wide">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("duration")}
                    className="h-auto p-0 font-medium text-[#674ea7] hover:text-[#674ea7]/80 transition-colors text-xs uppercase tracking-wide"
                  >
                    Duration {getSortIcon("duration")}
                  </Button>
                </th>
                <th className="text-center py-3 px-4 text-xs font-medium text-[#674ea7] uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>

              {/* Table Body */}
              <tbody>
                {paginatedCalls.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-12 h-12 bg-[#674ea7]/10 rounded-full flex items-center justify-center mb-3">
                          <Database className="w-6 h-6 text-[#674ea7]" />
                        </div>
                        <h3 className="text-sm font-medium text-gray-900 mb-1">No calls found</h3>
                        <p className="text-xs text-gray-500 max-w-sm">
                          No calls match your current filters.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedCalls.map((call, index) => (
                    <tr
                      key={call.id}
                      className={`hover:bg-[#674ea7]/5 transition-all duration-200 border-b border-gray-100 cursor-pointer group ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                        }`}
                      onClick={() => onCallClick ? onCallClick(call) : window.location.href = `/calls/${call.id}`}
                    >
                      {/* Call ID */}
                      <td className="py-2 px-3">
                        <div className="flex items-center space-x-2">
                          <div className={`p-1 rounded-full ${call.direction === "inbound"
                            ? "bg-[#674ea7]/10"
                            : "bg-emerald-100"
                            }`}>
                            {call.direction === "inbound" ? (
                              <ArrowDownLeft className="w-2.5 h-2.5 text-[#674ea7]" />
                            ) : (
                              <ArrowUpRight className="w-2.5 h-2.5 text-emerald-600" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="font-mono text-xs font-medium text-gray-900 truncate">
                              {call.id.substring(0, 8)}...
                            </div>
                            {/* Show phone on mobile when phone column is hidden */}
                            <div className="md:hidden text-xs text-gray-500 font-mono">
                              {call.phoneNumber}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Created - Hidden on mobile */}
                      <td className="hidden sm:table-cell py-2 px-3">
                        <div className="text-xs text-gray-600">
                          <DisplayLocalTime date={call.createdAt} />
                        </div>
                      </td>

                      {/* Phone - Hidden on small screens */}
                      <td className="hidden md:table-cell py-2 px-3">
                        <div className="text-xs text-gray-700 font-mono">
                          {call.phoneNumber}
                        </div>
                      </td>

                      {/* Scenario */}
                      <td className="py-2 px-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#674ea7]/10 text-[#674ea7]">
                          <span className="hidden sm:inline">{call.scenario.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                          <span className="sm:hidden">{call.scenario.substring(0, 8)}...</span>
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-2 px-3">
                        <StatusBadge status={call.status} />
                      </td>

                      {/* Duration - Hidden on small screens */}
                      <td className="hidden lg:table-cell py-2 px-3">
                        <div className="text-xs font-mono font-semibold text-[#674ea7]">
                          {formatDuration(call.totalDuration)}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-2 px-3">
                        <div className="flex items-center justify-center space-x-1">
                          {/* Show all buttons on larger screens */}
                          <div className="hidden sm:flex items-center space-x-1">
                            {/* Data Button - Always show */}
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`h-6 w-6 p-0 rounded transition-colors ${
                                call.scenarioData && Object.entries(call.scenarioData).length > 0
                                  ? "text-gray-400 hover:text-[#674ea7] hover:bg-[#674ea7]/10"
                                  : "text-gray-300 cursor-not-allowed"
                              }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (call.scenarioData && Object.entries(call.scenarioData).length > 0) {
                                  setSelectedData(call.scenarioData);
                                  setDataModalOpen(true);
                                }
                              }}
                              disabled={!call.scenarioData || Object.entries(call.scenarioData).length === 0}
                            >
                              {call.scenarioData && Object.entries(call.scenarioData).length > 0 ? (
                                <Database className="h-3 w-3" />
                              ) : (
                                <X className="h-3 w-3" />
                              )}
                            </Button>

                            {/* Response Button - Always show */}
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`h-6 w-6 p-0 rounded transition-colors ${
                                call.responseBody && Object.keys(call.responseBody).length > 0
                                  ? "text-gray-400 hover:text-[#674ea7] hover:bg-[#674ea7]/10"
                                  : "text-gray-300 cursor-not-allowed"
                              }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (call.responseBody && Object.keys(call.responseBody).length > 0) {
                                  setSelectedData(call.responseBody);
                                  setResponseModalOpen(true);
                                }
                              }}
                              disabled={!call.responseBody || Object.keys(call.responseBody).length === 0}
                            >
                              {call.responseBody && Object.keys(call.responseBody).length > 0 ? (
                                <Eye className="h-3 w-3" />
                              ) : (
                                <Slash className="h-3 w-3" />
                              )}
                            </Button>

                            {/* Audio Button - Always show */}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 text-gray-400 hover:text-[#674ea7] hover:bg-[#674ea7]/10 rounded transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedCall(call);
                                setAudioModalOpen(true);
                              }}
                            >
                              <Play className="h-3 w-3" />
                            </Button>
                          </div>

                          {/* Show only play button on mobile */}
                          <div className="sm:hidden">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 text-gray-400 hover:text-[#674ea7] hover:bg-[#674ea7]/10 rounded transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedCall(call);
                                setAudioModalOpen(true);
                              }}
                            >
                              <Play className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="border-t border-[#674ea7]/10 p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="text-xs font-medium text-[#674ea7]">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredAndSortedCalls.length)} of {filteredAndSortedCalls.length} calls
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-600">Rows:</span>
                <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
                  <SelectTrigger className="w-16 border-[#674ea7]/20 rounded-lg h-7 text-xs focus:border-[#674ea7] focus:ring-1 focus:ring-[#674ea7]/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center space-x-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="border-[#674ea7]/20 rounded-lg h-7 hover:bg-[#674ea7]/10 disabled:opacity-50 text-xs px-2 text-[#674ea7]"
                >
                  Previous
                </Button>

                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                        className={currentPage === pageNum
                          ? "bg-[#674ea7] hover:bg-[#674ea7]/90 text-white rounded-lg h-7 w-7 text-xs p-0"
                          : "border-[#674ea7]/20 rounded-lg h-7 w-7 hover:bg-[#674ea7]/10 text-xs p-0 text-[#674ea7]"
                        }
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="border-[#674ea7]/20 rounded-lg h-7 hover:bg-[#674ea7]/10 disabled:opacity-50 text-xs px-2 text-[#674ea7]"
                >
                  Next
                </Button>

                <div className="text-xs text-gray-600 ml-2">
                  Page {currentPage} of {totalPages}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <Dialog open={dataModalOpen} onOpenChange={setDataModalOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="text-lg font-medium text-gray-900">Scenario Data</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-6 rounded-xl overflow-auto max-h-96 border border-gray-200 font-mono text-gray-900">
              {selectedData ? JSON.stringify(selectedData, null, 2) : ''}
            </pre>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={responseModalOpen} onOpenChange={setResponseModalOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="text-lg font-medium text-gray-900">Response Data</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-6 rounded-xl overflow-auto max-h-96 border border-gray-200 font-mono text-gray-900">
              {selectedData ? JSON.stringify(selectedData, null, 2) : ''}
            </pre>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={audioModalOpen} onOpenChange={setAudioModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-medium text-gray-900">
              Recording Player - {selectedCall?.id}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center justify-center space-x-4">
                <Button variant="outline" size="sm">
                  <Play className="h-4 w-4 mr-2" />
                  Play Recording
                </Button>
                <Button variant="outline" size="sm">
                  <Pause className="h-4 w-4 mr-2" />
                  Pause
                </Button>
                <div className="flex items-center space-x-2">
                  <Volume2 className="h-4 w-4 text-gray-500" />
                  <div className="w-20 h-2 bg-gray-200 rounded-full">
                    <div className="w-3/4 h-full bg-[#674ea7] rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center text-sm text-gray-600">
                Duration: {selectedCall ? formatDuration(selectedCall.totalDuration) : '0:00'}
              </div>
            </div>
            <div className="text-xs text-gray-500 text-center">
              Audio recording playback functionality would be implemented here
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
