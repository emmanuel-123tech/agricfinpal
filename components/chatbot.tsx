"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { X, Minimize2, Maximize2, Send, Bot, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AgricFinPal assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Generate bot response based on user input
    setTimeout(() => {
      const botResponse = generateResponse(input.toLowerCase())
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    }, 1000)
  }

  const generateResponse = (input: string): string => {
    if (input.includes("loan") && input.includes("apply")) {
      return "To apply for a loan, navigate to the Credit Score section in your dashboard. There you can see your eligibility and apply for various agricultural loans. Would you like me to guide you through the process?"
    } else if (input.includes("loan") && input.includes("repay")) {
      return "You can view your loan repayment schedule in the Credit Score section. We offer multiple payment methods including bank transfers, mobile money, and direct debit. Would you like information on any specific payment method?"
    } else if (input.includes("invest")) {
      return "Our investment platform offers various opportunities for farmers to invest in agricultural projects or attract investors. You can access this from the Investment section in your dashboard. Would you like to know more about specific investment options?"
    } else if (input.includes("credit") || input.includes("score")) {
      return "Your credit score is calculated based on your farming history, loan repayment record, and other financial factors. You can improve it by maintaining timely loan repayments and increasing your farm productivity. Check the Credit Score dashboard for personalized recommendations."
    } else if (input.includes("farm") && (input.includes("advice") || input.includes("tip"))) {
      return "Our AI Farming Guide provides personalized recommendations based on your location, crop types, and weather conditions. Have you checked the AI Farming Guide section in your dashboard? I can help you navigate there."
    } else if (input.includes("thank")) {
      return "You're welcome! I'm here to help with any questions about AgricFinPal services. Is there anything else you'd like to know?"
    } else {
      return "I'm here to help with questions about loans, investments, farming advice, and other AgricFinPal services. Could you provide more details about what you're looking for?"
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 bg-green-600 hover:bg-green-700 shadow-lg flex items-center justify-center"
      >
        <Bot className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <Card
      className={`fixed bottom-6 right-6 w-80 md:w-96 shadow-xl border-0 transition-all duration-300 ${
        isMinimized ? "h-16" : "h-[500px]"
      }`}
    >
      <CardHeader
        className="p-3 border-b flex flex-row items-center justify-between bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-t-lg cursor-pointer"
        onClick={() => setIsMinimized(!isMinimized)}
      >
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          <h3 className="font-medium">AgricFinPal Assistant</h3>
        </div>
        <div className="flex items-center gap-1">
          {isMinimized ? (
            <Maximize2
              className="h-4 w-4 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation()
                setIsMinimized(false)
              }}
            />
          ) : (
            <Minimize2
              className="h-4 w-4 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation()
                setIsMinimized(true)
              }}
            />
          )}
          <X
            className="h-4 w-4 cursor-pointer ml-2"
            onClick={(e) => {
              e.stopPropagation()
              setIsOpen(false)
            }}
          />
        </div>
      </CardHeader>
      {!isMinimized && (
        <>
          <CardContent className="p-3 overflow-y-auto h-[calc(100%-120px)]">
            <div className="flex flex-col gap-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-2 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.sender === "bot" && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback className="bg-green-600 text-white">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`rounded-lg p-3 max-w-[80%] ${
                      message.sender === "user" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs mt-1 opacity-70">{formatTime(message.timestamp)}</p>
                  </div>
                  {message.sender === "user" && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback className="bg-blue-600 text-white">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          <CardFooter className="p-3 border-t">
            <div className="flex w-full gap-2">
              <Input
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button onClick={handleSend} size="icon" className="bg-green-600 hover:bg-green-700">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </>
      )}
    </Card>
  )
}
