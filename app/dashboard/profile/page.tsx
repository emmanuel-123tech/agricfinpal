"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { User, Mail, Phone, MapPin, Briefcase, Calendar, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getCurrentUser } from "@/lib/auth"

interface UserProfile {
  id: string
  name: string
  email: string
  phone: string
  address: string
  occupation: string
  farmingExperience: string
  bio: string
  farmSize: string
  mainCrops: string[]
  preferredPaymentMethod: string
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  useEffect(() => {
    async function loadUserProfile() {
      try {
        const currentUser = await getCurrentUser()

        if (currentUser) {
          // In a real app, you would fetch the full profile from an API
          // For now, we'll create a mock profile based on the authenticated user
          setUser({
            id: currentUser.id,
            name: currentUser.name,
            email: currentUser.email,
            phone: "+234 800 123 4567",
            address: "123 Farm Road, Lagos, Nigeria",
            occupation: "Farmer",
            farmingExperience: "5-10 years",
            bio: "I am a passionate farmer focused on sustainable agriculture and improving crop yields through modern farming techniques.",
            farmSize: "5-10 hectares",
            mainCrops: ["Maize", "Cassava", "Rice"],
            preferredPaymentMethod: "Bank Transfer",
          })
        } else {
          // Mock data for development
          setUser({
            id: "mock-id",
            name: "Demo User",
            email: "demo@example.com",
            phone: "+234 800 123 4567",
            address: "123 Farm Road, Lagos, Nigeria",
            occupation: "Farmer",
            farmingExperience: "5-10 years",
            bio: "I am a passionate farmer focused on sustainable agriculture and improving crop yields through modern farming techniques.",
            farmSize: "5-10 hectares",
            mainCrops: ["Maize", "Cassava", "Rice"],
            preferredPaymentMethod: "Bank Transfer",
          })
        }
      } catch (error) {
        console.error("Error loading profile:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadUserProfile()
  }, [])

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      setSuccessMessage("Profile updated successfully!")

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    }, 1500)
  }

