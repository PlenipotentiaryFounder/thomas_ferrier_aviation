import Hero from "@/components/home/hero"
import FeaturedSection from "@/components/home/featured-section"
import TestimonialsSection from "@/components/home/testimonials-section"
import ConsultingSection from "@/components/home/consulting-section"
import LatestFlights from "@/components/home/latest-flights"
import CallToAction from "@/components/home/call-to-action"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Thomas Ferrier | Aviation Professional",
  description: "Professional portfolio of Thomas Ferrier, Certified Flight Instructor and aviation innovator.",
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Hero />
      <FeaturedSection />
      <ConsultingSection />
      <TestimonialsSection />
      <LatestFlights />
      <CallToAction />
    </main>
  )
}
