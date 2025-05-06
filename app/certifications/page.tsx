import CertificationsHero from "@/components/certifications/certifications-hero"
import CertificationsList from "@/components/certifications/certifications-list"
import EndorsementsSection from "@/components/certifications/endorsements-section"
import Timeline from "@/components/certifications/timeline"
import CallToAction from "@/components/shared/call-to-action"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Certifications | Thomas Ferrier Aviation",
  description: "FAA certifications and ratings earned by Thomas Ferrier, aviation professional.",
}

export default function CertificationsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <CertificationsHero />
      <CertificationsList />
      <EndorsementsSection />
      <Timeline />
      <CallToAction
        title="Want to learn more about flight training?"
        description="I can help you navigate the path to earning your own certifications and ratings."
        primaryAction="Contact Me"
        primaryLink="/contact"
        secondaryAction="View My Experience"
        secondaryLink="/experience"
      />
    </main>
  )
}