  if (isLoading) {
    return (
      <div className="flex-1 space-y-6 p-6 md:p-8 pt-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
            <User className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
            <p className="text-gray-500">Loading your profile information...</p>
          </div>
        </div>
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-500 border-t-transparent"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex-1 space-y-6 p-6 md:p-8 pt-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
            <User className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
            <p className="text-gray-500">Error loading profile</p>
          </div>
        </div>
        <Card>
          <CardContent className="p-6">
            <p>Unable to load profile information. Please try again later.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8 pt-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
          <User className="h-5 w-5 text-purple-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-gray-500">Manage your personal information and preferences</p>
        </div>
      </div>

      <Tabs defaultValue="personal">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="farming">Farming Details</TabsTrigger>
          <TabsTrigger value="financial">Financial Info</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details and contact information</CardDescription>
            </CardHeader>
            <form onSubmit={handleProfileUpdate}>
              <CardContent className="space-y-4">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex flex-col items-center gap-2">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="/placeholder.svg?height=96&width=96" alt={user.name} />
                      <AvatarFallback className="text-2xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm">
                      Change Photo
                    </Button>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <div className="relative">
                          <Input id="name" defaultValue={user.name} />
                          <User className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Input id="email" type="email" defaultValue={user.email} />
                          <Mail className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <Input id="phone" defaultValue={user.phone} />
                          <Phone className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <div className="relative">
                          <Input id="address" defaultValue={user.address} />
                          <MapPin className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="occupation">Occupation</Label>
                        <div className="relative">
                          <Input id="occupation" defaultValue={user.occupation} />
                          <Briefcase className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="experience">Farming Experience</Label>
                        <Select defaultValue={user.farmingExperience}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select experience" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Less than 1 year">Less than 1 year</SelectItem>
                            <SelectItem value="1-5 years">1-5 years</SelectItem>
                            <SelectItem value="5-10 years">5-10 years</SelectItem>
                            <SelectItem value="10+ years">10+ years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea id="bio" defaultValue={user.bio} rows={4} />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
              {successMessage && (
                <div className="mx-6 mb-4 p-2 bg-green-100 text-green-700 rounded-md text-center">{successMessage}</div>
              )}
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="farming" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Farming Details</CardTitle>
              <CardDescription>Information about your farming operations</CardDescription>
            </CardHeader>
            <form onSubmit={handleProfileUpdate}>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="farmSize">Farm Size</Label>
                    <Select defaultValue={user.farmSize}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select farm size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Less than 1 hectare">Less than 1 hectare</SelectItem>
                        <SelectItem value="1-5 hectares">1-5 hectares</SelectItem>
                        <SelectItem value="5-10 hectares">5-10 hectares</SelectItem>
                        <SelectItem value="10-50 hectares">10-50 hectares</SelectItem>
                        <SelectItem value="50+ hectares">50+ hectares</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mainCrops">Main Crops</Label>
                    <Input id="mainCrops" defaultValue={user.mainCrops.join(", ")} />
                    <p className="text-xs text-gray-500">Separate multiple crops with commas</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="farmingPractices">Farming Practices</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="organic" className="rounded border-gray-300" defaultChecked />
                      <Label htmlFor="organic" className="font-normal">
                        Organic Farming
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="conventional" className="rounded border-gray-300" />
                      <Label htmlFor="conventional" className="font-normal">
                        Conventional
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="irrigation" className="rounded border-gray-300" defaultChecked />
                      <Label htmlFor="irrigation" className="font-normal">
                        Irrigation
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="mechanized" className="rounded border-gray-300" defaultChecked />
                      <Label htmlFor="mechanized" className="font-normal">
                        Mechanized
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="sustainable" className="rounded border-gray-300" defaultChecked />
                      <Label htmlFor="sustainable" className="font-normal">
                        Sustainable
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="livestock" className="rounded border-gray-300" />
                      <Label htmlFor="livestock" className="font-normal">
                        Livestock
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="equipment">Equipment Owned</Label>
                  <Textarea id="equipment" rows={3} placeholder="List major farming equipment you own..." />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="challenges">Farming Challenges</Label>
                  <Textarea id="challenges" rows={3} placeholder="Describe your main farming challenges..." />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
              {successMessage && (
                <div className="mx-6 mb-4 p-2 bg-green-100 text-green-700 rounded-md text-center">{successMessage}</div>
              )}
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Information</CardTitle>
              <CardDescription>Manage your payment and financial preferences</CardDescription>
            </CardHeader>
            <form onSubmit={handleProfileUpdate}>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="paymentMethod">Preferred Payment Method</Label>
                    <Select defaultValue={user.preferredPaymentMethod}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                        <SelectItem value="Mobile Money">Mobile Money</SelectItem>
                        <SelectItem value="Cash">Cash</SelectItem>
                        <SelectItem value="Cheque">Cheque</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Input id="bankName" defaultValue="First Bank of Nigeria" />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="accountNumber">Account Number</Label>
                    <Input id="accountNumber" defaultValue="1234567890" type="password" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bvn">BVN</Label>
                    <Input id="bvn" defaultValue="12345678901" type="password" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="taxId">Tax ID (Optional)</Label>
                  <Input id="taxId" placeholder="Enter your tax ID if available" />
                </div>

                <div className="space-y-2">
                  <Label>Financial Documents</Label>
                  <div className="border rounded-md p-4 bg-gray-50">
                    <div className="flex flex-col gap-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="h-10 w-10 bg-blue-100 rounded-md flex items-center justify-center">
                            <Calendar className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">Bank Statement</p>
                            <p className="text-xs text-gray-500">Last 6 months</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Upload
                        </Button>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="h-10 w-10 bg-green-100 rounded-md flex items-center justify-center">
                            <Calendar className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium">Proof of Income</p>
                            <p className="text-xs text-gray-500">Farm revenue documentation</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Upload
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
              {successMessage && (
                <div className="mx-6 mb-4 p-2 bg-green-100 text-green-700 rounded-md text-center">{successMessage}</div>
              )}
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
