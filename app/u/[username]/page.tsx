import { notFound } from "next/navigation"
import { Metadata } from "next"
import HeroSection from "@/components/home/hero"
import FeaturedSection from "@/components/home/featured-section"
import TestimonialsSection from "@/components/home/testimonials-section"
import ConsultingSection from "@/components/home/consulting-section"
import LatestFlights from "@/components/home/latest-flights"
import CallToAction from "@/components/home/call-to-action"

// This would eventually fetch from database
const getUserData = async (username: string) => {
  // For now, only Thomas Ferrier is available as example
  if (username === "thomas-ferrier") {
    return {
      name: "Thomas Ferrier",
      title: "Certified Flight Instructor & Aviation Innovator",
      bio: "Professional portfolio of Thomas Ferrier, Certified Flight Instructor and aviation innovator.",
      theme: "neural-interface",
      isActive: true
    }
  }
  return null
}

interface UserPageProps {
  params: {
    username: string
  }
}

export async function generateMetadata({ params }: UserPageProps): Promise<Metadata> {
  const user = await getUserData(params.username)
  
  if (!user) {
    return {
      title: "User Not Found",
      description: "This aviation professional's portfolio could not be found."
    }
  }

  return {
    title: `${user.name} | Aviation Professional`,
    description: user.bio,
  }
}

export default async function UserPage({ params }: UserPageProps) {
  const user = await getUserData(params.username)

  if (!user || !user.isActive) {
    notFound()
  }

  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Apply user's theme here */}
      <div className={`w-full ${user.theme === 'neural-interface' ? 'neural-theme' : ''}`}>
        <HeroSection />
        <FeaturedSection />
        <ConsultingSection />
        <TestimonialsSection />
        <LatestFlights />
        <CallToAction />
      </div>
    </main>
  )
} 