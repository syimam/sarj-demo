import Link from "next/link";
import { ArrowLeft, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CallNotFound() {
  return (
    <div className="h-full w-full flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-slate-100 rounded-full w-fit">
            <Phone className="h-8 w-8 text-slate-400" />
          </div>
          <CardTitle className="text-xl font-semibold text-slate-900">Call Not Found</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-slate-600">
            The call you're looking for doesn't exist or may have been removed.
          </p>
          <div className="space-y-2">
            <Button asChild className="w-full">
              <Link href="/calls">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Calls
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/">
                Go to Dashboard
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
