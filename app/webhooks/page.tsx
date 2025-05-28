import React from "react";
import { Webhook, Plus, Search } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Webhooks() {
  return (
    <div className="h-full w-full">
      <div className="flex flex-col h-full p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Webhooks</h1>
            <p className="text-slate-600">Configure webhook endpoints for real-time integrations.</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Webhook
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input placeholder="Search webhooks..." className="pl-10" />
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Webhook className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">Webhook Management</h3>
            <p className="text-slate-600 max-w-md">
              Webhook configuration interface will be displayed here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
