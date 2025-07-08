import PlatformHero from "@/components/platform/platform-hero"
import ServicesSection from "@/components/platform/services-section"
import ShowcaseSection from "@/components/platform/showcase-section"
import TestimonialsSection from "@/components/platform/testimonials-section"
import ProcessSection from "@/components/platform/process-section"
import PricingPreview from "@/components/platform/pricing-preview"
import CallToAction from "@/components/shared/call-to-action"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Custom Aviation Websites | Professional Pilot Portfolios",
  description: "Get a stunning, custom aviation website that showcases your expertise and gets you hired. Professional portfolio websites designed specifically for pilots and aviation professionals.",
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <PlatformHero />
      <ServicesSection />
      <ShowcaseSection />
      <ProcessSection />
      <TestimonialsSection />
      <PricingPreview />
      <CallToAction
        title="Ready to elevate your aviation career?"
        description="Join the pilots who are getting hired faster with professional, custom-built websites that showcase their expertise."
        primaryAction="Start Your Custom Website"
        primaryLink="/contact"
        secondaryAction="View Live Demo"
        secondaryLink="/demo"
      />
    </main>
  )
}
