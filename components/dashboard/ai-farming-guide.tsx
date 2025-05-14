"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format } from "date-fns"
import {
  CalendarIcon,
  Droplets,
  Leaf,
  Thermometer,
  AlertTriangle,
  Check,
  MapPin,
  Upload,
  Camera,
  Loader2,
  Wind,
  Sun,
  CloudRain,
} from "lucide-react"

// Mock AI prediction function - in a real app, this would call an AI service
const getAIPredictions = (cropType: string, location: string) => {
  // Simulate API call delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const predictions = {
        weather: {
          rainfall: {
            prediction: location === "Ibadan" ? "60% chance in next 7 days" : "30% chance in next 10 days",
            dates: location === "Ibadan" ? "May 15-18" : "May 20-25",
            recommendation: "Consider delaying fertilizer application until after rainfall",
            trend: [45, 55, 60, 65, 70, 65, 60, 55, 50, 45, 40, 35],
            forecast: [
              { day: "Mon", chance: 20, amount: "0-2mm" },
              { day: "Tue", chance: 30, amount: "0-2mm" },
              { day: "Wed", chance: 45, amount: "2-5mm" },
              { day: "Thu", chance: 70, amount: "5-10mm" },
              { day: "Fri", chance: 80, amount: "10-15mm" },
              { day: "Sat", chance: 60, amount: "5-10mm" },
              { day: "Sun", chance: 40, amount: "0-2mm" },
            ],
          },
          temperature: {
            current: location === "Ibadan" ? "28-32°C" : "30-35°C",
            forecast: "Rising temperatures expected next week",
            trend: [26, 27, 29, 31, 32, 33, 32, 30, 29, 28, 27, 26],
            daily: [
              { day: "Mon", min: 24, max: 32 },
              { day: "Tue", min: 25, max: 33 },
              { day: "Wed", min: 26, max: 34 },
              { day: "Thu", min: 25, max: 33 },
              { day: "Fri", min: 24, max: 31 },
              { day: "Sat", min: 23, max: 30 },
              { day: "Sun", min: 24, max: 31 },
            ],
          },
          sunlight: {
            hours: "8-10 hrs/day",
            intensity: "High",
            forecast: [9, 9.5, 10, 8, 7, 9, 10],
          },
          wind: {
            speed: "5-10 km/h",
            direction: "Southwest",
            forecast: [7, 8, 12, 15, 10, 8, 6],
          },
          humidity: {
            average: "65%",
            trend: [60, 62, 65, 70, 75, 70, 65],
          },
        },
        disease: {
          risk: cropType === "cassava" ? "High" : cropType === "rice" ? "Medium" : "Low",
          potentialDiseases:
            cropType === "cassava"
              ? ["Cassava Mosaic Disease", "Cassava Bacterial Blight"]
              : cropType === "rice"
                ? ["Rice Blast", "Bacterial Leaf Blight"]
                : ["Anthracnose", "Cercospora Leaf Spot"],
          recommendation:
            cropType === "cassava"
              ? "Apply fungicide within 7 days"
              : cropType === "rice"
                ? "Monitor closely and prepare preventive measures"
                : "Regular inspection recommended",
          earlySignsImages: [
            "/placeholder.svg?height=100&width=100",
            "/placeholder.svg?height=100&width=100",
            "/placeholder.svg?height=100&width=100",
          ],
          preventiveMeasures: [
            "Crop rotation with non-host plants",
            "Use of disease-resistant varieties",
            "Proper field sanitation",
            "Balanced fertilization",
            "Optimal plant spacing",
          ],
          treatmentOptions: {
            organic: ["Neem oil spray (5ml/L water)", "Garlic extract spray", "Trichoderma application"],
            chemical: ["Mancozeb (2.5g/L water)", "Copper oxychloride (3g/L water)", "Carbendazim (1ml/L water)"],
          },
        },
        growthStage: {
          current: "Vegetative Stage",
          daysPlanted: 75,
          daysToHarvest: 105,
          progress: 40,
          nextStage: "Reproductive Stage",
          daysToNextStage: 15,
          criticalPeriod: true,
          stageDetails: {
            description: "Plant is focusing on leaf and stem development",
            waterNeeds: "Medium to High",
            nutrientNeeds: "High nitrogen requirement",
            commonIssues: "Leaf miners, nitrogen deficiency",
          },
        },
        farmingCalendar: {
          plantingWindow: cropType === "cassava" ? "June 1-15" : cropType === "rice" ? "May 15-30" : "April 1-15",
          harvestWindow: cropType === "cassava" ? "October 1-15" : cropType === "rice" ? "August 15-30" : "July 1-15",
          keyActivities: [
            {
              date: "2023-05-20",
              activity: "Apply fertilizer",
              completed: false,
              priority: "High",
              details: "Apply NPK 15-15-15 at 250kg/ha",
            },
            {
              date: "2023-06-05",
              activity: "Weeding",
              completed: false,
              priority: "Medium",
              details: "Manual or chemical weeding depending on weed pressure",
            },
            {
              date: "2023-06-25",
              activity: "Pest control",
              completed: false,
              priority: "High",
              details: "Scout for pests and apply appropriate pesticides if threshold is reached",
            },
            {
              date: "2023-07-15",
              activity: "Second fertilizer application",
              completed: false,
              priority: "Medium",
              details: "Apply Urea at 100kg/ha",
            },
            {
              date: "2023-08-01",
              activity: "Disease monitoring",
              completed: false,
              priority: "High",
              details: "Check for disease symptoms, especially on new growth",
            },
            {
              date: "2023-08-20",
              activity: "Irrigation check",
              completed: false,
              priority: "Medium",
              details: "Ensure adequate soil moisture during grain filling stage",
            },
            {
              date: "2023-09-10",
              activity: "Pre-harvest preparation",
              completed: false,
              priority: "Medium",
              details: "Prepare storage facilities and equipment",
            },
          ],
          seasonalOverview: [
            { month: "January", activities: ["Land preparation", "Soil testing"] },
            { month: "February", activities: ["Seedbed preparation", "Input procurement"] },
            { month: "March", activities: ["Early planting", "Irrigation setup"] },
            { month: "April", activities: ["Main season planting", "Fertilizer application"] },
            { month: "May", activities: ["Weeding", "Pest monitoring"] },
            { month: "June", activities: ["Disease control", "Second fertilizer application"] },
            { month: "July", activities: ["Irrigation management", "Pest control"] },
            { month: "August", activities: ["Early harvest", "Post-harvest handling"] },
            { month: "September", activities: ["Main harvest", "Storage"] },
            { month: "October", activities: ["Marketing", "Land preparation for next season"] },
            { month: "November", activities: ["Soil amendments", "Cover cropping"] },
            { month: "December", activities: ["Equipment maintenance", "Season planning"] },
          ],
        },
        yield: {
          estimated: cropType === "cassava" ? "12.5 tons/ha" : cropType === "rice" ? "4.8 tons/ha" : "2.3 tons/ha",
          regional: cropType === "cassava" ? "10.2 tons/ha" : cropType === "rice" ? "4.2 tons/ha" : "2.0 tons/ha",
          previous: cropType === "cassava" ? "11.8 tons/ha" : cropType === "rice" ? "4.5 tons/ha" : "2.1 tons/ha",
          potential: cropType === "cassava" ? "14.0 tons/ha" : cropType === "rice" ? "5.5 tons/ha" : "2.8 tons/ha",
          factors: [
            { factor: "Rainfall adequacy", impact: "High", status: "Favorable" },
            { factor: "Temperature range", impact: "Medium", status: "Optimal" },
            { factor: "Soil fertility", impact: "High", status: "Good" },
            { factor: "Pest pressure", impact: "Medium", status: "Low" },
            { factor: "Disease incidence", impact: "High", status: "Moderate" },
          ],
          historicalTrend: [
            { year: "2020", yield: cropType === "cassava" ? 10.5 : cropType === "rice" ? 3.8 : 1.9 },
            { year: "2021", yield: cropType === "cassava" ? 11.2 : cropType === "rice" ? 4.1 : 2.0 },
            { year: "2022", yield: cropType === "cassava" ? 11.8 : cropType === "rice" ? 4.5 : 2.1 },
            { year: "2023 (est.)", yield: cropType === "cassava" ? 12.5 : cropType === "rice" ? 4.8 : 2.3 },
          ],
        },
      }
      resolve(predictions)
    }, 1000)
  })
}

