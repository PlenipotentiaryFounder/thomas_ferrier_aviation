"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Code, Cpu, LineChart } from "lucide-react"
import Link from "next/link"

export default function ConsultingSection() {
  return (
    <section className="w-full py-12 md:py-24 bg-muted/50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-6">Aviation Technology Consulting</h2>
            <p className="text-muted-foreground text-lg mb-6">
              I am passionate about aviation and technology. I don't know everything, but I am dedicated to building
              solutions to difficult problems. I love contributing to aviation and would love the opportunity to help if
              you think I might be able to.
            </p>
            <p className="text-muted-foreground text-lg mb-8">
              Whether you need help with flight operations optimization, custom software development, or implementing
              new aviation technologies, I'm here to help you navigate the challenges.
            </p>
            <Link href="/contact">
              <Button size="lg" className="group">
                Get in Touch
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="border-0 shadow-md">
              <CardHeader className="pb-2">
                <Code className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Software Solutions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Custom aviation software development tailored to your specific needs.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader className="pb-2">
                <LineChart className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Data Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Flight data analysis to improve efficiency and safety.</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader className="pb-2">
                <Cpu className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">Technology Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Seamless integration of new technologies with existing systems.</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader className="pb-2">
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
                  className="h-8 w-8 text-primary mb-2"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 1-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
                <CardTitle className="text-lg">Documentation & Training</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Comprehensive documentation and training for aviation systems.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
