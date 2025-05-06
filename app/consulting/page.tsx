import ConsultingHero from "@/components/consulting/consulting-hero"
import ServicesOffered from "@/components/consulting/services-offered"
import ProcessSection from "@/components/consulting/process-section"
import CaseStudies from "@/components/consulting/case-studies"
import ConsultingCTA from "@/components/consulting/consulting-cta"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Aviation Consulting | Thomas Ferrier",
  description:
    "Aviation technology consulting services specializing in innovative solutions for complex aviation challenges.",
}

export default function ConsultingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <ConsultingHero />
      <ServicesOffered />
      <ProcessSection />
      <CaseStudies />
      <ConsultingCTA />
    </main>
  )
}
