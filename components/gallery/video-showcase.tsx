"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Play, X } from "lucide-react"
import Image from "next/image"

// Sample data - replace with actual videos
const videos = [
  {
    id: 1,
    title: "Mountain Flying Tutorial",
    description: "Tips and techniques for safely navigating mountainous terrain",
    thumbnail: "/placeholder.svg?height=600&width=800",
    duration: "12:45",
    date: "2023-03-15",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with actual video URL
  },
  {
    id: 2,
    title: "Instrument Approach Demonstration",
    description: "Step-by-step walkthrough of an ILS approach in challenging conditions",
    thumbnail: "/placeholder.svg?height=600&width=800",
    duration: "18:22",
    date: "2023-02-10",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with actual video URL
  },
  {
    id: 3,
    title: "Cross-Country Flight Vlog",
    description: "Join me on a scenic cross-country flight from KPAO to KTVL",
    thumbnail: "/placeholder.svg?height=600&width=800",
    duration: "24:18",
    date: "2023-01-05",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with actual video URL
  },
]

export default function VideoShowcase() {
  const [selectedVideo, setSelectedVideo] = useState<(typeof videos)[0] | null>(null)

  return (
    <section className="w-full py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Video Showcase</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Watch flight demonstrations, tutorials, and aviation adventures.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Dialog>
                <DialogTrigger asChild>
                  <Card className="h-full cursor-pointer hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="relative aspect-video w-full group" onClick={() => setSelectedVideo(video)}>
                        <Image
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.title}
                          fill
                          className="object-cover rounded-t-lg"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-primary/90 rounded-full p-3">
                            <Play className="h-8 w-8 text-white" fill="white" />
                          </div>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {video.duration}
                        </div>
                      </div>
                    </CardContent>
                    <CardHeader>
                      <CardTitle className="text-lg">{video.title}</CardTitle>
                      <CardDescription>{video.description}</CardDescription>
                      <CardDescription className="text-xs mt-2">
                        {new Date(video.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-4xl p-0 bg-background">
                  <div className="relative">
                    <div className="absolute top-2 right-2 z-10">
                      <button
                        onClick={() => setSelectedVideo(null)}
                        className="rounded-full bg-background/80 p-2 backdrop-blur-sm hover:bg-background/90 transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="aspect-video w-full">
                      <iframe
                        src={video.embedUrl}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full rounded-t-lg"
                      ></iframe>
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-bold">{video.title}</h3>
                      <p className="text-muted-foreground mt-2">{video.description}</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
