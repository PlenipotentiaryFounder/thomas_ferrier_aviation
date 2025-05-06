"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import Image from "next/image"

// Sample data - replace with actual images
const categories = [
  {
    id: "aircraft",
    name: "Aircraft",
    photos: [
      {
        id: 1,
        src: "/placeholder.svg?height=600&width=800",
        alt: "Cessna 172 on the ramp",
        caption: "Cessna 172 ready for departure at sunset",
      },
      {
        id: 2,
        src: "/placeholder.svg?height=600&width=800",
        alt: "Cirrus SR22 cockpit",
        caption: "Cirrus SR22 glass cockpit during cruise flight",
      },
      {
        id: 3,
        src: "/placeholder.svg?height=600&width=800",
        alt: "Piper Cherokee",
        caption: "Piper Cherokee on final approach",
      },
      {
        id: 4,
        src: "/placeholder.svg?height=600&width=800",
        alt: "Beechcraft Baron",
        caption: "Beechcraft Baron on the tarmac",
      },
    ],
  },
  {
    id: "scenery",
    name: "Aerial Scenery",
    photos: [
      {
        id: 5,
        src: "/placeholder.svg?height=600&width=800",
        alt: "Mountain range from above",
        caption: "Sierra Nevada mountains at 12,000 feet",
      },
      {
        id: 6,
        src: "/placeholder.svg?height=600&width=800",
        alt: "Coastal flight",
        caption: "California coastline during a cross-country flight",
      },
      {
        id: 7,
        src: "/placeholder.svg?height=600&width=800",
        alt: "Sunset from cockpit",
        caption: "Sunset view from 8,000 feet",
      },
      {
        id: 8,
        src: "/placeholder.svg?height=600&width=800",
        alt: "City lights at night",
        caption: "San Francisco Bay Area during a night flight",
      },
    ],
  },
  {
    id: "instruction",
    name: "Flight Instruction",
    photos: [
      {
        id: 9,
        src: "/placeholder.svg?height=600&width=800",
        alt: "Student pilot training",
        caption: "Preflight briefing with a student pilot",
      },
      {
        id: 10,
        src: "/placeholder.svg?height=600&width=800",
        alt: "Instrument training",
        caption: "Instrument approach training in simulated conditions",
      },
      {
        id: 11,
        src: "/placeholder.svg?height=600&width=800",
        alt: "Ground school",
        caption: "Explaining aerodynamics during ground school",
      },
      {
        id: 12,
        src: "/placeholder.svg?height=600&width=800",
        alt: "First solo celebration",
        caption: "Celebrating a student's first solo flight",
      },
    ],
  },
]

export default function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<{
    photo: (typeof categories)[0]["photos"][0]
    categoryIndex: number
    photoIndex: number
  } | null>(null)

  const handleNext = () => {
    if (!selectedPhoto) return

    const { categoryIndex, photoIndex } = selectedPhoto
    const category = categories[categoryIndex]

    if (photoIndex < category.photos.length - 1) {
      // Next photo in same category
      setSelectedPhoto({
        photo: category.photos[photoIndex + 1],
        categoryIndex,
        photoIndex: photoIndex + 1,
      })
    } else if (categoryIndex < categories.length - 1) {
      // First photo in next category
      setSelectedPhoto({
        photo: categories[categoryIndex + 1].photos[0],
        categoryIndex: categoryIndex + 1,
        photoIndex: 0,
      })
    }
  }

  const handlePrevious = () => {
    if (!selectedPhoto) return

    const { categoryIndex, photoIndex } = selectedPhoto

    if (photoIndex > 0) {
      // Previous photo in same category
      setSelectedPhoto({
        photo: categories[categoryIndex].photos[photoIndex - 1],
        categoryIndex,
        photoIndex: photoIndex - 1,
      })
    } else if (categoryIndex > 0) {
      // Last photo in previous category
      const prevCategory = categories[categoryIndex - 1]
      setSelectedPhoto({
        photo: prevCategory.photos[prevCategory.photos.length - 1],
        categoryIndex: categoryIndex - 1,
        photoIndex: prevCategory.photos.length - 1,
      })
    }
  }

  return (
    <section className="w-full py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Photo Gallery</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A collection of photographs capturing memorable moments from my aviation journey.
          </p>
        </motion.div>

        <Tabs defaultValue="aircraft" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList>
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categories.map((category, categoryIndex) => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.photos.map((photo, photoIndex) => (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: photoIndex * 0.1 }}
                  >
                    <Dialog>
                      <DialogTrigger asChild>
                        <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 h-full">
                          <CardContent className="p-0">
                            <div className="relative aspect-[4/3] w-full">
                              <Image
                                src={photo.src || "/placeholder.svg"}
                                alt={photo.alt}
                                fill
                                className="object-cover transition-transform duration-300 hover:scale-105"
                                onClick={() => setSelectedPhoto({ photo, categoryIndex, photoIndex })}
                              />
                            </div>
                            <div className="p-4">
                              <p className="text-sm text-muted-foreground">{photo.caption}</p>
                            </div>
                          </CardContent>
                        </Card>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
                        <div className="relative">
                          <div className="absolute top-2 right-2 z-10">
                            <button
                              onClick={() => setSelectedPhoto(null)}
                              className="rounded-full bg-background/80 p-2 backdrop-blur-sm hover:bg-background/90 transition-colors"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </div>
                          <div className="relative aspect-[4/3] w-full">
                            <Image
                              src={photo.src || "/placeholder.svg"}
                              alt={photo.alt}
                              fill
                              className="object-contain rounded-lg"
                            />
                          </div>
                          <div className="absolute inset-y-0 left-4 flex items-center">
                            <button
                              onClick={handlePrevious}
                              className="rounded-full bg-background/80 p-2 backdrop-blur-sm hover:bg-background/90 transition-colors"
                            >
                              <ChevronLeft className="h-5 w-5" />
                            </button>
                          </div>
                          <div className="absolute inset-y-0 right-4 flex items-center">
                            <button
                              onClick={handleNext}
                              className="rounded-full bg-background/80 p-2 backdrop-blur-sm hover:bg-background/90 transition-colors"
                            >
                              <ChevronRight className="h-5 w-5" />
                            </button>
                          </div>
                          <div className="absolute bottom-4 left-0 right-0 text-center">
                            <div className="inline-block bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full">
                              <p className="text-sm">{photo.caption}</p>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
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
