"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ArrowUpRight,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
  Percent,
  ArrowRight,
} from "lucide-react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Area,
  AreaChart,
  RadialBar,
  RadialBarChart,
  Line,
  LineChart,
} from "recharts"

// Mock credit score data
const creditScoreData = {
  currentScore: 680,
  previousScore: 650,
  maxScore: 850,
  scoreHistory: [
    { month: "Jan", score: 620 },
    { month: "Feb", score: 625 },
    { month: "Mar", score: 640 },
    { month: "Apr", score: 650 },
    { month: "May", score: 655 },
    { month: "Jun", score: 665 },
    { month: "Jul", score: 680 },
  ],
  scoreFactors: [
    { factor: "Payment History", impact: "High", status: "Good", score: 75 },
    { factor: "Credit Utilization", impact: "High", status: "Fair", score: 65 },
    { factor: "Credit Age", impact: "Medium", status: "Good", score: 80 },
    { factor: "Credit Mix", impact: "Low", status: "Excellent", score: 90 },
    { factor: "Recent Inquiries", impact: "Low", status: "Good", score: 85 },
  ],
  loanEligibility: [
    { type: "Microfinance Loan", eligible: true, interestRate: "15%", maxAmount: "₦500,000" },
    { type: "Agricultural Loan", eligible: true, interestRate: "12%", maxAmount: "₦2,000,000" },
    { type: "Equipment Financing", eligible: true, interestRate: "14%", maxAmount: "₦1,500,000" },
    { type: "Commercial Loan", eligible: false, interestRate: "18%", maxAmount: "₦5,000,000" },
  ],
  incomeAnalysis: {
    monthly: [
      { month: "Jan", income: 120000, expenses: 80000 },
      { month: "Feb", income: 135000, expenses: 85000 },
      { month: "Mar", income: 125000, expenses: 82000 },
      { month: "Apr", income: 140000, expenses: 88000 },
      { month: "May", income: 150000, expenses: 90000 },
      { month: "Jun", income: 145000, expenses: 87000 },
      { month: "Jul", income: 155000, expenses: 92000 },
    ],
    sources: [
      { source: "Crop Sales", percentage: 65 },
      { source: "Livestock", percentage: 20 },
      { source: "Agro-processing", percentage: 10 },
      { source: "Other", percentage: 5 },
    ],
    stability: {
      score: 75,
      volatility: "Low",
      seasonality: "Moderate",
      trend: "Upward",
      diversification: "Good",
    },
  },
  loanHistory: [
    {
      id: "loan-1",
      type: "Agricultural Loan",
      amount: 1000000,
      dateIssued: "2022-01-15",
      dateDue: "2023-01-15",
      status: "Completed",
      interestRate: 12,
      paymentHistory: [
        { date: "2022-02-15", amount: 88333, status: "Paid" },
        { date: "2022-03-15", amount: 88333, status: "Paid" },
        { date: "2022-04-15", amount: 88333, status: "Paid" },
        { date: "2022-05-15", amount: 88333, status: "Paid" },
        { date: "2022-06-15", amount: 88333, status: "Paid" },
        { date: "2022-07-15", amount: 88333, status: "Paid" },
        { date: "2022-08-15", amount: 88333, status: "Paid" },
        { date: "2022-09-15", amount: 88333, status: "Paid" },
        { date: "2022-10-15", amount: 88333, status: "Paid" },
        { date: "2022-11-15", amount: 88333, status: "Paid" },
        { date: "2022-12-15", amount: 88333, status: "Paid" },
        { date: "2023-01-15", amount: 88333, status: "Paid" },
      ],
    },
    {
      id: "loan-2",
      type: "Equipment Financing",
      amount: 500000,
      dateIssued: "2022-06-10",
      dateDue: "2023-06-10",
      status: "Active",
      interestRate: 14,
      paymentHistory: [
        { date: "2022-07-10", amount: 45833, status: "Paid" },
        { date: "2022-08-10", amount: 45833, status: "Paid" },
        { date: "2022-09-10", amount: 45833, status: "Paid" },
        { date: "2022-10-10", amount: 45833, status: "Paid" },
        { date: "2022-11-10", amount: 45833, status: "Paid" },
        { date: "2022-12-10", amount: 45833, status: "Paid" },
        { date: "2023-01-10", amount: 45833, status: "Paid" },
        { date: "2023-02-10", amount: 45833, status: "Paid" },
        { date: "2023-03-10", amount: 45833, status: "Paid" },
        { date: "2023-04-10", amount: 45833, status: "Paid" },
        { date: "2023-05-10", amount: 45833, status: "Paid" },
        { date: "2023-06-10", amount: 45833, status: "Pending" },
      ],
    },
    {
      id: "loan-3",
      type: "Microfinance Loan",
      amount: 200000,
      dateIssued: "2021-08-05",
      dateDue: "2022-02-05",
      status: "Completed",
      interestRate: 15,
      paymentHistory: [
        { date: "2021-09-05", amount: 34167, status: "Paid" },
        { date: "2021-10-05", amount: 34167, status: "Paid" },
        { date: "2021-11-05", amount: 34167, status: "Late" },
        { date: "2021-12-05", amount: 34167, status: "Paid" },
        { date: "2022-01-05", amount: 34167, status: "Paid" },
        { date: "2022-02-05", amount: 34167, status: "Paid" },
      ],
    },
  ],
  improvementTips: [
    {
      tip: "Reduce credit utilization",
      impact: "High",
      description: "Try to keep your credit utilization below 30% of your available credit.",
      potentialIncrease: 25,
    },
    {
      tip: "Maintain consistent income",
      impact: "Medium",
      description: "Stable income sources improve your creditworthiness.",
      potentialIncrease: 15,
    },
    {
      tip: "Diversify income sources",
      impact: "Medium",
      description: "Multiple income streams reduce risk and improve credit score.",
      potentialIncrease: 20,
    },
    {
      tip: "Build longer credit history",
      impact: "Low",
      description: "Longer credit history demonstrates reliability over time.",
      potentialIncrease: 10,
    },
  ],
  scoreTiers: [
    {
      tier: "Excellent",
      range: "750-850",
      benefits: "Lowest interest rates, highest loan amounts, premium financial products",
    },
    {
      tier: "Good",
      range: "700-749",
      benefits: "Competitive interest rates, good loan options, quality financial products",
    },
    {
      tier: "Fair",
      range: "650-699",
      benefits: "Average interest rates, moderate loan options, standard financial products",
    },
    {
      tier: "Poor",
      range: "600-649",
      benefits: "Higher interest rates, limited loan options, basic financial products",
    },
    {
      tier: "Very Poor",
      range: "300-599",
      benefits: "Highest interest rates, minimal loan options, restricted financial products",
    },
  ],
}

