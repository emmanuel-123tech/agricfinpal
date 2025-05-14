"use client"

import { useState } from "react"
import { Search, ChevronDown, CheckCircle, XCircle, Eye, Download } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for loan applications
const loanApplications = [
  {
    id: "LA-2023-001",
    farmerName: "Ibrahim Oladele",
    amount: 500000,
    purpose: "Farm Equipment",
    date: "2023-07-15",
    status: "Pending",
    creditScore: 680,
    location: "Ibadan, Oyo",
    farmSize: "5 hectares",
    cropType: "Cassava",
  },
  {
    id: "LA-2023-002",
    farmerName: "Amina Yusuf",
    amount: 350000,
    purpose: "Seeds & Inputs",
    date: "2023-07-14",
    status: "Pending",
    creditScore: 710,
    location: "Kano, Kano",
    farmSize: "3 hectares",
    cropType: "Rice",
  },
  {
    id: "LA-2023-003",
    farmerName: "Chidi Okonkwo",
    amount: 750000,
    purpose: "Irrigation System",
    date: "2023-07-12",
    status: "Pending",
    creditScore: 650,
    location: "Enugu, Enugu",
    farmSize: "7 hectares",
    cropType: "Vegetables",
  },
  {
    id: "LA-2023-004",
    farmerName: "Fatima Bello",
    amount: 250000,
    purpose: "Seeds & Inputs",
    date: "2023-07-10",
    status: "Approved",
    creditScore: 720,
    location: "Sokoto, Sokoto",
    farmSize: "2 hectares",
    cropType: "Millet",
  },
  {
    id: "LA-2023-005",
    farmerName: "David Adeyemi",
    amount: 600000,
    purpose: "Storage Facility",
    date: "2023-07-08",
    status: "Rejected",
    creditScore: 580,
    location: "Lagos, Lagos",
    farmSize: "4 hectares",
    cropType: "Maize",
  },
  {
    id: "LA-2023-006",
    farmerName: "Grace Okafor",
    amount: 450000,
    purpose: "Farm Equipment",
    date: "2023-07-07",
    status: "Approved",
    creditScore: 690,
    location: "Abia, Umuahia",
    farmSize: "3.5 hectares",
    cropType: "Yam",
  },
  {
    id: "LA-2023-007",
    farmerName: "Mohammed Ibrahim",
    amount: 800000,
    purpose: "Land Acquisition",
    date: "2023-07-05",
    status: "Pending",
    creditScore: 700,
    location: "Kaduna, Kaduna",
    farmSize: "8 hectares",
    cropType: "Sorghum",
  },
  {
    id: "LA-2023-008",
    farmerName: "Blessing Adebayo",
    amount: 300000,
    purpose: "Seeds & Inputs",
    date: "2023-07-03",
    status: "Approved",
    creditScore: 730,
    location: "Osun, Osogbo",
    farmSize: "2.5 hectares",
    cropType: "Cocoa",
  },
  {
    id: "LA-2023-009",
    farmerName: "Emeka Nwachukwu",
    amount: 550000,
    purpose: "Irrigation System",
    date: "2023-07-01",
    status: "Rejected",
    creditScore: 600,
    location: "Anambra, Awka",
    farmSize: "4.5 hectares",
    cropType: "Cassava",
  },
  {
    id: "LA-2023-010",
    farmerName: "Aisha Mohammed",
    amount: 400000,
    purpose: "Farm Equipment",
    date: "2023-06-29",
    status: "Approved",
    creditScore: 715,
    location: "Borno, Maiduguri",
    farmSize: "3 hectares",
    cropType: "Groundnut",
  },
]

export default function LoanApplicationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [purposeFilter, setPurposeFilter] = useState("all")

  // Filter applications based on search term and filters
  const filteredApplications = loanApplications.filter((application) => {
    const matchesSearch =
      application.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || application.status.toLowerCase() === statusFilter.toLowerCase()

    const matchesPurpose =
      purposeFilter === "all" || application.purpose.toLowerCase().includes(purposeFilter.toLowerCase())

    return matchesSearch && matchesStatus && matchesPurpose
  })

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Loan Applications</h1>
          <p className="text-muted-foreground">Review and manage farmer loan applications</p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by farmer name or ID..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-[180px]">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-[180px]">
                <Select value={purposeFilter} onValueChange={setPurposeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Purposes</SelectItem>
                    <SelectItem value="farm equipment">Farm Equipment</SelectItem>
                    <SelectItem value="seeds">Seeds & Inputs</SelectItem>
                    <SelectItem value="irrigation">Irrigation System</SelectItem>
                    <SelectItem value="storage">Storage Facility</SelectItem>
                    <SelectItem value="land">Land Acquisition</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Applications Table */}
      <Card>
        <CardHeader>
          <CardTitle>Loan Applications ({filteredApplications.length})</CardTitle>
          <CardDescription>Review and process farmer loan requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Application ID</TableHead>
                  <TableHead>Farmer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Purpose</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Credit Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell className="font-medium">{application.id}</TableCell>
                    <TableCell>{application.farmerName}</TableCell>
                    <TableCell>₦{application.amount.toLocaleString()}</TableCell>
                    <TableCell>{application.purpose}</TableCell>
                    <TableCell>{new Date(application.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          application.creditScore >= 700
                            ? "bg-green-500"
                            : application.creditScore >= 650
                              ? "bg-blue-500"
                              : application.creditScore >= 600
                                ? "bg-amber-500"
                                : "bg-red-500"
                        }
                      >
                        {application.creditScore}
                      </Badge>
                    </TableCell>
                    <TableCell>
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
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <span className="sr-only">Open menu</span>
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {application.status === "Pending" && (
                            <>
                              <DropdownMenuItem>
                                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <XCircle className="mr-2 h-4 w-4 text-red-500" />
                                Reject
                              </DropdownMenuItem>
                            </>
                          )}
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download Documents
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