export function AIFarmingGuide() {
  const [activeCrop, setActiveCrop] = useState("cassava")
  const [activeLocation, setActiveLocation] = useState("Ibadan")
  const [completedTasks, setCompletedTasks] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [predictions, setPredictions] = useState<any>(null)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [activeTab, setActiveTab] = useState("climate")
  const [isAnalyzingImage, setIsAnalyzingImage] = useState(false)
  const [diagnosisResult, setDiagnosisResult] = useState<any>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const fetchPredictions = async () => {
      setIsLoading(true)
      try {
        const data = await getAIPredictions(activeCrop, activeLocation)
        setPredictions(data)
      } catch (error) {
        console.error("Error fetching AI predictions:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPredictions()
  }, [activeCrop, activeLocation])

  const handleTaskComplete = (taskId: string) => {
    if (completedTasks.includes(taskId)) {
      setCompletedTasks(completedTasks.filter((id) => id !== taskId))
    } else {
      setCompletedTasks([...completedTasks, taskId])
    }
  }

  const handleImageUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsAnalyzingImage(true)

    // Simulate AI analysis
    setTimeout(() => {
      setDiagnosisResult({
        disease:
          activeCrop === "cassava" ? "Cassava Mosaic Disease" : activeCrop === "rice" ? "Rice Blast" : "Anthracnose",
        confidence: 92,
        severity: "Moderate",
        affectedArea: "15% of leaf surface",
        recommendation: "Apply recommended fungicide within 3 days",
        organicTreatment: "Neem oil spray (5ml/L water)",
        chemicalTreatment: "Mancozeb (2.5g/L water)",
      })
      setIsAnalyzingImage(false)
    }, 2000)
  }

  if (isLoading || !predictions) {
    return (
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">AI Farming Guide</h1>
            <p className="text-muted-foreground">Loading AI predictions...</p>
          </div>
          <div className="flex gap-2">
            <Select value={activeCrop} onValueChange={setActiveCrop} disabled>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select crop" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cassava">Cassava</SelectItem>
                <SelectItem value="rice">Rice</SelectItem>
                <SelectItem value="beans">Beans</SelectItem>
                <SelectItem value="maize">Maize</SelectItem>
              </SelectContent>
            </Select>
            <Select value={activeLocation} onValueChange={setActiveLocation} disabled>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ibadan">Ibadan, Oyo</SelectItem>
                <SelectItem value="Lagos">Lagos</SelectItem>
                <SelectItem value="Kano">Kano</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="h-[200px]">
              <CardHeader className="pb-2 animate-pulse">
                <div className="h-6 bg-muted rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </CardHeader>
              <CardContent className="animate-pulse">
                <div className="h-4 bg-muted rounded w-full mb-2"></div>
                <div className="h-4 bg-muted rounded w-5/6 mb-2"></div>
                <div className="h-4 bg-muted rounded w-4/6"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Farming Guide</h1>
          <p className="text-muted-foreground">Personalized recommendations for optimal farming practices</p>
        </div>
        <div className="flex gap-2">
          <Select value={activeCrop} onValueChange={setActiveCrop}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select crop" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cassava">Cassava</SelectItem>
              <SelectItem value="rice">Rice</SelectItem>
              <SelectItem value="beans">Beans</SelectItem>
              <SelectItem value="maize">Maize</SelectItem>
            </SelectContent>
          </Select>
          <Select value={activeLocation} onValueChange={setActiveLocation}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Ibadan">Ibadan, Oyo</SelectItem>
              <SelectItem value="Lagos">Lagos</SelectItem>
              <SelectItem value="Kano">Kano</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="md:col-span-3">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{activeCrop.charAt(0).toUpperCase() + activeCrop.slice(1)} Farming Guide</CardTitle>
            <div className="flex items-center gap-2">
              <Badge className="bg-primary">Current Crop</Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {activeLocation}
              </Badge>
            </div>
          </div>
          <CardDescription>
            AI-powered recommendations for {activeCrop} cultivation in {activeLocation}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="climate">Climate Forecasting</TabsTrigger>
              <TabsTrigger value="disease">Disease Diagnosis</TabsTrigger>
              <TabsTrigger value="calendar">Farming Calendar</TabsTrigger>
              <TabsTrigger value="growth">Growth Tracking</TabsTrigger>
            </TabsList>

            <TabsContent value="climate" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <CloudRain className="h-5 w-5 text-blue-500" />
                      <CardTitle className="text-base">Rainfall Forecast</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">7-Day Prediction:</span>
                        <span className="text-sm font-medium">{predictions.weather.rainfall.prediction}</span>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Daily Forecast:</p>
                        <div className="grid grid-cols-7 gap-1 text-xs">
                          {predictions.weather.rainfall.forecast.map((day: any, i: number) => (
                            <div key={i} className="flex flex-col items-center">
                              <span>{day.day}</span>
                              <CloudRain
                                className={`h-4 w-4 my-1 ${day.chance > 50 ? "text-blue-500" : "text-gray-400"}`}
                              />
                              <span className="font-medium">{day.chance}%</span>
                              <span className="text-muted-foreground">{day.amount}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="pt-2 border-t mt-2">
                        <p className="text-xs text-muted-foreground">
                          <strong>AI Insight:</strong> {predictions.weather.rainfall.recommendation}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <Thermometer className="h-5 w-5 text-orange-500" />
                      <CardTitle className="text-base">Temperature Trends</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Current Range:</span>
                        <span className="text-sm font-medium">{predictions.weather.temperature.current}</span>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Daily Forecast:</p>
                        <div className="grid grid-cols-7 gap-1 text-xs">
                          {predictions.weather.temperature.daily.map((day: any, i: number) => (
                            <div key={i} className="flex flex-col items-center">
                              <span>{day.day}</span>
                              <Thermometer className="h-4 w-4 my-1 text-orange-500" />
                              <span className="font-medium">{day.max}°C</span>
                              <span className="text-muted-foreground">{day.min}°C</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="pt-2 border-t mt-2">
                        <p className="text-xs text-muted-foreground">
                          <strong>AI Insight:</strong> {predictions.weather.temperature.forecast}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <Sun className="h-5 w-5 text-yellow-500" />
                      <CardTitle className="text-base">Sunlight & Wind</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Sun className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm">Sunlight:</span>
                        </div>
                        <span className="text-sm font-medium">{predictions.weather.sunlight.hours}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Wind className="h-4 w-4 text-blue-400" />
                          <span className="text-sm">Wind:</span>
                        </div>
                        <span className="text-sm font-medium">{predictions.weather.wind.speed}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Droplets className="h-4 w-4 text-blue-500" />
                          <span className="text-sm">Humidity:</span>
                        </div>
                        <span className="text-sm font-medium">{predictions.weather.humidity.average}</span>
                      </div>
                      <div className="pt-2 border-t mt-2">
                        <p className="text-xs text-muted-foreground">
                          <strong>AI Recommendation:</strong> Ideal conditions for {activeCrop} growth. Ensure adequate
                          irrigation during midday heat.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Climate Impact Analysis</CardTitle>
                  <CardDescription>How current and forecasted weather affects your {activeCrop} crop</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2 p-4 border rounded-lg">
                        <h4 className="font-medium flex items-center gap-2">
                          <CloudRain className="h-4 w-4 text-blue-500" /> Rainfall Impact
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Expected rainfall is{" "}
                          {predictions.weather.rainfall.prediction.includes("60%") ? "adequate" : "below optimal"} for
                          current growth stage.
                          {predictions.weather.rainfall.prediction.includes("60%")
                            ? " This will support healthy development and reduce irrigation needs."
                            : " Consider supplemental irrigation to maintain optimal soil moisture."}
                        </p>
                      </div>
                      <div className="space-y-2 p-4 border rounded-lg">
                        <h4 className="font-medium flex items-center gap-2">
                          <Thermometer className="h-4 w-4 text-orange-500" /> Temperature Impact
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Current temperature range is{" "}
                          {predictions.weather.temperature.current.includes("28-32")
                            ? "optimal"
                            : "slightly above optimal"}{" "}
                          for {activeCrop}.
                          {predictions.weather.temperature.current.includes("28-32")
                            ? " This promotes good vegetative growth and development."
                            : " Consider providing shade or additional irrigation to prevent heat stress."}
                        </p>
                      </div>
                      <div className="space-y-2 p-4 border rounded-lg">
                        <h4 className="font-medium flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-500" /> Weather Alerts
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {predictions.weather.rainfall.prediction.includes("60%")
                            ? "Heavy rainfall expected between " +
                              predictions.weather.rainfall.dates +
                              ". Ensure proper drainage to prevent waterlogging."
                            : "No significant weather alerts for the coming week. Monitor for changes in forecast."}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="font-medium mb-2">Recommended Actions Based on Climate Forecast</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 mt-0.5" />
                          <span>
                            {predictions.weather.rainfall.prediction.includes("60%")
                              ? "Delay fertilizer application until after rainfall"
                              : "Apply irrigation in early morning or late evening"}
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 mt-0.5" />
                          <span>
                            {predictions.weather.temperature.current.includes("28-32")
                              ? "Monitor for increased pest activity due to optimal temperatures"
                              : "Apply mulch to regulate soil temperature and conserve moisture"}
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 mt-0.5" />
                          <span>Adjust irrigation schedule based on rainfall forecast</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 mt-0.5" />
                          <span>Prepare for disease prevention measures during humid periods</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="disease" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                      <CardTitle className="text-base">Disease Risk Assessment</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Current Risk Level</span>
                        <Badge
                          className={
                            predictions.disease.risk === "High"
                              ? "bg-destructive"
                              : predictions.disease.risk === "Medium"
                                ? "bg-yellow-500"
                                : "bg-green-500"
                          }
                        >
                          {predictions.disease.risk}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Potential Diseases:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {predictions.disease.potentialDiseases.map((disease: string, index: number) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-destructive">•</span>
                              <span>{disease}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-2 border-t mt-2">
                        <p className="text-xs text-muted-foreground">
                          <strong>AI Recommendation:</strong> {predictions.disease.recommendation}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <Camera className="h-5 w-5 text-primary" />
                      <CardTitle className="text-base">Disease Diagnosis Tool</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border-2 border-dashed rounded-lg p-6 text-center">
                        {isAnalyzingImage ? (
                          <div className="flex flex-col items-center justify-center space-y-2">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            <p className="text-sm text-muted-foreground">Analyzing image with AI...</p>
                          </div>
                        ) : diagnosisResult ? (
                          <div className="space-y-4">
                            <div className="flex items-center justify-center">
                              <Badge className="bg-destructive px-3 py-1 text-base">Disease Detected</Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-left">
                              <div>
                                <p className="text-sm font-medium">Disease:</p>
                                <p className="text-sm">{diagnosisResult.disease}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Confidence:</p>
                                <p className="text-sm">{diagnosisResult.confidence}%</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Severity:</p>
                                <p className="text-sm">{diagnosisResult.severity}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Affected Area:</p>
                                <p className="text-sm">{diagnosisResult.affectedArea}</p>
                              </div>
                            </div>
                            <div className="text-left">
                              <p className="text-sm font-medium">Recommendation:</p>
                              <p className="text-sm text-muted-foreground">{diagnosisResult.recommendation}</p>
                            </div>
                            <div className="flex justify-center">
                              <Button variant="outline" onClick={() => setDiagnosisResult(null)}>
                                Scan Another Image
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                            <p className="text-sm font-medium">Upload a photo of your crop for disease diagnosis</p>
                            <p className="text-xs text-muted-foreground mt-1 mb-4">
                              Take a clear photo of affected leaves or stems for best results
                            </p>
                            <Button onClick={handleImageUpload}>Upload Image</Button>
                            <input
                              type="file"
                              ref={fileInputRef}
                              className="hidden"
                              accept="image/*"
                              onChange={handleFileChange}
                            />
                          </>
                        )}
                      </div>

                      {diagnosisResult && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t">
                          <div>
                            <h4 className="text-sm font-medium mb-2">Organic Treatment Options</h4>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              {predictions.disease.treatmentOptions.organic.map((treatment: string, index: number) => (
                                <li key={index} className="flex items-start gap-2">
                                  <Check className="h-4 w-4 text-green-500 mt-0.5" />
                                  <span>{treatment}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-2">Chemical Treatment Options</h4>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              {predictions.disease.treatmentOptions.chemical.map((treatment: string, index: number) => (
                                <li key={index} className="flex items-start gap-2">
                                  <Check className="h-4 w-4 text-green-500 mt-0.5" />
                                  <span>{treatment}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-3">
                  <CardHeader>
                    <CardTitle className="text-base">Preventive Measures</CardTitle>
                    <CardDescription>Recommended practices to prevent disease outbreaks</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2 p-4 border rounded-lg">
                        <h4 className="font-medium">Cultural Practices</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-500 mt-0.5" />
                            <span>Crop rotation with non-host plants</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-500 mt-0.5" />
                            <span>Proper field sanitation</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-500 mt-0.5" />
                            <span>Optimal plant spacing</span>
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-2 p-4 border rounded-lg">
                        <h4 className="font-medium">Genetic Approaches</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-500 mt-0.5" />
                            <span>Use of disease-resistant varieties</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-500 mt-0.5" />
                            <span>Certified disease-free planting material</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-500 mt-0.5" />
                            <span>Varietal diversification</span>
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-2 p-4 border rounded-lg">
                        <h4 className="font-medium">Monitoring & Management</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-500 mt-0.5" />
                            <span>Regular scouting (2-3 times weekly)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-500 mt-0.5" />
                            <span>Early removal of infected plants</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-500 mt-0.5" />
                            <span>Preventive spraying during high-risk periods</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="calendar" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-5 w-5 text-primary" />
                      <CardTitle className="text-base">Personalized Calendar</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Optimal Planting</span>
                        <span className="text-sm font-medium">{predictions.farmingCalendar.plantingWindow}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Expected Harvest</span>
                        <span className="text-sm font-medium">{predictions.farmingCalendar.harvestWindow}</span>
                      </div>
                      <div className="pt-2 border-t mt-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-between text-sm font-normal">
                              {date ? format(date, "PPP") : "Pick a date"}
                              <CalendarIcon className="h-4 w-4 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Upcoming Activities</CardTitle>
                    <CardDescription>AI-generated schedule based on your crop and location</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {predictions.farmingCalendar.keyActivities.slice(0, 4).map((activity: any, index: number) => (
                        <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                            <CalendarIcon className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="text-sm font-semibold">{activity.activity}</h4>
                                <Badge
                                  className={`mt-1 ${
                                    activity.priority === "High"
                                      ? "bg-destructive"
                                      : activity.priority === "Medium"
                                        ? "bg-yellow-500"
                                        : "bg-blue-500"
                                  }`}
                                >
                                  {activity.priority} Priority
                                </Badge>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className={completedTasks.includes(`task-${index}`) ? "text-green-500" : ""}
                                onClick={() => handleTaskComplete(`task-${index}`)}
                              >
                                {completedTasks.includes(`task-${index}`) ? (
                                  <Check className="h-4 w-4" />
                                ) : (
                                  "Mark Complete"
                                )}
                              </Button>
                            </div>
                            <p className="text-sm text-muted-foreground mt-2">
                              Scheduled for {format(new Date(activity.date), "MMMM d, yyyy")}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">{activity.details}</p>
                          </div>
                        </div>
                      ))}
                      <div className="flex justify-center">
                        <Button variant="outline">View All Activities</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-3">
                  <CardHeader>
                    <CardTitle className="text-base">Annual Farming Calendar</CardTitle>
                    <CardDescription>Year-round planning for optimal farm management</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {predictions.farmingCalendar.seasonalOverview.slice(0, 12).map((month: any, index: number) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <h4 className="font-medium text-sm mb-2">{month.month}</h4>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            {month.activities.map((activity: string, actIndex: number) => (
                              <li key={actIndex} className="flex items-start gap-1">
                                <span className="text-primary">•</span>
                                <span>{activity}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="growth" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <Leaf className="h-5 w-5 text-primary" />
                      <CardTitle className="text-base">Growth Stage</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs">Planting</span>
                          <span className="text-xs">Harvest</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${predictions.growthStage.progress}%` }}
                          ></div>
                        </div>
                        <div className="mt-2 text-center">
                          <Badge variant="outline" className="bg-primary/10 text-primary border-primary">
                            {predictions.growthStage.current}
                          </Badge>
                        </div>
                      </div>
                      <div className="pt-2">
                        <div className="flex justify-between text-sm">
                          <span>Days since planting:</span>
                          <span className="font-medium">{predictions.growthStage.daysPlanted} days</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Expected harvest:</span>
                          <span className="font-medium">In {predictions.growthStage.daysToHarvest} days</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Next stage:</span>
                          <span className="font-medium">In {predictions.growthStage.daysToNextStage} days</span>
                        </div>
                      </div>
                      {predictions.growthStage.criticalPeriod && (
                        <div className="pt-2 border-t mt-2">
                          <Badge className="bg-yellow-500">Critical Growth Period</Badge>
                          <p className="text-xs text-muted-foreground mt-1">
                            Current stage requires careful monitoring and management
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Current Stage Details</CardTitle>
                    <CardDescription>
                      {predictions.growthStage.current} - {predictions.growthStage.stageDetails.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-3 border rounded-lg">
                        <h4 className="font-medium text-sm mb-2">Water Requirements</h4>
                        <p className="text-sm text-muted-foreground">
                          {predictions.growthStage.stageDetails.waterNeeds}
                        </p>
                        <div className="mt-2">
                          <p className="text-xs text-muted-foreground">
                            {predictions.growthStage.stageDetails.waterNeeds === "High"
                              ? "Maintain consistent soil moisture. Avoid water stress."
                              : predictions.growthStage.stageDetails.waterNeeds === "Medium to High"
                                ? "Regular irrigation needed, especially during dry periods."
                                : "Moderate irrigation. Avoid waterlogging."}
                          </p>
                        </div>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h4 className="font-medium text-sm mb-2">Nutrient Needs</h4>
                        <p className="text-sm text-muted-foreground">
                          {predictions.growthStage.stageDetails.nutrientNeeds}
                        </p>
                        <div className="mt-2">
                          <p className="text-xs text-muted-foreground">
                            {predictions.growthStage.stageDetails.nutrientNeeds.includes("nitrogen")
                              ? "Apply nitrogen-rich fertilizers to support vegetative growth."
                              : "Balance NPK fertilization based on soil test results."}
                          </p>
                        </div>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h4 className="font-medium text-sm mb-2">Common Issues</h4>
                        <p className="text-sm text-muted-foreground">
                          {predictions.growthStage.stageDetails.commonIssues}
                        </p>
                        <div className="mt-2">
                          <p className="text-xs text-muted-foreground">
                            Monitor regularly and take preventive action at first signs.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      <h4 className="font-medium mb-2">Management Recommendations</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 mt-0.5" />
                          <span>
                            Scout for {predictions.growthStage.stageDetails.commonIssues.split(", ")[0]} every 3-4 days
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 mt-0.5" />
                          <span>Maintain soil moisture at 60-70% field capacity</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 mt-0.5" />
                          <span>Apply foliar fertilizer to address any nutrient deficiencies</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 mt-0.5" />
                          <span>
                            Prepare for {predictions.growthStage.nextStage} transition in{" "}
                            {predictions.growthStage.daysToNextStage} days
                          </span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-3">
                  <CardHeader>
                    <CardTitle className="text-base">Yield Prediction</CardTitle>
                    <CardDescription>AI-based harvest forecast and influencing factors</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
                        <div className="text-4xl font-bold text-primary">{predictions.yield.estimated}</div>
                        <p className="text-sm text-muted-foreground">Estimated yield per hectare</p>
                        <div className="mt-4 w-full">
                          <div className="flex justify-between text-xs text-muted-foreground mb-1">
                            <span>Regional Avg: {predictions.yield.regional}</span>
                            <span>Potential: {predictions.yield.potential}</span>
                          </div>
                          <Progress
                            value={
                              (Number.parseFloat(predictions.yield.estimated.split(" ")[0]) /
                                Number.parseFloat(predictions.yield.potential.split(" ")[0])) *
                              100
                            }
                            className="h-2"
                          />
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <h4 className="font-medium mb-3">Yield Influencing Factors</h4>
                        <div className="space-y-3">
                          {predictions.yield.factors.map((factor: any, index: number) => (
                            <div key={index} className="flex items-center justify-between">
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
                              <Badge
                                className={`
                              ${
                                factor.status === "Favorable" || factor.status === "Optimal" || factor.status === "Good"
                                  ? "bg-green-500"
                                  : factor.status === "Moderate" || factor.status === "Low"
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                              }
                            `}
                              >
                                {factor.status}
                              </Badge>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 pt-4 border-t">
                          <h4 className="font-medium mb-2">Yield Optimization Tips</h4>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                            <li className="flex items-start gap-2">
                              <Check className="h-4 w-4 text-green-500 mt-0.5" />
                              <span>Optimize irrigation during critical growth stages</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Check className="h-4 w-4 text-green-500 mt-0.5" />
                              <span>Apply balanced fertilization based on soil tests</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Check className="h-4 w-4 text-green-500 mt-0.5" />
                              <span>Implement integrated pest management practices</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <Check className="h-4 w-4 text-green-500 mt-0.5" />
                              <span>Harvest at optimal maturity for maximum yield</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
