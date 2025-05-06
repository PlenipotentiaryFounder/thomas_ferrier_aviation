"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ConsultingCTA() {
  return (
    <section className="w-full py-12 md:py-24 bg-primary text-primary-foreground">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-4">
              Let's Solve Aviation Challenges Together
            </h2>
            <p className="text-primary-foreground/80 md:text-xl max-w-[600px] mb-6">
              I am passionate about aviation and technology. I don't know everything, but I am dedicated to building
              solutions to difficult problems. I love contributing to aviation and would love the opportunity to help if
              you think I might be able to - feel free to get in touch!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Schedule a Consultation
                </Button>
              </Link>
              <Link href="mailto:thomas@ferrieraviation.com">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-primary-foreground/20 hover:bg-primary-foreground/10"
                >
                  Email Me Directly
                </Button>
              </Link>
            </div>
          </div>
          <div className="bg-primary-foreground/10 p-8 rounded-lg">
            <h3 className="text-xl font-bold mb-4">What You Can Expect</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 mr-2 text-primary-foreground"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Dedicated and passionate approach to your challenges</span>
              </li>
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 mr-2 text-primary-foreground"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Creative solutions tailored to your specific needs</span>
              </li>
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 mr-2 text-primary-foreground"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Clear communication throughout the process</span>
              </li>
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 mr-2 text-primary-foreground"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Focus on practical, implementable solutions</span>
              </li>
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 mr-2 text-primary-foreground"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Commitment to excellence and continuous improvement</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
