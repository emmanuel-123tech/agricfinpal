import { AIFarmingGuide } from "@/components/dashboard/ai-farming-guide"
import { Card } from "@/components/ui/card"
import { Brain } from "lucide-react"

export default function AIFarmingGuidePage() {
  return (
    <div className="flex-1 space-y-6 p-6 md:p-8 pt-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
          <Brain className="h-5 w-5 text-green-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Farming Guide</h1>
          <p className="text-gray-500">Get personalized recommendations for your farm</p>
        </div>
      </div>

      <Card className="overflow-hidden border bg-white p-6 shadow-sm rounded-xl">
        <AIFarmingGuide />
      </Card>
    </div>
  )
}
