import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Brain, BarChart4, CreditCard, Leaf, Sun, CloudRain, Tractor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50 to-white">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/80 backdrop-blur-sm sticky top-0 z-30">
        <Link className="flex items-center justify-center" href="#">
          <Leaf className="h-6 w-6 text-green-600 mr-2" />
          <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
            AgricFinPal
          </span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-green-600 transition-colors" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:text-green-600 transition-colors" href="#">
            About
          </Link>
          <Link className="text-sm font-medium hover:text-green-600 transition-colors" href="#">
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-green-50/80 to-white/40 z-10"></div>
          <div className="container px-4 md:px-6 relative z-20">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-800 mb-2">
                    Revolutionizing Agriculture Finance
                  </div>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-gradient-to-r from-green-700 via-green-600 to-emerald-500 bg-clip-text text-transparent">
                    Empowering Farmers with Financial Tools
                  </h1>
                  <p className="max-w-[600px] text-gray-600 md:text-xl">
                    AgricFinPal combines agricultural expertise with financial services to help farmers increase yields,
                    track performance, and access loans and investments.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signup">
                    <Button className="inline-flex h-10 items-center justify-center rounded-md bg-gradient-to-r from-green-600 to-emerald-500 px-8 text-sm font-medium text-white shadow-lg shadow-green-500/20 transition-all hover:shadow-xl hover:shadow-green-500/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button
                      variant="outline"
                      className="inline-flex h-10 items-center justify-center rounded-md border border-green-200 bg-white px-8 text-sm font-medium text-green-700 shadow-sm transition-colors hover:bg-green-50 hover:text-green-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center w-full">
                <div className="relative w-full max-w-[550px] mx-auto">
                  <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 opacity-30 blur-xl"></div>
                  <div className="relative rounded-xl overflow-hidden shadow-2xl w-full">
                    <Image
                      src="/farmm.jpg"
                      alt="Farmers working in a modern greenhouse with rows of organic vegetables"
                      width={550}
                      height={310}
                      className="object-cover w-full h-auto"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-green-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-full border border-green-200 bg-white px-4 py-1.5 text-sm font-medium text-green-700">
                  <span className="flex h-2 w-2 rounded-full bg-green-600 mr-1.5"></span>
                  Powerful Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                  Discover How AgricFinPal Transforms Farming
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our intelligent platform provides everything you need to optimize your agricultural operations and
                  finances
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12 mt-12">
              <Card className="group overflow-hidden rounded-xl border-0 bg-white shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">
                <CardHeader className="flex flex-row items-center gap-4 pb-2 pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-400 text-white shadow-lg">
                    <Brain className="h-6 w-6" />
                  </div>
                  <div className="grid gap-1">
                    <CardTitle className="text-xl">AI Farming Guide</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-sm text-gray-600">
                  Get personalized recommendations for optimal farming practices based on your specific crops, location,
                  and conditions. Our AI analyzes weather patterns, soil data, and crop requirements.
                </CardContent>
                <CardFooter className="pt-0">
                  <Link href="/signup">
                    <Button
                      variant="ghost"
                      className="gap-1 text-green-600 group-hover:text-green-700 group-hover:bg-green-50"
                    >
                      Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card className="group overflow-hidden rounded-xl border-0 bg-white shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">
                <CardHeader className="flex flex-row items-center gap-4 pb-2 pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-lg">
                    <BarChart4 className="h-6 w-6" />
                  </div>
                  <div className="grid gap-1">
                    <CardTitle className="text-xl">Performance Dashboard</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-sm text-gray-600">
                  Track production metrics, monitor multiple plots, and gain insights into your farm's performance and
                  revenue. Visualize trends and identify opportunities for improvement.
                </CardContent>
                <CardFooter className="pt-0">
                  <Link href="/signup">
                    <Button
                      variant="ghost"
                      className="gap-1 text-blue-600 group-hover:text-blue-700 group-hover:bg-blue-50"
                    >
                      Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card className="group overflow-hidden rounded-xl border-0 bg-white shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">
                <CardHeader className="flex flex-row items-center gap-4 pb-2 pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-yellow-400 text-white shadow-lg">
                    <CreditCard className="h-6 w-6" />
                  </div>
                  <div className="grid gap-1">
                    <CardTitle className="text-xl">Credit Score Dashboard</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-sm text-gray-600">
                  Monitor your creditworthiness, access financial services, and improve your eligibility for
                  agricultural loans. Get personalized recommendations to enhance your financial profile.
                </CardContent>
                <CardFooter className="pt-0">
                  <Link href="/signup">
                    <Button
                      variant="ghost"
                      className="gap-1 text-amber-600 group-hover:text-amber-700 group-hover:bg-amber-50"
                    >
                      Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-gradient-to-br from-green-900 to-emerald-800 text-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-white/10 px-3 py-1 text-sm backdrop-blur-sm">
                    Why Choose AgricFinPal
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                    Transform Your Farming Operations
                  </h2>
                  <p className="text-white/80 md:text-xl">
                    Our platform combines cutting-edge AI technology with agricultural expertise to provide you with
                    actionable insights and financial solutions.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                      <Sun className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Climate-Smart Recommendations</h3>
                      <p className="text-white/70 text-sm">
                        Get personalized farming advice based on real-time weather data and climate forecasts.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                      <CloudRain className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Precision Irrigation</h3>
                      <p className="text-white/70 text-sm">
                        Optimize water usage with AI-powered irrigation recommendations tailored to your crops.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                      <Tractor className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Resource Optimization</h3>
                      <p className="text-white/70 text-sm">
                        Reduce costs and increase yields by optimizing your resource allocation based on data-driven
                        insights.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center w-full">
                <div className="relative w-full max-w-[600px] mx-auto">
                  <div className="absolute -inset-1 rounded-xl bg-white/20 opacity-50 blur-xl"></div>
                  <div className="relative rounded-xl overflow-hidden shadow-2xl w-full">
                    <Image
                      src="/smilingg1.jpg"
                      alt="Farmer using modern equipment to maintain crops"
                      width={600}
                      height={400}
                      className="object-cover w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white">
        <div className="flex items-center gap-2">
          <Leaf className="h-5 w-5 text-green-600" />
          <p className="text-sm text-gray-500">© 2025 AgricFinPal. All rights reserved.</p>
        </div>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs text-gray-500 hover:text-green-600 transition-colors" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs text-gray-500 hover:text-green-600 transition-colors" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
