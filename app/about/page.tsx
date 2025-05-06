import AboutHero from "@/components/about/about-hero"
import AboutContent from "@/components/about/about-content"
import Values from "@/components/about/values"
import Stats from "@/components/about/stats"
import CallToAction from "@/components/shared/call-to-action"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About | Thomas Ferrier Aviation",
  description: "Learn about Thomas Ferrier, Certified Flight Instructor and aviation innovator.",
}

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <AboutHero />
      <AboutContent />
      <Values />
      <Stats />
      <CallToAction
        title="Ready to start your aviation journey?"
        description="Whether you're looking to earn your pilot's license or advance your aviation career, I'm here to help."
        primaryAction="Schedule a Discovery Flight"
        primaryLink="/contact"
        secondaryAction="View My Qualifications"
        secondaryLink="/certifications"
      />
    </main>
  )
}
