"use client"

import type React from "react"

import { useState } from "react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Plus, Filter, ArrowUpRight, ArrowDownRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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

// Sample data for the charts
const productionData = [
  { name: "Jan", Maize: 400, Rice: 240, Cassava: 320 },
  { name: "Feb", Maize: 300, Rice: 280, Cassava: 310 },
  { name: "Mar", Maize: 500, Rice: 300, Cassava: 350 },
  { name: "Apr", Maize: 450, Rice: 320, Cassava: 380 },
  { name: "May", Maize: 600, Rice: 380, Cassava: 410 },
  { name: "Jun", Maize: 550, Rice: 400, Cassava: 430 },
]

const revenueData = [
  { name: "Jan", Farm1: 4000, Farm2: 2400, Farm3: 3200 },
  { name: "Feb", Farm1: 3000, Farm2: 2800, Farm3: 3100 },
  { name: "Mar", Farm1: 5000, Farm2: 3000, Farm3: 3500 },
  { name: "Apr", Farm1: 4500, Farm2: 3200, Farm3: 3800 },
  { name: "May", Farm1: 6000, Farm2: 3800, Farm3: 4100 },
  { name: "Jun", Farm1: 5500, Farm2: 4000, Farm3: 4300 },
]

const soilHealthData = [
  { name: "Nitrogen", value: 65 },
  { name: "Phosphorus", value: 45 },
  { name: "Potassium", value: 70 },
  { name: "pH", value: 85 },
  { name: "Organic Matter", value: 55 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

const expenseData = [
  { name: "Seeds", value: 2500 },
  { name: "Fertilizer", value: 3500 },
  { name: "Labor", value: 4500 },
  { name: "Equipment", value: 2000 },
  { name: "Others", value: 1500 },
]

const farms = [
  {
    id: 1,
    name: "Main Farm",
    location: "Ibadan, Oyo State",
    size: "5 hectares",
    crops: ["Maize", "Cassava", "Vegetables"],
    production: 12500,
    revenue: 3750000,
    trend: "up",
    percentage: 12,
  },
  {
    id: 2,
    name: "River Valley Farm",
    location: "Makurdi, Benue State",
    size: "3 hectares",
    crops: ["Rice", "Soybean"],
    production: 8200,
    revenue: 2460000,
    trend: "up",
    percentage: 8,
  },
  {
    id: 3,
    name: "Highland Plot",
    location: "Jos, Plateau State",
    size: "2 hectares",
    crops: ["Potatoes", "Tomatoes", "Peppers"],
    production: 6800,
    revenue: 2040000,
    trend: "down",
    percentage: 3,
  },
]

const cropProductionData = {
  "farm-1": {
    monthly: [
      { month: "Jan", planted: 100, harvested: 80 },
      { month: "Feb", planted: 120, harvested: 90 },
      { month: "Mar", planted: 150, harvested: 120 },
      { month: "Apr", planted: 130, harvested: 110 },
      { month: "May", planted: 160, harvested: 130 },
      { month: "Jun", planted: 140, harvested: 120 },
      { month: "Jul", planted: 170, harvested: 140 },
      { month: "Aug", planted: 150, harvested: 130 },
      { month: "Sep", planted: 180, harvested: 150 },
      { month: "Oct", planted: 160, harvested: 140 },
      { month: "Nov", planted: 190, harvested: 160 },
      { month: "Dec", planted: 170, harvested: 150 },
    ],
    cropTypes: [
      { name: "Maize", value: 4000 },
      { name: "Rice", value: 3000 },
      { name: "Cassava", value: 2500 },
    ],
    yields: [
      { year: 2020, yield: 3.5 },
      { year: 2021, yield: 3.8 },
      { year: 2022, yield: 4.2 },
      { year: 2023, yield: 4.5 },
    ],
    expenses: [
      { category: "Seeds", value: 1000 },
      { category: "Fertilizer", value: 1500 },
      { category: "Labor", value: 2000 },
    ],
    soilHealth: {
      ph: 6.5,
      nitrogen: 70,
      phosphorus: 50,
      potassium: 80,
      organicMatter: 3.2,
    },
  },
  "farm-2": {
    monthly: [
      { month: "Jan", planted: 90, harvested: 70 },
      { month: "Feb", planted: 110, harvested: 80 },
      { month: "Mar", planted: 140, harvested: 110 },
      { month: "Apr", planted: 120, harvested: 100 },
      { month: "May", planted: 150, harvested: 120 },
      { month: "Jun", planted: 130, harvested: 110 },
      { month: "Jul", planted: 160, harvested: 130 },
      { month: "Aug", planted: 140, harvested: 120 },
      { month: "Sep", planted: 170, harvested: 140 },
      { month: "Oct", planted: 150, harvested: 130 },
      { month: "Nov", planted: 180, harvested: 150 },
      { month: "Dec", planted: 160, harvested: 140 },
    ],
    cropTypes: [
      { name: "Rice", value: 3500 },
      { name: "Soybean", value: 2800 },
    ],
    yields: [
      { year: 2020, yield: 3.2 },
      { year: 2021, yield: 3.5 },
      { year: 2022, yield: 3.9 },
      { year: 2023, yield: 4.2 },
    ],
    expenses: [
      { category: "Seeds", value: 900 },
      { category: "Fertilizer", value: 1400 },
      { category: "Labor", value: 1900 },
    ],
    soilHealth: {
      ph: 6.8,
      nitrogen: 75,
      phosphorus: 55,
      potassium: 85,
      organicMatter: 3.5,
    },
  },
  "farm-3": {
    monthly: [
      { month: "Jan", planted: 80, harvested: 60 },
      { month: "Feb", planted: 100, harvested: 70 },
      { month: "Mar", planted: 130, harvested: 100 },
      { month: "Apr", planted: 110, harvested: 90 },
      { month: "May", planted: 140, harvested: 110 },
      { month: "Jun", planted: 120, harvested: 100 },
      { month: "Jul", planted: 150, harvested: 120 },
      { month: "Aug", planted: 130, harvested: 110 },
      { month: "Sep", planted: 160, harvested: 130 },
      { month: "Oct", planted: 140, harvested: 120 },
      { month: "Nov", planted: 170, harvested: 140 },
      { month: "Dec", planted: 150, harvested: 130 },
    ],
    cropTypes: [
      { name: "Potatoes", value: 3000 },
      { name: "Tomatoes", value: 2500 },
      { name: "Peppers", value: 2000 },
    ],
    yields: [
      { year: 2020, yield: 3.0 },
      { year: 2021, yield: 3.3 },
      { year: 2022, yield: 3.7 },
      { year: 2023, yield: 4.0 },
    ],
    expenses: [
      { category: "Seeds", value: 800 },
      { category: "Fertilizer", value: 1300 },
      { category: "Labor", value: 1800 },
    ],
    soilHealth: {
      ph: 7.0,
      nitrogen: 80,
      phosphorus: 60,
      potassium: 90,
      organicMatter: 3.8,
    },
  },
}

export function MultiPlotTracker() {
  const [showAddFarmDialog, setShowAddFarmDialog] = useState(false)
  const [farmsList, setFarmsList] = useState(farms)
  const [selectedFarm, setSelectedFarm] = useState("all")
  const [revenueTimeframe, setRevenueTimeframe] = useState("monthly")
  const [productionView, setProductionView] = useState("overview")
  const [timeRange, setTimeRange] = useState("year")

  const handleAddFarm = (event: React.FormEvent) => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const newFarm = {
      id: farmsList.length + 1,
      name: formData.get("name") as string,
      location: formData.get("location") as string,
      size: `${formData.get("size")} hectares`,
      crops: (formData.get("crops") as string).split(",").map((crop) => crop.trim()),
      production: Math.floor(Math.random() * 10000) + 5000,
      revenue: Math.floor(Math.random() * 3000000) + 1000000,
      trend: Math.random() > 0.3 ? "up" : "down",
      percentage: Math.floor(Math.random() * 15) + 1,
    }
    setFarmsList([...farmsList, newFarm])
    setShowAddFarmDialog(false)
  }

  // Get data for selected farm or aggregate all farms
  const getSelectedFarmData = () => {
    if (selectedFarm === "all") {
      // Aggregate data from all farms
      const aggregatedMonthly = Array(12)
        .fill(0)
        .map((_, i) => {
          const month = cropProductionData["farm-1"].monthly[i].month
          let planted = 0
          let harvested = 0

          Object.keys(cropProductionData).forEach((farmId) => {
            planted += cropProductionData[farmId as keyof typeof cropProductionData].monthly[i].planted
            harvested += cropProductionData[farmId as keyof typeof cropProductionData].monthly[i].harvested
          })

          return { month, planted, harvested }
        })

      // Aggregate crop types
      const cropTypesMap = new Map()
      Object.keys(cropProductionData).forEach((farmId) => {
        cropProductionData[farmId as keyof typeof cropProductionData].cropTypes.forEach((crop) => {
          if (cropTypesMap.has(crop.name)) {
            cropTypesMap.set(crop.name, cropTypesMap.get(crop.name) + crop.value)
          } else {
            cropTypesMap.set(crop.name, crop.value)
          }
        })
      })

      const aggregatedCropTypes = Array.from(cropTypesMap.entries()).map(([name, value]) => ({ name, value }))

      // Aggregate yields
      const yieldsMap = new Map()
      Object.keys(cropProductionData).forEach((farmId) => {
        cropProductionData[farmId as keyof typeof cropProductionData].yields.forEach((yearData) => {
          if (yieldsMap.has(yearData.year)) {
            yieldsMap.set(yearData.year, yieldsMap.get(yearData.year) + yearData.yield)
          } else {
            yieldsMap.set(yearData.year, yearData.yield)
          }
        })
      })

      const aggregatedYields = Array.from(yieldsMap.entries())
        .map(([year, yield_]) => ({ year, yield: yield_ }))
        .sort((a, b) => a.year - b.year)

      // Aggregate expenses
      const expensesMap = new Map()
      Object.keys(cropProductionData).forEach((farmId) => {
        cropProductionData[farmId as keyof typeof cropProductionData].expenses.forEach((expense) => {
          if (expensesMap.has(expense.category)) {
            expensesMap.set(expense.category, expensesMap.get(expense.category) + expense.value)
          } else {
            expensesMap.set(expense.category, expense.value)
          }
        })
      })

      const aggregatedExpenses = Array.from(expensesMap.entries()).map(([category, value]) => ({ category, value }))

      // Average soil health
      const soilHealth = {
        ph: 0,
        nitrogen: 0,
        phosphorus: 0,
        potassium: 0,
        organicMatter: 0,
      }

      const farmCount = Object.keys(cropProductionData).length
      Object.keys(cropProductionData).forEach((farmId) => {
        const farm = cropProductionData[farmId as keyof typeof cropProductionData]
        soilHealth.ph += farm.soilHealth.ph
        soilHealth.nitrogen += farm.soilHealth.nitrogen
        soilHealth.phosphorus += farm.soilHealth.phosphorus
        soilHealth.potassium += farm.soilHealth.potassium
        soilHealth.organicMatter += farm.soilHealth.organicMatter
      })

      soilHealth.ph /= farmCount
      soilHealth.nitrogen /= farmCount
      soilHealth.phosphorus /= farmCount
      soilHealth.potassium /= farmCount
      soilHealth.organicMatter /= farmCount

      return {
        monthly: aggregatedMonthly,
        cropTypes: aggregatedCropTypes,
        yields: aggregatedYields,
        expenses: aggregatedExpenses,
        soilHealth,
      }
    }

    return cropProductionData[selectedFarm as keyof typeof cropProductionData]
  }

  const selectedFarmData = getSelectedFarmData()

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Multi-Plot Performance Tracker</h2>
          <p className="text-gray-500">Monitor and analyze production across all your farmlands</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Dialog open={showAddFarmDialog} onOpenChange={setShowAddFarmDialog}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Farm
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={handleAddFarm}>
                <DialogHeader>
                  <DialogTitle>Add New Farm</DialogTitle>
                  <DialogDescription>
                    Enter the details of your new farm to start tracking its performance.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Farm Name</Label>
                    <Input id="name" name="name" placeholder="Enter farm name" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" name="location" placeholder="City, State" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="size">Size (hectares)</Label>
                    <Input id="size" name="size" type="number" min="0.1" step="0.1" placeholder="Farm size" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="crops">Crops (comma separated)</Label>
                    <Input id="crops" name="crops" placeholder="Maize, Rice, Cassava" required />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Add Farm</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {farmsList.map((farm) => (
          <Card key={farm.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">{farm.name}</CardTitle>
              <CardDescription>{farm.location}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Production</p>
                  <p className="text-xl font-bold">{farm.production.toLocaleString()} kg</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Revenue</p>
                  <p className="text-xl font-bold">₦{(farm.revenue / 1000).toLocaleString()}k</p>
                </div>
                <div className="flex items-center gap-1">
                  {farm.trend === "up" ? (
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-500" />
                  )}
                  <span className={farm.trend === "up" ? "text-green-500" : "text-red-500"}>{farm.percentage}%</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <div className="flex flex-wrap gap-1">
                {farm.crops.map((crop) => (
                  <span
                    key={crop}
                    className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-gray-700"
                  >
                    {crop}
                  </span>
                ))}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="production">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="production">Production</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="soil">Soil Health</TabsTrigger>
        </TabsList>
        <TabsContent value="production" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Crop Production by Month</CardTitle>
              <CardDescription>Track your crop yields across different farms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={productionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Maize" fill="#8884d8" />
                    <Bar dataKey="Rice" fill="#82ca9d" />
                    <Bar dataKey="Cassava" fill="#ffc658" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="revenue" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue by Farm</CardTitle>
              <CardDescription>Monthly revenue comparison across farms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Farm1" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="Farm2" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="Farm3" stroke="#ffc658" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="expenses" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Expense Breakdown</CardTitle>
              <CardDescription>Distribution of farming expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={expenseData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {expenseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="soil" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Soil Health Indicators</CardTitle>
              <CardDescription>Key soil health parameters across your farms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={soilHealthData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Bar dataKey="value" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
