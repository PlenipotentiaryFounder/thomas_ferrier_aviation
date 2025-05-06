"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Clock, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Sample data - in a real app, this would come from an API or database
const latestFlights = [
  {
    id: 1,
    date: "2025-04-21",
    aircraft: "Piper Archer II",
    route: "KFFZ-KFFZ",
    duration: "2.0",
    type: "Training",
    image: "/placeholder.svg?height=300&width=500",
    description: "CFI Initial checkride - Successfully completed and passed the Certified Flight Instructor checkride.",
  },
  {
    id: 2,
    date: "2025-04-19",
    aircraft: "Diamond DA20",
    route: "KFFZ-KFFZ",
    duration: "1.8",
    type: "Training",
    image: "/placeholder.svg?height=300&width=500",
    description: "Spin training - Practiced recovery techniques from various spin configurations.",
  },
  {
    id: 3,
    date: "2025-04-16",
    aircraft: "Piper Archer III",
    route: "KFFZ-KFFZ",
    duration: "2.0",
    type: "Training",
    image: "/placeholder.svg?height=300&width=500",
    description: "CFI preparation - Final preparation for the upcoming CFI checkride.",
  },
]

export default function LatestFlights() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-repeat opacity-5"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Flights</h2>
            <p className="text-xl text-muted-foreground max-w-2xl">
              A glimpse into my recent aviation activities and flight experiences.
            </p>
          </div>
          <Button asChild className="mt-4 md:mt-0">
            <Link href="/logbook">View Full Logbook</Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestFlights.map((flight, index) => (
            <div key={flight.id}>
              <Card className="h-full border-0 shadow-lg overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={flight.image || "/placeholder.svg"}
                    alt={`Flight on ${flight.date}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge
                      className={flight.type === "Training" ? "bg-blue-500 text-white" : "bg-green-500 text-white"}
                    >
                      {flight.type}
                    </Badge>
                  </div>
                </div>
                <CardContent>
                  <h3 className="text-xl font-semibold mt-4">{flight.aircraft}</h3>
                  <p className="text-muted-foreground mt-2">{flight.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-sm mt-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{flight.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{flight.duration} hrs</span>
                    </div>
                    <div className="flex items-center gap-1.5 col-span-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{flight.route}</span>
                    </div>
                  </div>
                  <Button asChild variant="link" className="p-0 h-auto font-medium text-primary mt-4">
                    <Link href={`/logbook#flight-${flight.id}`} className="flex items-center">
                      View details
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
