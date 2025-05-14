"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  CreditCard,
  Download,
  FileText,
  Info,
  Landmark,
  Phone,
  Receipt,
} from "lucide-react"

// Mock data for loan repayments
const loanData = {
  activeLoans: [
    {
      id: "LN-2023-001",
      lender: "AgriFinance Ltd",
      amount: 500000,
      disbursedDate: "2023-03-15",
      dueDate: "2024-03-15",
      term: "12 months",
      interestRate: "12%",
      purpose: "Farm Equipment",
      status: "Active",
      amountPaid: 250000,
      nextPaymentDate: "2023-07-25",
      nextPaymentAmount: 46667,
      paymentSchedule: [
        {
          dueDate: "2023-04-15",
          amount: 46667,
          status: "Paid",
          paidDate: "2023-04-14",
        },
        {
          dueDate: "2023-05-15",
          amount: 46667,
          status: "Paid",
          paidDate: "2023-05-13",
        },
        {
          dueDate: "2023-06-15",
          amount: 46667,
          status: "Paid",
          paidDate: "2023-06-15",
        },
        {
          dueDate: "2023-07-15",
          amount: 46667,
          status: "Paid",
          paidDate: "2023-07-14",
        },
        {
          dueDate: "2023-08-15",
          amount: 46667,
          status: "Upcoming",
          paidDate: null,
        },
        {
          dueDate: "2023-09-15",
          amount: 46667,
          status: "Upcoming",
          paidDate: null,
        },
        {
          dueDate: "2023-10-15",
          amount: 46667,
          status: "Upcoming",
          paidDate: null,
        },
        {
          dueDate: "2023-11-15",
          amount: 46667,
          status: "Upcoming",
          paidDate: null,
        },
        {
          dueDate: "2023-12-15",
          amount: 46667,
          status: "Upcoming",
          paidDate: null,
        },
        {
          dueDate: "2024-01-15",
          amount: 46667,
          status: "Upcoming",
          paidDate: null,
        },
        {
          dueDate: "2024-02-15",
          amount: 46667,
          status: "Upcoming",
          paidDate: null,
        },
        {
          dueDate: "2024-03-15",
          amount: 46667,
          status: "Upcoming",
          paidDate: null,
        },
      ],
    },
    {
      id: "LN-2023-008",
      lender: "FarmCredit Nigeria",
      amount: 250000,
      disbursedDate: "2023-05-10",
      dueDate: "2023-11-10",
      term: "6 months",
      interestRate: "15%",
      purpose: "Seeds & Inputs",
      status: "Active",
      amountPaid: 83333,
      nextPaymentDate: "2023-08-10",
      nextPaymentAmount: 41667,
      paymentSchedule: [
        {
          dueDate: "2023-06-10",
          amount: 41667,
          status: "Paid",
          paidDate: "2023-06-09",
        },
        {
          dueDate: "2023-07-10",
          amount: 41667,
          status: "Paid",
          paidDate: "2023-07-10",
        },
        {
          dueDate: "2023-08-10",
          amount: 41667,
          status: "Upcoming",
          paidDate: null,
        },
        {
          dueDate: "2023-09-10",
          amount: 41667,
          status: "Upcoming",
          paidDate: null,
        },
        {
          dueDate: "2023-10-10",
          amount: 41667,
          status: "Upcoming",
          paidDate: null,
        },
        {
          dueDate: "2023-11-10",
          amount: 41667,
          status: "Upcoming",
          paidDate: null,
        },
      ],
    },
  ],
  completedLoans: [
    {
      id: "LN-2022-015",
      lender: "AgriFinance Ltd",
      amount: 300000,
      disbursedDate: "2022-01-20",
      dueDate: "2022-07-20",
      term: "6 months",
      interestRate: "14%",
      purpose: "Seeds & Inputs",
      status: "Completed",
      amountPaid: 300000,
      completionDate: "2022-07-18",
    },
    {
      id: "LN-2022-042",
      lender: "FarmCredit Nigeria",
      amount: 450000,
      disbursedDate: "2022-04-05",
      dueDate: "2023-04-05",
      term: "12 months",
      interestRate: "12%",
      purpose: "Irrigation System",
      status: "Completed",
      amountPaid: 450000,
      completionDate: "2023-04-03",
    },
  ],
  paymentMethods: [
    {
      id: "PM-001",
      type: "Bank Transfer",
      details: {
        bankName: "First Bank",
        accountNumber: "1234567890",
        accountName: "AgriFinance Ltd",
      },
    },
    {
      id: "PM-002",
      type: "Mobile Money",
      details: {
        provider: "MTN MoMo",
        phoneNumber: "0801234567",
        accountName: "AgriFinance Ltd",
      },
    },
    {
      id: "PM-003",
      type: "USSD",
      details: {
        code: "*737*8*Amount#",
        bankName: "GTBank",
      },
    },
  ],
}

