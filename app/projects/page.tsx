import ProjectsHero from "@/components/projects/projects-hero"
import FeaturedProjects from "@/components/projects/featured-projects"
import TechnologyStack from "@/components/projects/technology-stack"
import ResearchSection from "@/components/projects/research-section"
import CallToAction from "@/components/shared/call-to-action"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Projects | Thomas Ferrier Aviation",
  description: "Innovative aviation technology projects and research by Thomas Ferrier.",
}

export default function ProjectsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <ProjectsHero />
      <FeaturedProjects />
      <TechnologyStack />
      <ResearchSection />
      <CallToAction
        title="Interested in collaborating on a project?"
        description="I'm always looking for new opportunities to innovate in aviation."
        primaryAction="Let's Connect"
        primaryLink="/contact"
        secondaryAction="Contact Me"
        secondaryLink="/contact"
      />
    </main>
  )
}
