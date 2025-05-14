"use client"
import Link from "next/link"
import { TrendingUp, FileText, AlertCircle, CheckCircle, XCircle, DollarSign, Calendar, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Line,
  LineChart,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Mock data for the lender dashboard
const dashboardData = {
  stats: {
    totalLoans: 42,
    activeLoans: 28,
    pendingApplications: 15,
    totalDisbursed: 12500000, // in Naira
    totalRepaid: 8750000, // in Naira
    defaultRate: 3.2, // percentage
  },
  loanApplications: [
    { month: "Jan", count: 8 },
    { month: "Feb", count: 12 },
    { month: "Mar", count: 10 },
    { month: "Apr", count: 15 },
    { month: "May", count: 18 },
    { month: "Jun", count: 14 },
    { month: "Jul", count: 15 },
  ],
  disbursements: [
    { month: "Jan", amount: 1200000 },
    { month: "Feb", amount: 1500000 },
    { month: "Mar", amount: 1350000 },
    { month: "Apr", amount: 1800000 },
    { month: "May", amount: 2100000 },
    { month: "Jun", amount: 1950000 },
    { month: "Jul", amount: 2600000 },
  ],
  repayments: [
    { month: "Jan", expected: 950000, actual: 920000 },
    { month: "Feb", expected: 1100000, actual: 1050000 },
    { month: "Mar", expected: 1250000, actual: 1200000 },
    { month: "Apr", expected: 1300000, actual: 1250000 },
    { month: "May", expected: 1400000, actual: 1350000 },
    { month: "Jun", expected: 1500000, actual: 1430000 },
    { month: "Jul", expected: 1550000, actual: 1500000 },
  ],
  loansByPurpose: [
    { name: "Farm Equipment", value: 35 },
    { name: "Seeds & Inputs", value: 25 },
    { name: "Land Acquisition", value: 15 },
    { name: "Irrigation", value: 10 },
    { name: "Storage Facilities", value: 10 },
    { name: "Other", value: 5 },
  ],
  recentApplications: [
    {
      id: "LA-2023-001",
      farmerName: "Ibrahim Oladele",
      amount: 500000,
      purpose: "Farm Equipment",
      date: "2023-07-15",
      status: "Pending",
    },
    {
      id: "LA-2023-002",
      farmerName: "Amina Yusuf",
      amount: 350000,
      purpose: "Seeds & Inputs",
      date: "2023-07-14",
      status: "Pending",
    },
    {
      id: "LA-2023-003",
      farmerName: "Chidi Okonkwo",
      amount: 750000,
      purpose: "Irrigation System",
      date: "2023-07-12",
      status: "Pending",
    },
    {
      id: "LA-2023-004",
      farmerName: "Fatima Bello",
      amount: 250000,
      purpose: "Seeds & Inputs",
      date: "2023-07-10",
      status: "Approved",
    },
    {
      id: "LA-2023-005",
      farmerName: "David Adeyemi",
      amount: 600000,
      purpose: "Storage Facility",
      date: "2023-07-08",
      status: "Rejected",
    },
  ],
  upcomingRepayments: [
    {
      id: "LN-2023-012",
      farmerName: "Grace Okafor",
      amount: 120000,
      dueDate: "2023-07-25",
      status: "Upcoming",
    },
    {
      id: "LN-2023-008",
      farmerName: "Mohammed Ibrahim",
      amount: 85000,
      dueDate: "2023-07-28",
      status: "Upcoming",
    },
    {
      id: "LN-2023-015",
      farmerName: "Blessing Adebayo",
      amount: 150000,
      dueDate: "2023-07-30",
      status: "Upcoming",
    },
  ],
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"]

export default function LenderDashboardPage() {
  return (
    <div className="flex-1 space-y-6 p-6 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lender Dashboard</h1>
          <p className="text-muted-foreground">Overview of your lending activities and performance</p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <FileText className="mr-2 h-4 w-4" />
            Create Loan Product
          </Button>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Loans</p>
                <h3 className="text-2xl font-bold">{dashboardData.stats.totalLoans}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Loans</p>
                <h3 className="text-2xl font-bold">{dashboardData.stats.activeLoans}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                <AlertCircle className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Applications</p>
                <h3 className="text-2xl font-bold">{dashboardData.stats.pendingApplications}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                <DollarSign className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Disbursed</p>
                <h3 className="text-2xl font-bold">₦{(dashboardData.stats.totalDisbursed / 1000000).toFixed(1)}M</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-100">
                <TrendingUp className="h-5 w-5 text-cyan-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Repaid</p>
                <h3 className="text-2xl font-bold">₦{(dashboardData.stats.totalRepaid / 1000000).toFixed(1)}M</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Default Rate</p>
                <h3 className="text-2xl font-bold">{dashboardData.stats.defaultRate}%</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Loan Applications</CardTitle>
            <CardDescription>Monthly loan application trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dashboardData.loanApplications}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Disbursements</CardTitle>
            <CardDescription>Monthly loan disbursement amounts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dashboardData.disbursements}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₦${(value / 1000000).toFixed(2)}M`, "Amount"]} />
                  <Bar dataKey="amount" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Repayment Performance</CardTitle>
            <CardDescription>Expected vs. actual repayments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dashboardData.repayments}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`₦${(value / 1000000).toFixed(2)}M`, ""]} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="expected"
                    name="Expected Repayment"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    name="Actual Repayment"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Loans by Purpose</CardTitle>
            <CardDescription>Distribution of loans by purpose</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dashboardData.loansByPurpose}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {dashboardData.loansByPurpose.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Applications and Upcoming Repayments */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Loan Applications</CardTitle>
              <CardDescription>Latest applications requiring review</CardDescription>
            </div>
            <Link href="/lender/loan-applications">
              <Button variant="outline" size="sm">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.recentApplications.map((application) => (
                <div key={application.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div className="space-y-1">
                    <p className="font-medium">{application.farmerName}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{application.id}</span>
                      <span>•</span>
                      <span>₦{application.amount.toLocaleString()}</span>
                      <span>•</span>
                      <span>{application.purpose}</span>
                    </div>
                  </div>
                  <Badge
                    className={
                      application.status === "Approved"
                        ? "bg-green-500"
                        : application.status === "Rejected"
                          ? "bg-red-500"
                          : "bg-amber-500"
                    }
                  >
                    {application.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Upcoming Repayments</CardTitle>
              <CardDescription>Repayments due in the next 7 days</CardDescription>
            </div>
            <Link href="/lender/repayments">
              <Button variant="outline" size="sm">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.upcomingRepayments.map((repayment) => (
                <div key={repayment.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div className="space-y-1">
                    <p className="font-medium">{repayment.farmerName}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{repayment.id}</span>
                      <span>•</span>
                      <span>₦{repayment.amount.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Due {new Date(repayment.dueDate).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