export function LoanRepayment() {
  const [activeTab, setActiveTab] = useState("active")
  const [selectedLoan, setSelectedLoan] = useState(loanData.activeLoans[0])
  const [paymentMethod, setPaymentMethod] = useState("")
  const [paymentAmount, setPaymentAmount] = useState(selectedLoan.nextPaymentAmount.toString())
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false)
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false)

  const handleMakePayment = () => {
    // In a real app, this would process the payment
    setIsPaymentSuccess(true)
    setTimeout(() => {
      setIsPaymentDialogOpen(false)
      setIsPaymentSuccess(false)
    }, 2000)
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Loan Repayment</h1>
          <p className="text-muted-foreground">Manage your loan repayments and payment schedules</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="active">Active Loans</TabsTrigger>
          <TabsTrigger value="completed">Completed Loans</TabsTrigger>
          <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          {loanData.activeLoans.map((loan) => (
            <Card key={loan.id}>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-500" />
                      Loan {loan.id}
                    </CardTitle>
                    <CardDescription>
                      {loan.purpose} - {loan.lender}
                    </CardDescription>
                  </div>
                  <Badge className="mt-2 md:mt-0 bg-green-500 self-start md:self-center">Active</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Loan Amount</h3>
                      <p className="text-2xl font-bold">₦{loan.amount.toLocaleString()}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Term & Interest</h3>
                      <p className="text-base">
                        {loan.term} at {loan.interestRate} interest
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Disbursed Date</h3>
                      <p className="text-base">{new Date(loan.disbursedDate).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <h3 className="text-sm font-medium text-muted-foreground">Repayment Progress</h3>
                        <span className="text-sm">{Math.round((loan.amountPaid / loan.amount) * 100)}%</span>
                      </div>
                      <Progress value={(loan.amountPaid / loan.amount) * 100} className="h-2" />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Paid</span>
                      <span className="font-medium">₦{loan.amountPaid.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Remaining</span>
                      <span className="font-medium">₦{(loan.amount - loan.amountPaid).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg bg-amber-50">
                      <h3 className="font-medium flex items-center gap-2 text-amber-800">
                        <Calendar className="h-4 w-4 text-amber-600" />
                        Next Payment Due
                      </h3>
                      <p className="mt-1 text-lg font-bold text-amber-800">
                        ₦{loan.nextPaymentAmount.toLocaleString()}
                      </p>
                      <p className="text-sm text-amber-700">
                        Due by {new Date(loan.nextPaymentDate).toLocaleDateString()}
                      </p>
                    </div>
                    <Dialog
                      open={isPaymentDialogOpen && selectedLoan.id === loan.id}
                      onOpenChange={(open) => {
                        setIsPaymentDialogOpen(open)
                        if (open) setSelectedLoan(loan)
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button className="w-full bg-green-600 hover:bg-green-700">Make Payment</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Make Loan Repayment</DialogTitle>
                          <DialogDescription>Complete your loan repayment for {loan.id}</DialogDescription>
                        </DialogHeader>
                        {isPaymentSuccess ? (
                          <div className="py-6 flex flex-col items-center justify-center">
                            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                              <CheckCircle className="h-8 w-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold text-center">Payment Successful!</h3>
                            <p className="text-center text-muted-foreground mt-2">
                              Your payment of ₦{Number.parseInt(paymentAmount).toLocaleString()} has been processed
                              successfully.
                            </p>
                          </div>
                        ) : (
                          <>
                            <div className="grid gap-4 py-4">
                              <div className="grid gap-2">
                                <Label htmlFor="amount">Payment Amount</Label>
                                <Input
                                  id="amount"
                                  type="number"
                                  value={paymentAmount}
                                  onChange={(e) => setPaymentAmount(e.target.value)}
                                />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="payment-method">Payment Method</Label>
                                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                                  <SelectTrigger id="payment-method">
                                    <SelectValue placeholder="Select payment method" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {loanData.paymentMethods.map((method) => (
                                      <SelectItem key={method.id} value={method.id}>
                                        {method.type}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              {paymentMethod && (
                                <div className="bg-blue-50 p-3 rounded-md">
                                  <h4 className="font-medium text-blue-800 flex items-center gap-2">
                                    <Info className="h-4 w-4 text-blue-600" />
                                    Payment Instructions
                                  </h4>
                                  <div className="mt-2 text-sm text-blue-700">
                                    {paymentMethod === "PM-001" && (
                                      <div className="space-y-1">
                                        <p>Bank: {loanData.paymentMethods[0].details.bankName}</p>
                                        <p>Account Number: {loanData.paymentMethods[0].details.accountNumber}</p>
                                        <p>Account Name: {loanData.paymentMethods[0].details.accountName}</p>
                                      </div>
                                    )}
                                    {paymentMethod === "PM-002" && (
                                      <div className="space-y-1">
                                        <p>Provider: {loanData.paymentMethods[1].details.provider}</p>
                                        <p>Phone Number: {loanData.paymentMethods[1].details.phoneNumber}</p>
                                        <p>Account Name: {loanData.paymentMethods[1].details.accountName}</p>
                                      </div>
                                    )}
                                    {paymentMethod === "PM-003" && (
                                      <div className="space-y-1">
                                        <p>Dial: {loanData.paymentMethods[2].details.code}</p>
                                        <p>Bank: {loanData.paymentMethods[2].details.bankName}</p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setIsPaymentDialogOpen(false)}>
                                Cancel
                              </Button>
                              <Button onClick={handleMakePayment} disabled={!paymentMethod}>
                                Confirm Payment
                              </Button>
                            </DialogFooter>
                          </>
                        )}
                      </DialogContent>
                    </Dialog>
                    <Button variant="outline" className="w-full">
                      <Receipt className="mr-2 h-4 w-4" />
                      Download Statement
                    </Button>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-base font-medium mb-4">Payment Schedule</h3>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Due Date</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Payment Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {loan.paymentSchedule.map((payment, index) => (
                          <TableRow key={index}>
                            <TableCell>{new Date(payment.dueDate).toLocaleDateString()}</TableCell>
                            <TableCell>₦{payment.amount.toLocaleString()}</TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  payment.status === "Paid"
                                    ? "bg-green-500"
                                    : payment.status === "Upcoming"
                                      ? "bg-blue-500"
                                      : "bg-amber-500"
                                }
                              >
                                {payment.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {payment.paidDate ? new Date(payment.paidDate).toLocaleDateString() : "-"}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          {loanData.completedLoans.map((loan) => (
            <Card key={loan.id}>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-500" />
                      Loan {loan.id}
                    </CardTitle>
                    <CardDescription>
                      {loan.purpose} - {loan.lender}
                    </CardDescription>
                  </div>
                  <Badge className="mt-2 md:mt-0 bg-gray-500 self-start md:self-center">Completed</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Loan Amount</h3>
                      <p className="text-2xl font-bold">₦{loan.amount.toLocaleString()}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Term & Interest</h3>
                      <p className="text-base">
                        {loan.term} at {loan.interestRate} interest
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Disbursed Date</h3>
                      <p className="text-base">{new Date(loan.disbursedDate).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <h3 className="text-sm font-medium text-muted-foreground">Repayment Progress</h3>
                        <span className="text-sm">100%</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Paid</span>
                      <span className="font-medium">₦{loan.amountPaid.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Remaining</span>
                      <span className="font-medium">₦0</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg bg-green-50">
                      <h3 className="font-medium flex items-center gap-2 text-green-800">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Loan Completed
                      </h3>
                      <p className="mt-1 text-sm text-green-700">
                        Completed on {new Date(loan.completionDate).toLocaleDateString()}
                      </p>
                    </div>
                    <Button variant="outline" className="w-full">
                      <Receipt className="mr-2 h-4 w-4" />
                      Download Statement
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Download Completion Certificate
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="payment-methods" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Available methods to repay your loans</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Landmark className="h-5 w-5 text-blue-500" />
                      Bank Transfer
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Bank Name:</span>
                        <span className="font-medium">{loanData.paymentMethods[0].details.bankName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Account Number:</span>
                        <span className="font-medium">{loanData.paymentMethods[0].details.accountNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Account Name:</span>
                        <span className="font-medium">{loanData.paymentMethods[0].details.accountName}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Phone className="h-5 w-5 text-green-500" />
                      Mobile Money
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Provider:</span>
                        <span className="font-medium">{loanData.paymentMethods[1].details.provider}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Phone Number:</span>
                        <span className="font-medium">{loanData.paymentMethods[1].details.phoneNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Account Name:</span>
                        <span className="font-medium">{loanData.paymentMethods[1].details.accountName}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-purple-500" />
                      USSD
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Code:</span>
                        <span className="font-medium">{loanData.paymentMethods[2].details.code}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Bank:</span>
                        <span className="font-medium">{loanData.paymentMethods[2].details.bankName}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6 p-4 border rounded-lg bg-blue-50">
                <h3 className="font-medium flex items-center gap-2 text-blue-800">
                  <AlertCircle className="h-5 w-5 text-blue-600" />
                  Payment Instructions
                </h3>
                <div className="mt-2 space-y-2 text-sm text-blue-700">
                  <p>1. Use any of the payment methods above to make your loan repayment.</p>
                  <p>2. Always include your Loan ID as reference when making payments.</p>
                  <p>3. After making a payment, it may take up to 24 hours to reflect in your account.</p>
                  <p>4. For any payment issues, contact our support team at support@agricai.com.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
