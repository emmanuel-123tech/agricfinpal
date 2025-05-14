"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  AlertCircle,
  ArrowRight,
  BarChart4,
  Calendar,
  CheckCircle,
  Download,
  FileText,
  Info,
  Leaf,
  LineChart,
  PieChart,
  Sprout,
  TrendingUp,
  Users,
} from "lucide-react"

// Mock data for investment opportunities
const investmentData = {
  featuredOpportunities: [
    {
      id: "INV-2023-001",
      title: "Cassava Processing Plant Expansion",
      description:
        "Fund the expansion of a cassava processing facility in Oyo State to increase production capacity by 50%.",
      amountRequired: 5000000,
      amountRaised: 3250000,
      returnRate: "18% per annum",
      term: "24 months",
      riskLevel: "Medium",
      category: "Agro-processing",
      location: "Oyo State",
      deadline: "2023-08-30",
      minInvestment: 50000,
      investors: 42,
      status: "Active",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: "INV-2023-002",
      title: "Greenhouse Tomato Farm",
      description:
        "Invest in a modern greenhouse tomato farm in Kaduna State with drip irrigation and climate control systems.",
      amountRequired: 3500000,
      amountRaised: 2800000,
      returnRate: "16% per annum",
      term: "18 months",
      riskLevel: "Low",
      category: "Crop Production",
      location: "Kaduna State",
      deadline: "2023-08-15",
      minInvestment: 25000,
      investors: 65,
      status: "Active",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: "INV-2023-003",
      title: "Poultry Farm Expansion",
      description:
        "Support the expansion of a poultry farm in Enugu State to increase capacity from 5,000 to 15,000 birds.",
      amountRequired: 2500000,
      amountRaised: 1750000,
      returnRate: "20% per annum",
      term: "12 months",
      riskLevel: "Medium",
      category: "Livestock",
      location: "Enugu State",
      deadline: "2023-09-10",
      minInvestment: 20000,
      investors: 38,
      status: "Active",
      image: "/placeholder.svg?height=200&width=400",
    },
  ],
  myInvestments: [
    {
      id: "INV-2022-015",
      title: "Rice Processing Facility",
      amountInvested: 100000,
      returnRate: "17% per annum",
      startDate: "2022-11-15",
      endDate: "2023-11-15",
      status: "Active",
      returnsEarned: 9917,
      nextPayoutDate: "2023-08-15",
      nextPayoutAmount: 1417,
    },
    {
      id: "INV-2022-008",
      title: "Maize Farm Collective",
      amountInvested: 50000,
      returnRate: "15% per annum",
      startDate: "2022-08-10",
      endDate: "2023-02-10",
      status: "Completed",
      returnsEarned: 3750,
      nextPayoutDate: null,
      nextPayoutAmount: null,
    },
  ],
  categories: [
    { name: "Crop Production", count: 15 },
    { name: "Livestock", count: 8 },
    { name: "Agro-processing", count: 12 },
    { name: "Farm Equipment", count: 5 },
    { name: "Storage Facilities", count: 7 },
    { name: "Irrigation Projects", count: 4 },
  ],
}

