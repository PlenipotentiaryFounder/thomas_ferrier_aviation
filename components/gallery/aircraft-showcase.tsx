"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plane, RotateCcw, ZoomIn, ZoomOut, Maximize2, Minimize2 } from "lucide-react"
import { cn } from "@/lib/utils"

// Sample aircraft data
const aircraft = [
  {
    id: "archer",
    name: "Piper Archer II",
    model: "/models/piper-archer.glb", // This would be a real 3D model in production
    description:
      "The Piper Archer II is a reliable single-engine aircraft perfect for training and cross-country flights.",
    specs: {
      engine: "Lycoming O-360-A4M, 180 HP",
      cruiseSpeed: "128 KTAS",
      range: "522 NM",
      seating: "4",
      ceiling: "14,100 ft",
    },
  },
  {
    id: "seminole",
    name: "Piper Seminole",
    model: "/models/piper-seminole.glb", // This would be a real 3D model in production
    description:
      "The Piper Seminole is a twin-engine aircraft used for multi-engine training and commercial operations.",
    specs: {
      engine: "2x Lycoming O-360-E1A6D, 180 HP each",
      cruiseSpeed: "162 KTAS",
      range: "700 NM",
      seating: "4",
      ceiling: "15,000 ft",
    },
  },
  {
    id: "diamond",
    name: "Diamond DA20",
    model: "/models/diamond-da20.glb", // This would be a real 3D model in production
    description: "The Diamond DA20 is a light, efficient aircraft ideal for primary flight training.",
    specs: {
      engine: "Continental IO-240-B3B, 125 HP",
      cruiseSpeed: "138 KTAS",
      range: "547 NM",
      seating: "2",
      ceiling: "13,120 ft",
    },
  },
]

export default function AircraftShowcase() {
  const [selectedAircraft, setSelectedAircraft] = useState(aircraft[0])
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleZoomIn = () => {
    if (zoom < 2) setZoom(zoom + 0.1)
  }

  const handleZoomOut = () => {
    if (zoom > 0.5) setZoom(zoom - 0.1)
  }

  const handleRotate = () => {
    setRotation(rotation + 45)
  }

  const toggleFullscreen = () => {
    if (!containerRef.current) return

    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-repeat opacity-5"></div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Aircraft Experience</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore the aircraft I've flown and instructed in with our interactive 3D models.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg overflow-hidden h-full">
              <CardContent className="p-0">
                <div ref={containerRef} className="relative aspect-video bg-black/5 dark:bg-white/5 rounded-t-lg">
                  {/* This would be a real 3D viewer in production */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="relative w-3/4 h-3/4 transition-all duration-300"
                      style={{
                        transform: `scale(${zoom}) rotate(${rotation}deg)`,
                      }}
                    >
                      <Plane className="w-full h-full text-primary/70" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-sm text-muted-foreground">[3D Model of {selectedAircraft.name}]</p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg">
                    <Button variant="ghost" size="icon" onClick={handleZoomOut} className="h-10 w-10">
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                    <div className="w-24 h-1 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-200"
                        style={{ width: `${((zoom - 0.5) * 100) / 1.5}%` }}
                      ></div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={handleZoomIn} className="h-10 w-10">
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                    <div className="w-px h-6 bg-border"></div>
                    <Button variant="ghost" size="icon" onClick={handleRotate} className="h-10 w-10">
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={toggleFullscreen} className="h-10 w-10">
                      {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{selectedAircraft.name}</h3>
                  <p className="text-muted-foreground mb-6">{selectedAircraft.description}</p>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                    <div className="space-y-1">
                      <p className="font-medium">Engine</p>
                      <p className="text-muted-foreground">{selectedAircraft.specs.engine}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">Cruise Speed</p>
                      <p className="text-muted-foreground">{selectedAircraft.specs.cruiseSpeed}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">Range</p>
                      <p className="text-muted-foreground">{selectedAircraft.specs.range}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">Seating</p>
                      <p className="text-muted-foreground">{selectedAircraft.specs.seating}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">Ceiling</p>
                      <p className="text-muted-foreground">{selectedAircraft.specs.ceiling}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="border-0 shadow-lg overflow-hidden h-full">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Select Aircraft</h3>
                <Tabs
                  defaultValue={selectedAircraft.id}
                  onValueChange={(value) => {
                    const selectedAircraftData = aircraft.find((a) => a.id === value)
                    if (selectedAircraftData) setSelectedAircraft(selectedAircraftData)
                  }}
                >
                  <TabsList className="w-full mb-6">
                    {aircraft.map((aircraft) => (
                      <TabsTrigger
                        key={aircraft.id}
                        value={aircraft.id}
                        className={cn(
                          "flex-1",
                          selectedAircraft.id === aircraft.id && "bg-primary text-primary-foreground",
                        )}
                      >
                        {aircraft.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {aircraft.map((aircraft) => (
                    <TabsContent key={aircraft.id} value={aircraft.id} className="space-y-4">
                      <Button
                        variant="outline"
                        className="w-full justify-start h-auto py-3 px-4"
                        onClick={() => setSelectedAircraft(aircraft)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-full bg-primary/10 mt-0.5">
                            <Plane className="h-5 w-5 text-primary" />
                          </div>
                          <div className="text-left">
                            <h4 className="font-medium mb-1">{aircraft.name}</h4>
                            <p className="text-xs text-muted-foreground line-clamp-2">{aircraft.description}</p>
                          </div>
                        </div>
                      </Button>
                    </TabsContent>
                  ))}
                </Tabs>

                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-medium mb-3">Flight Experience</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Piper Archer II</span>
                      <span className="font-medium">142.5 hours</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: "71%" }}></div>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Piper Seminole</span>
                      <span className="font-medium">45.2 hours</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "23%" }}></div>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Diamond DA20</span>
                      <span className="font-medium">12.7 hours</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: "6%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
