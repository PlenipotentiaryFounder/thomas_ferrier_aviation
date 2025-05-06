import ExperienceHero from "@/components/experience/experience-hero"
import WorkExperience from "@/components/experience/work-experience"
import Education from "@/components/experience/education"
import Skills from "@/components/experience/skills"
import CallToAction from "@/components/shared/call-to-action"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Experience | Thomas Ferrier Aviation",
  description: "Professional experience and education of Thomas Ferrier, aviation professional.",
}

export default function ExperiencePage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <ExperienceHero />
      <WorkExperience />
      <Education />
      <Skills />
      <CallToAction
        title="Interested in working together?"
        description="Let's discuss how my experience can benefit your aviation goals."
        primaryAction="Get In Touch"
        primaryLink="/contact"
        secondaryAction="View My Flight Logbook"
        secondaryLink="/logbook"
      />
    </main>
  )
}
