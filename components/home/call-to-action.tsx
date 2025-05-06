"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plane, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function CallToAction() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setEmail("")
  }

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-r from-primary/10 to-accent/10">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-repeat opacity-5"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div>
            <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-6">
              <Plane className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Ready to Elevate Your Aviation Journey?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join my newsletter for aviation tips, industry insights, and updates on my latest projects and flight
              experiences.
            </p>
          </div>

          <div className="max-w-md mx-auto">
            {isSubmitted ? (
              <div className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 p-4 rounded-lg">
                <p className="font-medium">Thank you for subscribing!</p>
                <p className="text-sm mt-1">You'll receive aviation updates and insights in your inbox soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-grow"
                />
                <Button type="submit" disabled={isSubmitting} className="whitespace-nowrap">
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Subscribing...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Subscribe
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  )}
                </Button>
              </form>
            )}
            <p className="text-xs text-muted-foreground mt-3">
              By subscribing, you agree to our{" "}
              <Link href="/privacy" className="underline hover:text-primary">
                Privacy Policy
              </Link>
              .
            </p>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/about"
              className="text-sm flex items-center text-muted-foreground hover:text-primary transition-colors"
            >
              <span className="mr-2">Learn more about me</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
            <div className="hidden sm:block h-4 border-r border-border"></div>
            <Link
              href="/contact"
              className="text-sm flex items-center text-muted-foreground hover:text-primary transition-colors"
            >
              <span className="mr-2">Schedule a discovery flight</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
            <div className="hidden sm:block h-4 border-r border-border"></div>
            <Link
              href="/projects"
              className="text-sm flex items-center text-muted-foreground hover:text-primary transition-colors"
            >
              <span className="mr-2">Explore my projects</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
