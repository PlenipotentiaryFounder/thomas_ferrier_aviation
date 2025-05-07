"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plane, Calendar, Clock, MapPin, Cloud, Sun } from "lucide-react"

// Sample data - replace with actual flight data
const recentFlights = [
  {
    id: 1,
    date: "2023-04-15",
    aircraft: "Cessna 172S",
    from: "KPAO",
    to: "KSQL",
    duration: "1.2",
    conditions: "VFR",
    remarks: "Bay Tour with student pilot, practiced steep turns and slow flight",
    weather: "Clear",
  },
  {
    id: 2,
    date: "2023-04-10",
    aircraft: "Cirrus SR22",
    from: "KSJC",
    to: "KTVL",
    duration: "1.8",
    conditions: "IFR",
    remarks: "Cross country flight over Sierra Nevada mountains, filed IFR for mountain obscuration",
    weather: "IMC",
  },
  {
    id: 3,
    date: "2023-04-05",
    aircraft: "Piper PA-28",
    from: "KRHV",
    to: "KMRY",
    duration: "1.5",
    conditions: "VFR",
    remarks: "Coastal flight with student, practiced navigation and radio communications",
    weather: "Clear",
  },
  {
    id: 4,
    date: "2023-03-28",
    aircraft: "Beechcraft Baron 58",
    from: "KSJC",
    to: "KLAS",
    duration: "2.5",
    conditions: "IFR",
    remarks: "Multi-engine cross country, practiced engine-out procedures at altitude",
    weather: "Mixed",
  },
]

export default function RecentFlights() {
  return (
    <section className="w-full py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Recent Flights</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            A glimpse into my most recent aviation activities and flight experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {recentFlights.map((flight, index) => (
            <motion.div
              key={flight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="h-full border-border/50 hover:shadow-md transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Plane className="h-5 w-5 text-primary" />
                        {flight.aircraft}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(flight.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </CardDescription>
                    </div>
                    <Badge variant={flight.conditions === "IFR" ? "default" : "secondary"}>{flight.conditions}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{flight.from}</span>
                    </div>
                    <div className="flex-1 border-t border-dashed border-border/70 mx-2 relative">
                      <Plane className="h-3 w-3 absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 rotate-90" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{flight.to}</span>
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{flight.duration} hours</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {flight.weather === "Clear" ? (
                        <Sun className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Cloud className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span>{flight.weather}</span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">{flight.remarks}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
