"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { X, ChevronLeft, ChevronRight, Expand, Filter } from "lucide-react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// NOTE: In production, these would be fetched from Supabase Storage
const galleryImages = [
  {
    id: 1,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Piper Archer on ramp",
    tags: ["Training", "Aircraft"],
  },
  {
    id: 2,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Sunset approach to Phoenix",
    tags: ["Scenery", "Night"],
  },
  {
    id: 3,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Cockpit view during cruise",
    tags: ["Cockpit", "Instruments"],
  },
  {
    id: 4,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Student pilot training session",
    tags: ["Training", "Students"],
  },
  {
    id: 5,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Aerial view of Grand Canyon",
    tags: ["Scenery", "Cross-Country"],
  },
  {
    id: 6,
    src: "/placeholder.svg?height=600&width=800",
    alt: "Pre-flight inspection",
    tags: ["Aircraft", "Safety"],
  },
]

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const allTags = Array.from(new Set(galleryImages.flatMap((img) => img.tags))).sort()

  const filteredImages = selectedTag ? galleryImages.filter((img) => img.tags.includes(selectedTag)) : galleryImages

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  }

  const handlePrevImage = () => {
    if (selectedImage === null) return

    const currentIndex = galleryImages.findIndex((img) => img.id === selectedImage)
    const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length
    setSelectedImage(galleryImages[prevIndex].id)
  }

  const handleNextImage = () => {
    if (selectedImage === null) return

    const currentIndex = galleryImages.findIndex((img) => img.id === selectedImage)
    const nextIndex = (currentIndex + 1) % galleryImages.length
    setSelectedImage(galleryImages[nextIndex].id)
  }

  return (
    <section id="gallery" className="relative py-32 overflow-hidden" ref={sectionRef}>
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-secondary/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-secondary/50 to-transparent"></div>
        <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-repeat opacity-5"></div>

        <motion.div
          style={{ y, opacity }}
          className="absolute -right-64 top-64 w-[40rem] h-[40rem] rounded-full bg-amber-500/5 blur-3xl"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]), opacity }}
          className="absolute -left-64 bottom-64 w-[30rem] h-[30rem] rounded-full bg-blue-500/5 blur-3xl"
        />
      </div>

      <div className="section-container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="section-title relative inline-block">
            Gallery
            <motion.div
              className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 h-1 bg-primary"
              initial={{ width: 0 }}
              whileInView={{ width: "50%" }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-6">
            Visual journey through aviation experiences and aircraft.
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-4 sm:mb-0"
          >
            <div className="p-2 rounded-full bg-amber-500/10">
              <Filter className="h-5 w-5 text-amber-500" />
            </div>
            <h3 className="text-xl font-semibold">Filter by Category</h3>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          <Button
            variant={selectedTag === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedTag(null)}
            className={selectedTag === null ? "bg-primary text-white" : ""}
          >
            All
          </Button>
          {allTags.map((tag) => (
            <Button
              key={tag}
              variant={selectedTag === tag ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTag(tag)}
              className={selectedTag === tag ? "bg-primary text-white" : ""}
            >
              {tag}
            </Button>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={container}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredImages.map((image) => (
            <motion.div key={image.id} variants={item}>
              <Card
                className="overflow-hidden cursor-pointer card-hover border-0 shadow-lg"
                onClick={() => setSelectedImage(image.id)}
              >
                <CardContent className="p-0 relative group">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        variant="outline"
                        size="icon"
                        className="bg-black/20 border-white/20 text-white hover:bg-black/40"
                      >
                        <Expand className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-medium mb-2">{image.alt}</h3>
                    <div className="flex flex-wrap gap-1">
                      {image.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
            <div className="absolute top-4 right-4 flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="text-white border-white/20 hover:bg-white/10"
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white border-white/20 hover:bg-white/10"
              onClick={handlePrevImage}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <div className="max-w-5xl max-h-[80vh] relative">
              {galleryImages.find((img) => img.id === selectedImage) && (
                <>
                  <Image
                    src={galleryImages.find((img) => img.id === selectedImage)!.src || "/placeholder.svg"}
                    alt={galleryImages.find((img) => img.id === selectedImage)!.alt}
                    width={1200}
                    height={800}
                    className="max-h-[80vh] w-auto object-contain rounded-lg"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                    <h3 className="text-xl font-medium mb-2">
                      {galleryImages.find((img) => img.id === selectedImage)!.alt}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {galleryImages
                        .find((img) => img.id === selectedImage)!
                        .tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="border-white/30 text-white">
                            {tag}
                          </Badge>
                        ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white border-white/20 hover:bg-white/10"
              onClick={handleNextImage}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
