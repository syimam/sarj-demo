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
} from "lucide-react";

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
import { ScenarioBadge } from "./scenario-badge";
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
}

type SortField = "createdAt" | "duration" | "status" | "phoneNumber";
type SortDirection = "asc" | "desc";

export function EnhancedCallsTable({ calls, usersById }: EnhancedCallsTableProps) {
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

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
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
    <div className="flex flex-col h-full overflow-hidden">
      {/* Recent Calls Title and Filters */}
      <div className="flex-shrink-0 mb-4">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-4">
          {/* Title */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Recent Calls</h2>
          </div>

          {/* Filters */}
          <div className="flex gap-3 items-end">
            {/* Search */}
            <div className="w-80">
              <label className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-1 block">Search</label>
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 h-3 w-3" />
                <Input
                  placeholder="Search calls..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-7 border-slate-300 dark:border-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-100 rounded h-8 text-xs bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            {/* Direction Filter */}
            <div className="w-28">
              <label className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-1 block">Direction</label>
              <Select value={directionFilter} onValueChange={setDirectionFilter}>
                <SelectTrigger className="border-slate-300 dark:border-slate-600 rounded h-8 bg-white dark:bg-slate-700 text-xs">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="inbound">Inbound</SelectItem>
                  <SelectItem value="outbound">Outbound</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status Filter */}
            <div className="w-32">
              <label className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-1 block">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="border-slate-300 dark:border-slate-600 rounded h-8 bg-white dark:bg-slate-700 text-xs">
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

            {/* Scenario Filter */}
            <div className="w-36">
              <label className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-1 block">Scenario</label>
              <Select value={scenarioFilter} onValueChange={setScenarioFilter}>
                <SelectTrigger className="border-slate-300 dark:border-slate-600 rounded h-8 bg-white dark:bg-slate-700 text-xs">
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

            {/* Duration Filter */}
            <div className="w-28">
              <label className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-1 block">Duration</label>
              <Select value={durationFilter} onValueChange={setDurationFilter}>
                <SelectTrigger className="border-slate-300 dark:border-slate-600 rounded h-8 bg-white dark:bg-slate-700 text-xs">
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
      </div>

      {/* Table Card */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col h-full overflow-hidden">

          {/* Proper HTML Table */}
          <div className="flex-1 overflow-auto">
            <table className="w-full">
              {/* Table Header */}
              <thead className="bg-slate-50 dark:bg-slate-800 sticky top-0 z-10">
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left py-3 px-4 text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wide w-32">
                    Call ID
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wide w-44">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("createdAt")}
                      className="h-auto p-0 font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors text-xs uppercase tracking-wide"
                    >
                      Created {getSortIcon("createdAt")}
                    </Button>
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wide w-32">
                    Creator
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wide w-40">
                    Phone Number
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wide w-40">
                    Scenario
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wide w-40">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wide w-20">
                    SIP
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wide w-20">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("duration")}
                      className="h-auto p-0 font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors text-xs uppercase tracking-wide"
                    >
                      Duration {getSortIcon("duration")}
                    </Button>
                  </th>
                  <th className="text-center py-3 px-4 text-xs font-medium text-slate-600 dark:text-slate-400 uppercase">
                    Data
                  </th>
                  <th className="text-center py-3 px-4 text-xs font-medium text-slate-600 dark:text-slate-400 uppercase">
                    Response
                  </th>
                  <th className="text-center py-3 px-4 text-xs font-medium text-slate-600 dark:text-slate-400 uppercase">
                    Audio
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {paginatedCalls.length === 0 ? (
                  <tr>
                    <td colSpan={11} className="text-center py-16">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4">
                          <Database className="w-8 h-8 text-slate-400 dark:text-slate-500" />
                        </div>
                        <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">No calls found</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
                          No calls match your current filters. Try adjusting your search criteria or filters to see more results.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedCalls.map((call, index) => (
                    <tr
                      key={call.id}
                      className={`hover:bg-blue-50/70 dark:hover:bg-slate-700/50 transition-all duration-200 border-b border-slate-100 dark:border-slate-700 cursor-pointer group ${index % 2 === 0 ? 'bg-white dark:bg-slate-800' : 'bg-slate-50/50 dark:bg-slate-800/50'
                        }`}
                      onClick={() => window.location.href = `/calls/${call.id}`}
                    >
                      {/* Call ID */}
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <div className={`p-1 rounded ${call.direction === "inbound"
                            ? "bg-blue-100 dark:bg-blue-900/30"
                            : "bg-emerald-100 dark:bg-emerald-900/30"
                            }`}>
                            {call.direction === "inbound" ? (
                              <ArrowDownLeft className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                            ) : (
                              <ArrowUpRight className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="font-mono text-xs font-medium text-slate-900 dark:text-slate-100 truncate">
                              {call.id.substring(0, 8)}...
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 capitalize">
                              {call.direction}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Created */}
                      <td className="py-3 px-4">
                        <div className="text-xs font-normal text-slate-700 dark:text-slate-300">
                          <DisplayLocalTime date={call.createdAt} />
                        </div>
                      </td>

                      {/* Creator */}
                      <td className="py-3 px-4">
                        <div className="text-xs font-medium text-slate-900 dark:text-slate-100 truncate">
                          {usersById[call.userId]?.email?.split('@')[0] ?? call.userId}
                        </div>
                      </td>

                      {/* Phone */}
                      <td className="py-3 px-4">
                        <div className="text-xs font-normal text-slate-700 dark:text-slate-300">
                          {call.phoneNumber}
                        </div>
                      </td>

                      {/* Scenario */}
                      <td className="py-3 px-4">
                        <ScenarioBadge scenario={call.scenario} />
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4">
                        <StatusBadge status={call.status} />
                      </td>

                      {/* SIP Status */}
                      <td className="py-3 px-4">
                        {call.sipStatus ? (
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${call.sipStatus === "completed"
                              ? "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400"
                              : call.sipStatus === "active"
                                ? "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400"
                                : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                            }`}>
                            {call.sipStatus?.replace(/_/g, " ")}
                          </span>
                        ) : (
                          <span className="text-slate-400 dark:text-slate-500 text-xs">-</span>
                        )}
                      </td>

                      {/* Duration */}
                      <td className="py-3 px-4">
                        <div className="text-xs  text-center font-mono font-bold text-slate-900 dark:text-slate-100">
                          {formatDuration(call.totalDuration)}
                        </div>
                      </td>

                      {/* Data */}
                      <td className="py-3 px-2 text-center">
                        {call.scenarioData && Object.entries(call.scenarioData).length > 0 ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 text-slate-500 hover:text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedData(call.scenarioData);
                              setDataModalOpen(true);
                            }}
                          >
                            <Database className="h-3 w-3" />
                          </Button>
                        ) : (
                          <span className="text-slate-300 dark:text-slate-600 text-xs">-</span>
                        )}
                      </td>

                      {/* Response */}
                      <td className="py-3 px-2 text-center">
                        {call.responseBody && Object.keys(call.responseBody).length > 0 ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 text-slate-500 hover:text-green-600 hover:bg-green-100 dark:hover:bg-green-900/50 rounded transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedData(call.responseBody);
                              setResponseModalOpen(true);
                            }}
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                        ) : (
                          <span className="text-slate-300 dark:text-slate-600 text-xs">-</span>
                        )}
                      </td>

                      {/* Audio */}
                      <td className="py-3 px-2 text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-slate-500 hover:text-purple-600 hover:bg-purple-100 dark:hover:bg-purple-900/50 rounded transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCall(call);
                            setAudioModalOpen(true);
                          }}
                        >
                          <Play className="h-3 w-3" />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination Footer */}
      <div className="flex-shrink-0 mt-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm gap-3">
          <div className="flex items-center gap-3">
            <div className="text-xs text-slate-600 dark:text-slate-400 font-medium">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredAndSortedCalls.length)} of {filteredAndSortedCalls.length} calls
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">Rows:</span>
              <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
                <SelectTrigger className="w-20 border-slate-300 dark:border-slate-600 rounded h-7 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="!top-auto !bottom-full !mb-1">
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
                className="border-slate-300 dark:border-slate-600 rounded h-7 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 text-xs px-2"
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
                        ? "bg-blue-600 hover:bg-blue-700 text-white rounded h-7 w-7 text-xs p-0"
                        : "border-slate-300 dark:border-slate-600 rounded h-7 w-7 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs p-0"
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
                className="border-slate-300 dark:border-slate-600 rounded h-7 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 text-xs px-2"
              >
                Next
              </Button>

              <div className="text-xs text-slate-600 dark:text-slate-400 font-medium ml-2">
                Page {currentPage} of {totalPages}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <Dialog open={dataModalOpen} onOpenChange={setDataModalOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] dark:bg-slate-800">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">Scenario Data</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <pre className="whitespace-pre-wrap text-sm bg-slate-50 dark:bg-slate-700 p-6 rounded-xl overflow-auto max-h-96 border border-slate-200 dark:border-slate-600 font-mono text-slate-900 dark:text-slate-100">
              {selectedData ? JSON.stringify(selectedData, null, 2) : ''}
            </pre>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={responseModalOpen} onOpenChange={setResponseModalOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] dark:bg-slate-800">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">Response Data</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <pre className="whitespace-pre-wrap text-sm bg-slate-50 dark:bg-slate-700 p-6 rounded-xl overflow-auto max-h-96 border border-slate-200 dark:border-slate-600 font-mono text-slate-900 dark:text-slate-100">
              {selectedData ? JSON.stringify(selectedData, null, 2) : ''}
            </pre>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={audioModalOpen} onOpenChange={setAudioModalOpen}>
        <DialogContent className="max-w-2xl dark:bg-slate-800">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Recording Player - {selectedCall?.id}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <div className="bg-slate-50 dark:bg-slate-700 p-6 rounded-lg">
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
                  <Volume2 className="h-4 w-4 text-slate-500" />
                  <div className="w-20 h-2 bg-slate-200 dark:bg-slate-600 rounded-full">
                    <div className="w-3/4 h-full bg-blue-500 rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center text-sm text-slate-600 dark:text-slate-400">
                Duration: {selectedCall ? formatDuration(selectedCall.totalDuration) : '0:00'}
              </div>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 text-center">
              Audio recording playback functionality would be implemented here
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