export function InvestmentPlatform() {
  const [activeTab, setActiveTab] = useState("opportunities")
  const [selectedInvestment, setSelectedInvestment] = useState<any>(null)
  const [investmentAmount, setInvestmentAmount] = useState("")
  const [isInvestmentDialogOpen, setIsInvestmentDialogOpen] = useState(false)
  const [isInvestmentSuccess, setIsInvestmentSuccess] = useState(false)

  const handleInvest = () => {
    // In a real app, this would process the investment
    setIsInvestmentSuccess(true)
    setTimeout(() => {
      setIsInvestmentDialogOpen(false)
      setIsInvestmentSuccess(false)
    }, 2000)
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Investment Platform</h1>
          <p className="text-muted-foreground">Discover and invest in agricultural projects</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="opportunities">Investment Opportunities</TabsTrigger>
          <TabsTrigger value="my-investments">My Investments</TabsTrigger>
          <TabsTrigger value="insights">Market Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="opportunities" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {investmentData.featuredOpportunities.map((opportunity) => (
              <Card key={opportunity.id} className="overflow-hidden">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={opportunity.image || "/placeholder.svg"}
                    alt={opportunity.title}
                    className="h-full w-full object-cover transition-all hover:scale-105"
                  />
                </div>
                <CardHeader className="p-4">
                  <div className="flex justify-between items-start">
                    <Badge className="bg-green-500">{opportunity.category}</Badge>
                    <Badge variant="outline" className="border-amber-500 text-amber-500">
                      {opportunity.riskLevel} Risk
                    </Badge>
                  </div>
                  <CardTitle className="text-lg mt-2">{opportunity.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{opportunity.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0 space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Funding Progress</span>
                      <span>{Math.round((opportunity.amountRaised / opportunity.amountRequired) * 100)}%</span>
                    </div>
                    <Progress value={(opportunity.amountRaised / opportunity.amountRequired) * 100} className="h-2" />
                    <div className="flex justify-between text-xs mt-1">
                      <span>₦{opportunity.amountRaised.toLocaleString()}</span>
                      <span>₦{opportunity.amountRequired.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Return Rate</p>
                      <p className="font-medium">{opportunity.returnRate}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Term</p>
                      <p className="font-medium">{opportunity.term}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Min. Investment</p>
                      <p className="font-medium">₦{opportunity.minInvestment.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Investors</p>
                      <p className="font-medium">{opportunity.investors}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>Closing: {new Date(opportunity.deadline).toLocaleDateString()}</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Dialog
                    open={isInvestmentDialogOpen && selectedInvestment?.id === opportunity.id}
                    onOpenChange={(open) => {
                      setIsInvestmentDialogOpen(open)
                      if (open) setSelectedInvestment(opportunity)
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button className="w-full">Invest Now</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Invest in {opportunity.title}</DialogTitle>
                        <DialogDescription>Enter the amount you would like to invest</DialogDescription>
                      </DialogHeader>
                      {isInvestmentSuccess ? (
                        <div className="py-6 flex flex-col items-center justify-center">
                          <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                            <CheckCircle className="h-8 w-8 text-green-600" />
                          </div>
                          <h3 className="text-xl font-bold text-center">Investment Successful!</h3>
                          <p className="text-center text-muted-foreground mt-2">
                            Your investment of ₦{Number.parseInt(investmentAmount).toLocaleString()} has been processed
                            successfully.
                          </p>
                        </div>
                      ) : (
                        <>
                          <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                              <Label htmlFor="investment-amount">Investment Amount (₦)</Label>
                              <Input
                                id="investment-amount"
                                type="number"
                                min={opportunity.minInvestment}
                                step={1000}
                                placeholder={opportunity.minInvestment.toString()}
                                value={investmentAmount}
                                onChange={(e) => setInvestmentAmount(e.target.value)}
                              />
                              <p className="text-xs text-muted-foreground">
                                Minimum investment: ₦{opportunity.minInvestment.toLocaleString()}
                              </p>
                            </div>

                            <div className="bg-blue-50 p-3 rounded-md">
                              <h4 className="font-medium text-blue-800 flex items-center gap-2">
                                <Info className="h-4 w-4 text-blue-600" />
                                Investment Summary
                              </h4>
                              <div className="mt-2 space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-blue-700">Project:</span>
                                  <span className="font-medium text-blue-800">{opportunity.title}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-blue-700">Return Rate:</span>
                                  <span className="font-medium text-blue-800">{opportunity.returnRate}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-blue-700">Term:</span>
                                  <span className="font-medium text-blue-800">{opportunity.term}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-blue-700">Expected Return:</span>
                                  <span className="font-medium text-blue-800">
                                    {investmentAmount
                                      ? `₦${(
                                          Number.parseInt(investmentAmount) *
                                            (Number.parseInt(opportunity.returnRate) / 100)
                                        ).toLocaleString()}`
                                      : "-"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsInvestmentDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button
                              onClick={handleInvest}
                              disabled={
                                !investmentAmount || Number.parseInt(investmentAmount) < opportunity.minInvestment
                              }
                            >
                              Confirm Investment
                            </Button>
                          </DialogFooter>
                        </>
                      )}
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Investment Categories</CardTitle>
                <CardDescription>Browse investment opportunities by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {investmentData.categories.map((category) => (
                    <Button
                      key={category.name}
                      variant="outline"
                      className="h-auto flex-col items-start gap-1 p-4 justify-start"
                    >
                      <div className="font-medium">{category.name}</div>
                      <div className="text-xs text-muted-foreground">{category.count} projects</div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Why Invest?</CardTitle>
                <CardDescription>Benefits of agricultural investments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">High Returns</h3>
                      <p className="text-sm text-muted-foreground">
                        Earn competitive returns of 15-25% per annum on agricultural investments.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100">
                      <Sprout className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Impact Investing</h3>
                      <p className="text-sm text-muted-foreground">
                        Support local farmers and contribute to food security in Nigeria.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-100">
                      <PieChart className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Portfolio Diversification</h3>
                      <p className="text-sm text-muted-foreground">
                        Diversify your investment portfolio with agricultural assets.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="my-investments" className="space-y-6">
          {investmentData.myInvestments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {investmentData.myInvestments.map((investment) => (
                <Card key={investment.id}>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-blue-500" />
                          {investment.title}
                        </CardTitle>
                        <CardDescription>Investment {investment.id}</CardDescription>
                      </div>
                      <Badge
                        className={`mt-2 md:mt-0 ${
                          investment.status === "Active" ? "bg-green-500" : "bg-gray-500"
                        } self-start md:self-center`}
                      >
                        {investment.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Amount Invested</h3>
                          <p className="text-2xl font-bold">₦{investment.amountInvested.toLocaleString()}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Return Rate</h3>
                          <p className="text-base">{investment.returnRate}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Investment Period</h3>
                          <p className="text-base">
                            {new Date(investment.startDate).toLocaleDateString()} -{" "}
                            {new Date(investment.endDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Returns Earned</h3>
                          <p className="text-2xl font-bold text-green-600">
                            ₦{investment.returnsEarned.toLocaleString()}
                          </p>
                        </div>

                        {investment.status === "Active" && (
                          <div className="p-4 border rounded-lg bg-blue-50">
                            <h3 className="font-medium flex items-center gap-2 text-blue-800">
                              <Calendar className="h-4 w-4 text-blue-600" />
                              Next Payout
                            </h3>
                            <p className="mt-1 text-lg font-bold text-blue-800">
                              ₦{investment.nextPayoutAmount?.toLocaleString()}
                            </p>
                            <p className="text-sm text-blue-700">
                              Due on {new Date(investment.nextPayoutDate).toLocaleDateString()}
                            </p>
                          </div>
                        )}

                        {investment.status === "Completed" && (
                          <div className="p-4 border rounded-lg bg-green-50">
                            <h3 className="font-medium flex items-center gap-2 text-green-800">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              Investment Completed
                            </h3>
                            <p className="mt-1 text-sm text-green-700">
                              This investment has been successfully completed with all returns paid.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col sm:flex-row gap-2">
                    <Button variant="outline" className="w-full sm:w-auto">
                      <FileText className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                    <Button variant="outline" className="w-full sm:w-auto">
                      <Download className="mr-2 h-4 w-4" />
                      Download Statement
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No Investments Yet</CardTitle>
                <CardDescription>You haven't made any investments yet</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Sprout className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-center">Start Your Investment Journey</h3>
                <p className="text-center text-muted-foreground mt-2 max-w-md">
                  Explore our investment opportunities and start growing your wealth while supporting agricultural
                  development.
                </p>
                <Button className="mt-6" onClick={() => setActiveTab("opportunities")}>
                  Browse Opportunities
                </Button>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Investment Performance</CardTitle>
              <CardDescription>Overview of your investment returns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Total Invested</h3>
                  <p className="text-2xl font-bold">
                    ₦
                    {investmentData.myInvestments
                      .reduce((total, investment) => total + investment.amountInvested, 0)
                      .toLocaleString()}
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Total Returns</h3>
                  <p className="text-2xl font-bold text-green-600">
                    ₦
                    {investmentData.myInvestments
                      .reduce((total, investment) => total + investment.returnsEarned, 0)
                      .toLocaleString()}
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Average Return Rate</h3>
                  <p className="text-2xl font-bold text-blue-600">
                    {Math.round(
                      investmentData.myInvestments.reduce(
                        (total, investment) => total + Number.parseInt(investment.returnRate.split("%")[0]),
                        0,
                      ) / investmentData.myInvestments.length,
                    )}
                    % p.a.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Agricultural Investment Insights</CardTitle>
              <CardDescription>Market trends and investment opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <BarChart4 className="h-5 w-5 text-blue-500" />
                      Top Performing Sectors
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Greenhouse Farming</span>
                          <span className="font-medium">24% ROI</span>
                        </div>
                        <Progress value={24} max={30} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Cassava Processing</span>
                          <span className="font-medium">22% ROI</span>
                        </div>
                        <Progress value={22} max={30} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Poultry Farming</span>
                          <span className="font-medium">20% ROI</span>
                        </div>
                        <Progress value={20} max={30} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Rice Production</span>
                          <span className="font-medium">18% ROI</span>
                        </div>
                        <Progress value={18} max={30} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Fish Farming</span>
                          <span className="font-medium">17% ROI</span>
                        </div>
                        <Progress value={17} max={30} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <LineChart className="h-5 w-5 text-green-500" />
                      Investment Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100">
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Sustainable Agriculture</h3>
                          <p className="text-sm text-muted-foreground">
                            Growing interest in eco-friendly farming practices with 35% increase in investments.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100">
                          <Leaf className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Value Chain Integration</h3>
                          <p className="text-sm text-muted-foreground">
                            Projects combining production and processing seeing 28% higher returns.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-100">
                          <Users className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Cooperative Investments</h3>
                          <p className="text-sm text-muted-foreground">
                            Farmer cooperatives attracting 40% more funding with lower default rates.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-amber-500" />
                      Risk Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 border rounded-md">
                        <h3 className="font-medium">Diversification</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Spread investments across different agricultural sectors and regions to minimize risk.
                        </p>
                      </div>
                      <div className="p-3 border rounded-md">
                        <h3 className="font-medium">Due Diligence</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          All projects undergo rigorous vetting including farm visits, financial analysis, and
                          background checks.
                        </p>
                      </div>
                      <div className="p-3 border rounded-md">
                        <h3 className="font-medium">Insurance Coverage</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Projects include agricultural insurance to protect against weather events and other risks.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Market Reports</CardTitle>
              <CardDescription>Latest agricultural market insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-blue-500">Report</Badge>
                    <span className="text-xs text-muted-foreground">July 2023</span>
                  </div>
                  <h3 className="text-lg font-medium">Nigerian Agricultural Sector Outlook 2023</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Comprehensive analysis of agricultural investment opportunities, market trends, and growth
                    projections for key crops and livestock in Nigeria.
                  </p>
                  <Button variant="outline" className="mt-4">
                    <Download className="mr-2 h-4 w-4" />
                    Download Report
                  </Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-green-500">Analysis</Badge>
                    <span className="text-xs text-muted-foreground">June 2023</span>
                  </div>
                  <h3 className="text-lg font-medium">Impact of Climate Change on Agricultural Investments</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Analysis of how climate change is affecting agricultural investments in Nigeria and strategies for
                    climate-resilient farming.
                  </p>
                  <Button variant="outline" className="mt-4">
                    <Download className="mr-2 h-4 w-4" />
                    Download Analysis
                  </Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-purple-500">Case Study</Badge>
                    <span className="text-xs text-muted-foreground">May 2023</span>
                  </div>
                  <h3 className="text-lg font-medium">Success Story: Cassava Processing Investment Returns</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Case study of a cassava processing investment that yielded 22% returns for investors while creating
                    jobs and improving farmer incomes.
                  </p>
                  <Button variant="outline" className="mt-4">
                    <Download className="mr-2 h-4 w-4" />
                    Download Case Study
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
