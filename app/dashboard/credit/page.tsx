import { EnhancedCreditScore } from "@/components/dashboard/enhanced-credit-score"
import { Card } from "@/components/ui/card"
import { CreditCard } from "lucide-react"

export default function CreditScorePage() {
  return (
    <div className="flex-1 space-y-6 p-6 md:p-8 pt-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
          <CreditCard className="h-5 w-5 text-amber-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Credit Score Dashboard</h1>
          <p className="text-gray-500">Monitor and improve your financial health</p>
        </div>
      </div>

      <Card className="overflow-hidden border bg-white p-6 shadow-sm rounded-xl">
        <EnhancedCreditScore />
      </Card>
    </div>
  )
}
