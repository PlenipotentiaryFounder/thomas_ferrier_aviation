import GalleryHero from "@/components/gallery/gallery-hero"
import PhotoGallery from "@/components/gallery/photo-gallery"
import VideoShowcase from "@/components/gallery/video-showcase"
import AircraftShowcase from "@/components/gallery/aircraft-showcase"
import CallToAction from "@/components/shared/call-to-action"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Gallery | Thomas Ferrier Aviation",
  description: "Photos and videos from Thomas Ferrier's aviation experiences and flights.",
}

export default function GalleryPage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <GalleryHero />
      <PhotoGallery />
      <VideoShowcase />
      <AircraftShowcase />
      <CallToAction
        title="Want to create your own aviation memories?"
        description="Let's work together to make your aviation dreams a reality."
        primaryAction="Contact Me"
        primaryLink="/contact"
        secondaryAction="View My Projects"
        secondaryLink="/projects"
      />
    </main>
  )
}
