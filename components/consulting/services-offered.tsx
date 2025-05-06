"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plane, Code, LineChart, Cpu, Database, Shield } from "lucide-react"

const services = [
  {
    icon: <Plane className="h-12 w-12 text-primary" />,
    title: "Flight Operations Optimization",
    description: "Streamline flight operations through data-driven insights and custom software solutions.",
  },
  {
    icon: <Code className="h-12 w-12 text-primary" />,
    title: "Aviation Software Development",
    description: "Custom software solutions tailored to specific aviation challenges and requirements.",
  },
  {
    icon: <LineChart className="h-12 w-12 text-primary" />,
    title: "Performance Analysis",
    description: "Detailed analysis of aircraft performance data to improve efficiency and safety.",
  },
  {
    icon: <Cpu className="h-12 w-12 text-primary" />,
    title: "Avionics Integration",
    description: "Seamless integration of modern avionics systems with existing aircraft infrastructure.",
  },
  {
    icon: <Database className="h-12 w-12 text-primary" />,
    title: "Flight Data Management",
    description: "Comprehensive solutions for collecting, storing, and analyzing flight data.",
  },
  {
    icon: <Shield className="h-12 w-12 text-primary" />,
    title: "Safety Systems Implementation",
    description: "Implementation of advanced safety systems and protocols based on industry best practices.",
  },
]

export default function ServicesOffered() {
  return (
    <section id="services" className="w-full py-12 md:py-24 bg-muted/50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Consulting Services</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Specialized aviation technology consulting to help you overcome challenges and achieve your goals
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {services.map((service, index) => (
            <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-2">
                <div className="mb-4">{service.icon}</div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
