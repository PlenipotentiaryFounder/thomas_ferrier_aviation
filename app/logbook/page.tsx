import LogbookHero from "@/components/logbook/logbook-hero"
import FlightStats from "@/components/logbook/flight-stats"
import FlightCharts from "@/components/logbook/flight-charts"
import RecentFlights from "@/components/logbook/recent-flights"
import AircraftExperience from "@/components/logbook/aircraft-experience"
import CallToAction from "@/components/shared/call-to-action"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Flight Logbook | Thomas Ferrier Aviation",
  description: "Detailed flight experience and logbook of Thomas Ferrier, aviation professional.",
}

export default function LogbookPage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <LogbookHero />
      <FlightStats />
      <FlightCharts />
      <AircraftExperience />
      <RecentFlights />
      <CallToAction
        title="Ready to take to the skies?"
        description="Book a flight lesson or discovery flight with me today."
        primaryAction="Schedule Now"
        primaryLink="/contact"
        secondaryAction="View My Gallery"
        secondaryLink="/gallery"
      />
    </main>
  )
}
