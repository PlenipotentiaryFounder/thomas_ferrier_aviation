"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Plane, Clock, Calendar, MapPin } from "lucide-react"

const aircraftCategories = [
  {
    category: "single-engine",
    title: "Single Engine",
    aircraft: [
      {
        model: "Cessna 172 Skyhawk",
        hours: 850,
        description: "The reliable workhorse of flight training",
        features: ["G1000 Glass Cockpit", "Analog Instruments", "IFR Certified"],
        firstFlown: "2011",
        recentFlight: "2023",
      },
      {
        model: "Piper PA-28 Cherokee",
        hours: 620,
        description: "Stable and forgiving low-wing aircraft",
        features: ["Complex Aircraft", "Retractable Gear", "Constant Speed Prop"],
        firstFlown: "2012",
        recentFlight: "2023",
      },
      {
        model: "Cirrus SR22",
        hours: 380,
        description: "Modern high-performance aircraft with CAPS",
        features: ["Perspective Avionics", "CAPS Parachute", "TKS Ice Protection"],
        firstFlown: "2015",
        recentFlight: "2023",
      },
      {
        model: "Diamond DA40",
        hours: 360,
        description: "Efficient and safe composite aircraft",
        features: ["G1000 Glass Cockpit", "Diesel Engine", "Low Fuel Consumption"],
        firstFlown: "2016",
        recentFlight: "2022",
      },
    ],
  },
  {
    category: "multi-engine",
    title: "Multi Engine",
    aircraft: [
      {
        model: "Beechcraft Baron 58",
        hours: 210,
        description: "Twin-engine piston aircraft with excellent performance",
        features: ["Multi-Engine", "Pressurized", "Weather Radar"],
        firstFlown: "2017",
        recentFlight: "2023",
      },
      {
        model: "Piper PA-44 Seminole",
        hours: 180,
        description: "Popular multi-engine training aircraft",
        features: ["Counter-Rotating Props", "T-Tail Design", "Training Focused"],
        firstFlown: "2016",
        recentFlight: "2022",
      },
    ],
  },
  {
    category: "turboprop",
    title: "Turboprop",
    aircraft: [
      {
        model: "Beechcraft King Air 250",
        hours: 120,
        description: "Versatile and reliable turboprop",
        features: ["Turboprop", "Pressurized", "High Altitude"],
        firstFlown: "2018",
        recentFlight: "2023",
      },
    ],
  },
]

export default function AircraftExperience() {
  return (
    <section className="w-full py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Aircraft Experience</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Detailed breakdown of my experience across various aircraft types and models.
          </p>
        </motion.div>

        <Tabs defaultValue="single-engine" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="single-engine">Single Engine</TabsTrigger>
              <TabsTrigger value="multi-engine">Multi Engine</TabsTrigger>
              <TabsTrigger value="turboprop">Turboprop</TabsTrigger>
            </TabsList>
          </div>

          {aircraftCategories.map((category) => (
            <TabsContent key={category.category} value={category.category} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.aircraft.map((aircraft, index) => (
                  <motion.div
                    key={aircraft.model}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card className="h-full border-border/50 hover:shadow-md transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Plane className="h-5 w-5 text-primary" />
                          {aircraft.model}
                        </CardTitle>
                        <CardDescription>{aircraft.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2 mb-4">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-lg font-semibold">{aircraft.hours}+ hours</span>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {aircraft.features.map((feature) => (
                            <Badge key={feature} variant="secondary">
                              {feature}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>First flown: {aircraft.firstFlown}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>Most recent flight: {aircraft.recentFlight}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
