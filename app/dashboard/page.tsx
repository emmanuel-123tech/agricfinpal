import { AIFarmingGuide } from "@/components/dashboard/ai-farming-guide"
import { EnhancedCreditScore } from "@/components/dashboard/enhanced-credit-score"
import { MultiPlotTracker } from "@/components/dashboard/multi-plot-tracker"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, BarChart4, CreditCard } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-6 p-6 md:p-8 pt-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Welcome to AgricFinPal</h1>
        <p className="text-gray-500">Your intelligent farming assistant dashboard</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="overflow-hidden border-0 bg-gradient-to-br from-green-50 to-emerald-50 shadow-md">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                <Brain className="h-4 w-4 text-green-600" />
              </div>
              <CardTitle className="text-lg font-medium">AI Farming Guide</CardTitle>
            </div>
            <CardDescription>Get personalized farming recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-2 w-full rounded-full bg-green-100">
              <div className="h-2 w-3/4 rounded-full bg-gradient-to-r from-green-500 to-emerald-400"></div>
            </div>
            <div className="mt-2 text-xs text-gray-500">75% of recommendations applied</div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-0 bg-gradient-to-br from-blue-50 to-cyan-50 shadow-md">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                <BarChart4 className="h-4 w-4 text-blue-600" />
              </div>
              <CardTitle className="text-lg font-medium">Performance Tracking</CardTitle>
            </div>
            <CardDescription>Monitor your farm's productivity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-2 w-full rounded-full bg-blue-100">
              <div className="h-2 w-4/5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"></div>
            </div>
            <div className="mt-2 text-xs text-gray-500">20% increase in yield this season</div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-0 bg-gradient-to-br from-amber-50 to-yellow-50 shadow-md">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100">
                <CreditCard className="h-4 w-4 text-amber-600" />
              </div>
              <CardTitle className="text-lg font-medium">Credit Score</CardTitle>
            </div>
            <CardDescription>Track your financial health</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-2 w-full rounded-full bg-amber-100">
              <div className="h-2 w-2/3 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400"></div>
            </div>
            <div className="mt-2 text-xs text-gray-500">680 points - Good standing</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="ai" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-gray-100 rounded-lg">
          <TabsTrigger
            value="ai"
            className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-green-600 data-[state=active]:shadow-sm rounded-md py-2"
          >
            <Brain className="h-4 w-4" />
            <span>AI Farming Guide</span>
          </TabsTrigger>
          <TabsTrigger
            value="performance"
            className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm rounded-md py-2"
          >
            <BarChart4 className="h-4 w-4" />
            <span>Performance Dashboard</span>
          </TabsTrigger>
          <TabsTrigger
            value="credit"
            className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-amber-600 data-[state=active]:shadow-sm rounded-md py-2"
          >
            <CreditCard className="h-4 w-4" />
            <span>Credit Score</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="ai" className="space-y-4 rounded-xl border bg-white p-6 shadow-sm">
          <AIFarmingGuide />
        </TabsContent>
        <TabsContent value="performance" className="space-y-4 rounded-xl border bg-white p-6 shadow-sm">
          <MultiPlotTracker />
        </TabsContent>
        <TabsContent value="credit" className="space-y-4 rounded-xl border bg-white p-6 shadow-sm">
          <EnhancedCreditScore />
        </TabsContent>
      </Tabs>
    </div>
  )
}
