import { MultiPlotTracker } from "@/components/dashboard/multi-plot-tracker"
import { Card } from "@/components/ui/card"
import { BarChart4 } from "lucide-react"

export default function PerformancePage() {
  return (
    <div className="flex-1 space-y-6 p-6 md:p-8 pt-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
          <BarChart4 className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Performance Dashboard</h1>
          <p className="text-gray-500">Track and analyze your farm's productivity</p>
        </div>
      </div>

      <Card className="overflow-hidden border bg-white p-6 shadow-sm rounded-xl">
        <MultiPlotTracker />
      </Card>
    </div>
  )
}