// Helper function to determine score tier
const getScoreTier = (score: number) => {
  if (score >= 750) return "Excellent"
  if (score >= 700) return "Good"
  if (score >= 650) return "Fair"
  if (score >= 600) return "Poor"
  return "Very Poor"
}

// Helper function to determine score color
const getScoreColor = (score: number) => {
  if (score >= 750) return "text-green-500"
  if (score >= 700) return "text-emerald-500"
  if (score >= 650) return "text-blue-500"
  if (score >= 600) return "text-yellow-500"
  return "text-red-500"
}

// Helper function to determine badge color
const getBadgeColor = (status: string) => {
  switch (status) {
    case "Excellent":
      return "bg-green-500"
    case "Good":
      return "bg-emerald-500"
    case "Fair":
      return "bg-blue-500"
    case "Poor":
      return "bg-yellow-500"
    case "Very Poor":
      return "bg-red-500"
    case "Completed":
      return "bg-green-500"
    case "Active":
      return "bg-blue-500"
    case "Paid":
      return "bg-green-500"
    case "Pending":
      return "bg-yellow-500"
    case "Late":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}

const COLORS = ["#28A745", "#007BFF", "#FFC107", "#DC3545", "#6610f2", "#fd7e14", "#20c997", "#6c757d"]

export function EnhancedCreditScore() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedLoan, setSelectedLoan] = useState<string | null>(null)

  const currentTier = getScoreTier(creditScoreData.currentScore)
  const scoreColor = getScoreColor(creditScoreData.currentScore)

  const scoreChange = creditScoreData.currentScore - creditScoreData.previousScore
  const scoreChangePercent = ((scoreChange / creditScoreData.previousScore) * 100).toFixed(1)

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Credit Score Dashboard</h1>
          <p className="text-muted-foreground">Monitor and improve your creditworthiness</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Creditworthiness Engine</CardTitle>
            <CardDescription>Your current credit score and history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center justify-center">
                <div className="relative">
                  <svg className="w-32 h-32">
                    <circle
                      className="text-muted stroke-current"
                      strokeWidth="10"
                      stroke="currentColor"
                      fill="transparent"
                      r="56"
                      cx="64"
                      cy="64"
                    />
                    <circle
                      className={`${scoreColor} stroke-current`}
                      strokeWidth="10"
                      strokeDasharray={2 * Math.PI * 56}
                      strokeDashoffset={
                        2 * Math.PI * 56 * (1 - creditScoreData.currentScore / creditScoreData.maxScore)
                      }
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="56"
                      cx="64"
                      cy="64"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-3xl font-bold ${scoreColor}`}>{creditScoreData.currentScore}</span>
                    <span className="text-xs text-muted-foreground">out of {creditScoreData.maxScore}</span>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <Badge className={getBadgeColor(currentTier)}>{currentTier}</Badge>
                  <div className="mt-2 flex items-center justify-center gap-1 text-sm">
                    {scoreChange > 0 ? (
                      <>
                        <ArrowUpRight className="h-4 w-4 text-green-500" />
                        <span className="text-green-500">
                          +{scoreChange} pts ({scoreChangePercent}%)
                        </span>
                      </>
                    ) : (
                      <>
                        <TrendingDown className="h-4 w-4 text-red-500" />
                        <span className="text-red-500">
                          {scoreChange} pts ({scoreChangePercent}%)
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <h3 className="text-sm font-medium mb-4">Score History</h3>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={creditScoreData.scoreHistory}>
                      <defs>
                        <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#28A745" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#28A745" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[550, 700]} />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="score"
                        stroke="#28A745"
                        fillOpacity={1}
                        fill="url(#scoreGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium mb-4">Score Factors</h3>
              <div className="space-y-4">
                {creditScoreData.scoreFactors.map((factor, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={`
                          ${factor.impact === "High" ? "border-primary text-primary" : "border-secondary text-secondary"}
                        `}
                        >
                          {factor.impact}
                        </Badge>
                        <span className="text-sm">{factor.factor}</span>
                      </div>
                      <Badge className={getBadgeColor(factor.status)}>{factor.status}</Badge>
                    </div>
                    <Progress value={factor.score} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Score Tiers</CardTitle>
            <CardDescription>Understanding credit score ranges</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {creditScoreData.scoreTiers.map((tier, index) => (
                <div
                  key={index}
                  className={`p-3 border rounded-md ${currentTier === tier.tier ? "border-primary bg-primary/5" : ""}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-sm">{tier.tier}</h4>
                    <Badge className={getBadgeColor(tier.tier)}>{tier.range}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{tier.benefits}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Loan Eligibility</TabsTrigger>
          <TabsTrigger value="income">Income Analysis</TabsTrigger>
          <TabsTrigger value="history">Loan History</TabsTrigger>
          <TabsTrigger value="improvement">Score Improvement</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Loan Eligibility</CardTitle>
              <CardDescription>Based on your current credit score of {creditScoreData.currentScore}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {creditScoreData.loanEligibility.map((loan, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-base">{loan.type}</CardTitle>
                        {loan.eligible ? (
                          <Badge className="bg-green-500">Eligible</Badge>
                        ) : (
                          <Badge variant="outline" className="border-red-500 text-red-500">
                            Not Eligible
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Interest Rate:</span>
                          <span className="text-sm font-medium">{loan.interestRate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Maximum Amount:</span>
                          <span className="text-sm font-medium">{loan.maxAmount}</span>
                        </div>
                        {!loan.eligible && (
                          <div className="mt-4 text-xs text-muted-foreground">
                            <AlertCircle className="h-4 w-4 text-yellow-500 inline mr-1" />
                            Improve your credit score to qualify for this loan type.
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" disabled={!loan.eligible}>
                        {loan.eligible ? "Apply Now" : "Not Available"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Lending Insights</CardTitle>
                <CardDescription>Actionable recommendations for borrowing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-md">
                    <h4 className="font-medium text-sm flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-500" />
                      Optimal Loan Amount
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Based on your income and credit profile, your optimal loan amount is between ₦500,000 and
                      ₦1,500,000.
                    </p>
                  </div>

                  <div className="p-3 border rounded-md">
                    <h4 className="font-medium text-sm flex items-center gap-2">
                      <Percent className="h-4 w-4 text-blue-500" />
                      Interest Rate Potential
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      You qualify for interest rates between 12-15%. Improving your score by 20 points could reduce
                      rates by 1-2%.
                    </p>
                  </div>

                  <div className="p-3 border rounded-md">
                    <h4 className="font-medium text-sm flex items-center gap-2">
                      <Clock className="h-4 w-4 text-yellow-500" />
                      Optimal Timing
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Consider applying for loans after your harvest season when your income is highest and most stable.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Loan Comparison</CardTitle>
                <CardDescription>Compare available loan options</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Loan Type</th>
                          <th className="text-center py-2">Interest</th>
                          <th className="text-center py-2">Term</th>
                          <th className="text-right py-2">Monthly</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2">Microfinance</td>
                          <td className="text-center py-2">15%</td>
                          <td className="text-center py-2">6 mo</td>
                          <td className="text-right py-2">₦89,583</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">Agricultural</td>
                          <td className="text-center py-2">12%</td>
                          <td className="text-center py-2">12 mo</td>
                          <td className="text-right py-2">₦88,333</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">Equipment</td>
                          <td className="text-center py-2">14%</td>
                          <td className="text-center py-2">12 mo</td>
                          <td className="text-right py-2">₦45,833</td>
                        </tr>
                        <tr>
                          <td className="py-2 text-muted-foreground">Commercial</td>
                          <td className="text-center py-2 text-muted-foreground">18%</td>
                          <td className="text-center py-2 text-muted-foreground">24 mo</td>
                          <td className="text-right py-2 text-muted-foreground">₦250,000</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="p-3 border rounded-md mt-4">
                    <h4 className="font-medium text-sm">Recommendation</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      The Agricultural Loan offers the best value with lower interest rates and flexible repayment terms
                      aligned with harvest cycles.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="income" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Income Stability Analysis</CardTitle>
                <CardDescription>Monthly income and expense tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={creditScoreData.incomeAnalysis.monthly}>
                      <defs>
                        <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#28A745" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#28A745" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#DC3545" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#DC3545" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`₦${value.toLocaleString()}`, ""]} />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="income"
                        name="Income (₦)"
                        stroke="#28A745"
                        fillOpacity={1}
                        fill="url(#incomeGradient)"
                      />
                      <Area
                        type="monotone"
                        dataKey="expenses"
                        name="Expenses (₦)"
                        stroke="#DC3545"
                        fillOpacity={1}
                        fill="url(#expenseGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 border rounded-md">
                    <h4 className="font-medium text-sm">Income Stability</h4>
                    <div className="mt-2">
                      <Progress value={creditScoreData.incomeAnalysis.stability.score} className="h-2" />
                    </div>
                    <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                      <span>Score: {creditScoreData.incomeAnalysis.stability.score}/100</span>
                      <span>Volatility: {creditScoreData.incomeAnalysis.stability.volatility}</span>
                    </div>
                  </div>

                  <div className="p-3 border rounded-md">
                    <h4 className="font-medium text-sm">Income Trend</h4>
                    <div className="mt-2 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-500" />
                      <span className="text-sm">{creditScoreData.incomeAnalysis.stability.trend}</span>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Your income has shown a consistent upward trend over the past 6 months.
                    </p>
                  </div>

                  <div className="p-3 border rounded-md">
                    <h4 className="font-medium text-sm">Debt-to-Income Ratio</h4>
                    <div className="mt-2 text-2xl font-bold text-blue-500">38%</div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Lenders typically prefer a ratio below 40%. Your ratio is within acceptable limits.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Income Sources</CardTitle>
                <CardDescription>Diversification analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={creditScoreData.incomeAnalysis.sources}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="percentage"
                        nameKey="source"
                        label={({ source, percent }) => `${source} ${(percent * 100).toFixed(0)}%`}
                      >
                        {creditScoreData.incomeAnalysis.sources.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-4">
                  <h4 className="font-medium text-sm mb-2">Diversification Assessment</h4>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-500">{creditScoreData.incomeAnalysis.stability.diversification}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {creditScoreData.incomeAnalysis.stability.diversification === "Good"
                        ? "Your income sources are well diversified, reducing risk."
                        : "Consider diversifying your income sources further."}
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="font-medium text-sm mb-2">Seasonality Impact</h4>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-yellow-500 text-yellow-500">
                      {creditScoreData.incomeAnalysis.stability.seasonality}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      Your income shows moderate seasonal fluctuations.
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Income Enhancement Opportunities</CardTitle>
              <CardDescription>Strategies to improve income stability and diversification</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 border rounded-md">
                  <h4 className="font-medium text-sm">Value-Added Processing</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Processing your raw agricultural products (e.g., cassava into garri) could increase revenue by
                    30-40% and provide income during off-seasons.
                  </p>
                </div>

                <div className="p-3 border rounded-md">
                  <h4 className="font-medium text-sm">Crop Diversification</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Growing crops with different harvest cycles can provide more consistent income throughout the year
                    and reduce risk from crop failures.
                  </p>
                </div>

                <div className="p-3 border rounded-md">
                  <h4 className="font-medium text-sm">Contract Farming</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Entering into contracts with processors or exporters can provide guaranteed income and reduce market
                    price volatility.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Loan History</CardTitle>
                <CardDescription>Your past and current loans</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Loan Type</th>
                        <th className="text-center py-2">Amount</th>
                        <th className="text-center py-2">Interest Rate</th>
                        <th className="text-center py-2">Issue Date</th>
                        <th className="text-center py-2">Due Date</th>
                        <th className="text-center py-2">Status</th>
                        <th className="text-right py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {creditScoreData.loanHistory.map((loan) => (
                        <tr key={loan.id} className="border-b">
                          <td className="py-2">{loan.type}</td>
                          <td className="text-center py-2">₦{loan.amount.toLocaleString()}</td>
                          <td className="text-center py-2">{loan.interestRate}%</td>
                          <td className="text-center py-2">{new Date(loan.dateIssued).toLocaleDateString()}</td>
                          <td className="text-center py-2">{new Date(loan.dateDue).toLocaleDateString()}</td>
                          <td className="text-center py-2">
                            <Badge className={getBadgeColor(loan.status)}>{loan.status}</Badge>
                          </td>
                          <td className="text-right py-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedLoan(selectedLoan === loan.id ? null : loan.id)}
                            >
                              {selectedLoan === loan.id ? "Hide Details" : "View Details"}
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {selectedLoan && (
                  <div className="mt-6 p-4 border rounded-md">
                    <h3 className="text-sm font-medium mb-4">
                      Payment History for {creditScoreData.loanHistory.find((l) => l.id === selectedLoan)?.type}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left py-2">Date</th>
                                <th className="text-center py-2">Amount</th>
                                <th className="text-right py-2">Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {creditScoreData.loanHistory
                                .find((l) => l.id === selectedLoan)
                                ?.paymentHistory.map((payment, index) => (
                                  <tr key={index} className="border-b">
                                    <td className="py-2">{new Date(payment.date).toLocaleDateString()}</td>
                                    <td className="text-center py-2">₦{payment.amount.toLocaleString()}</td>
                                    <td className="text-right py-2">
                                      <Badge className={getBadgeColor(payment.status)}>{payment.status}</Badge>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={creditScoreData.loanHistory
                              .find((l) => l.id === selectedLoan)
                              ?.paymentHistory.map((payment, index) => ({
                                date: new Date(payment.date).toLocaleDateString(),
                                amount: payment.amount,
                                status: payment.status,
                              }))}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip formatter={(value) => [`₦${value.toLocaleString()}`, "Payment Amount"]} />
                            <Bar dataKey="amount" name="Payment Amount" fill="#28A745" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-3 border rounded-md">
                        <h4 className="font-medium text-sm">Loan Details</h4>
                        <div className="mt-2 space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Principal:</span>
                            <span>
                              ₦{creditScoreData.loanHistory.find((l) => l.id === selectedLoan)?.amount.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Interest Rate:</span>
                            <span>{creditScoreData.loanHistory.find((l) => l.id === selectedLoan)?.interestRate}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Term:</span>
                            <span>
                              {creditScoreData.loanHistory.find((l) => l.id === selectedLoan)?.paymentHistory.length}{" "}
                              months
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 border rounded-md">
                        <h4 className="font-medium text-sm">Payment Performance</h4>
                        <div className="mt-2 space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">On-time Payments:</span>
                            <span>
                              {
                                creditScoreData.loanHistory
                                  .find((l) => l.id === selectedLoan)
                                  ?.paymentHistory.filter((p) => p.status === "Paid").length
                              }
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Late Payments:</span>
                            <span>
                              {
                                creditScoreData.loanHistory
                                  .find((l) => l.id === selectedLoan)
                                  ?.paymentHistory.filter((p) => p.status === "Late").length
                              }
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Pending Payments:</span>
                            <span>
                              {
                                creditScoreData.loanHistory
                                  .find((l) => l.id === selectedLoan)
                                  ?.paymentHistory.filter((p) => p.status === "Pending").length
                              }
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 border rounded-md">
                        <h4 className="font-medium text-sm">Impact on Credit Score</h4>
                        <div className="mt-2 space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Payment History:</span>
                            <Badge
                              className={
                                creditScoreData.loanHistory
                                  .find((l) => l.id === selectedLoan)
                                  ?.paymentHistory.some((p) => p.status === "Late")
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                              }
                            >
                              {creditScoreData.loanHistory
                                .find((l) => l.id === selectedLoan)
                                ?.paymentHistory.some((p) => p.status === "Late")
                                ? "Minor Issues"
                                : "Excellent"}
                            </Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Score Impact:</span>
                            <span
                              className={
                                creditScoreData.loanHistory
                                  .find((l) => l.id === selectedLoan)
                                  ?.paymentHistory.some((p) => p.status === "Late")
                                  ? "text-yellow-500"
                                  : "text-green-500"
                              }
                            >
                              {creditScoreData.loanHistory
                                .find((l) => l.id === selectedLoan)
                                ?.paymentHistory.some((p) => p.status === "Late")
                                ? "-5 points"
                                : "+15 points"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Repayment Performance</CardTitle>
                <CardDescription>Analysis of your loan repayment behavior</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart
                      cx="50%"
                      cy="50%"
                      innerRadius="10%"
                      outerRadius="80%"
                      barSize={10}
                      data={[
                        { name: "On-time", value: 95, fill: "#28A745" },
                        { name: "Late", value: 5, fill: "#FFC107" },
                        { name: "Missed", value: 0, fill: "#DC3545" },
                      ]}
                    >
                      <RadialBar label={{ position: "insideStart", fill: "#fff" }} background dataKey="value" />
                      <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
                      <Tooltip />
                    </RadialBarChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-4 space-y-4">
                  <div className="p-3 border rounded-md">
                    <h4 className="font-medium text-sm">Repayment Score</h4>
                    <div className="mt-2 flex items-center gap-2">
                      <Badge className="bg-green-500">Excellent</Badge>
                      <span className="text-xs text-muted-foreground">
                        Your repayment history is excellent with 95% on-time payments.
                      </span>
                    </div>
                  </div>

                  <div className="p-3 border rounded-md">
                    <h4 className="font-medium text-sm">Repayment Insights</h4>
                    <ul className="mt-2 space-y-2 text-xs text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Consistent on-time payments have positively impacted your credit score.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5" />
                        <span>One late payment in November 2021 had a minor negative impact.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Your repayment behavior qualifies you for preferential interest rates.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Loan Utilization Analysis</CardTitle>
                <CardDescription>How effectively you've utilized loans</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-md">
                    <h4 className="font-medium text-sm">Agricultural Loan Impact</h4>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Yield Increase:</span>
                        <span className="font-medium">+18%</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Revenue Growth:</span>
                        <span className="font-medium">+25%</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">ROI:</span>
                        <span className="font-medium text-green-500">210%</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 border rounded-md">
                    <h4 className="font-medium text-sm">Equipment Financing Impact</h4>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Labor Cost Reduction:</span>
                        <span className="font-medium">-30%</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Processing Capacity:</span>
                        <span className="font-medium">+45%</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">ROI:</span>
                        <span className="font-medium text-green-500">175%</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 border rounded-md">
                    <h4 className="font-medium text-sm">Loan Utilization Score</h4>
                    <div className="mt-2">
                      <Progress value={85} className="h-2" />
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Your loan utilization score of 85/100 indicates excellent use of borrowed funds for productive
                      purposes.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="improvement" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Score Improvement Plan</CardTitle>
              <CardDescription>Actionable steps to improve your credit score</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium mb-4">Improvement Opportunities</h3>
                  <div className="space-y-4">
                    {creditScoreData.improvementTips.map((tip, index) => (
                      <div key={index} className="p-3 border rounded-md">
                        <div className="flex justify-between">
                          <h4 className="font-medium text-sm">{tip.tip}</h4>
                          <Badge
                            variant="outline"
                            className={`
                            ${tip.impact === "High" ? "border-primary text-primary" : "border-secondary text-secondary"}
                          `}
                          >
                            {tip.impact}
                          </Badge>
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground">{tip.description}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">Potential Increase:</span>
                          <span className="text-xs font-medium text-green-500">+{tip.potentialIncrease} points</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-4">Score Projection</h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={[
                          { month: "Current", score: creditScoreData.currentScore },
                          { month: "3 Months", score: creditScoreData.currentScore + 20 },
                          { month: "6 Months", score: creditScoreData.currentScore + 40 },
                          { month: "12 Months", score: creditScoreData.currentScore + 70 },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis domain={[creditScoreData.currentScore - 20, creditScoreData.currentScore + 100]} />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="score"
                          stroke="#28A745"
                          strokeWidth={2}
                          dot={{ r: 6 }}
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="mt-4 p-3 border rounded-md">
                    <h4 className="font-medium text-sm">Potential Benefits</h4>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-start gap-2 text-xs">
                        <ArrowRight className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>
                          <span className="font-medium">Lower Interest Rates:</span>
                          <span className="text-muted-foreground">
                            {" "}
                            Improving your score to 750+ could reduce interest rates by 3-5%.
                          </span>
                        </span>
                      </div>
                      <div className="flex items-start gap-2 text-xs">
                        <ArrowRight className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>
                          <span className="font-medium">Higher Loan Limits:</span>
                          <span className="text-muted-foreground">
                            {" "}
                            A score of 720+ could increase your borrowing capacity by up to 50%.
                          </span>
                        </span>
                      </div>
                      <div className="flex items-start gap-2 text-xs">
                        <ArrowRight className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>
                          <span className="font-medium">Better Loan Terms:</span>
                          <span className="text-muted-foreground">
                            {" "}
                            Improved scores may qualify you for longer repayment periods and more flexible terms.
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Short-Term Actions</CardTitle>
                <CardDescription>Steps to take in the next 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-md">
                    <h4 className="font-medium text-sm flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Review Credit Report
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Check your credit report for errors and dispute any inaccuracies.
                    </p>
                  </div>

                  <div className="p-3 border rounded-md">
                    <h4 className="font-medium text-sm flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Pay Down Existing Debt
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Reduce your credit utilization by paying down existing debt.
                    </p>
                  </div>

                  <div className="p-3 border rounded-md">
                    <h4 className="font-medium text-sm flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Set Up Payment Reminders
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Ensure all future payments are made on time by setting up reminders.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Medium-Term Actions</CardTitle>
                <CardDescription>Steps to take in the next 3-6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-md">
                    <h4 className="font-medium text-sm flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                      Diversify Income Sources
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Add at least one additional income stream to improve stability.
                    </p>
                  </div>

                  <div className="p-3 border rounded-md">
                    <h4 className="font-medium text-sm flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                      Build Emergency Savings
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Establish a savings buffer equal to 3 months of loan payments.
                    </p>
                  </div>

                  <div className="p-3 border rounded-md">
                    <h4 className="font-medium text-sm flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                      Maintain Low Credit Utilization
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Keep credit utilization below 30% consistently for 3+ months.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Long-Term Actions</CardTitle>
                <CardDescription>Steps to take in the next 6-12 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-md">
                    <h4 className="font-medium text-sm flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-500" />
                      Establish Credit Mix
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Maintain a healthy mix of different types of credit accounts.
                    </p>
                  </div>

                  <div className="p-3 border rounded-md">
                    <h4 className="font-medium text-sm flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-500" />
                      Maintain Perfect Payment History
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Ensure all payments are made on time for at least 12 consecutive months.
                    </p>
                  </div>

                  <div className="p-3 border rounded-md">
                    <h4 className="font-medium text-sm flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-500" />
                      Increase Income Stability
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Implement strategies to reduce seasonal income fluctuations.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
