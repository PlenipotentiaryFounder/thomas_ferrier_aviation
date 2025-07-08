import { notFound } from "next/navigation"
import { Metadata } from "next"

interface UserPageProps {
  params: {
    username: string
  }
}

export async function generateMetadata({ params }: UserPageProps): Promise<Metadata> {
  return {
    title: `${params.username} | Aviation Professional`,
    description: `Professional aviation portfolio of ${params.username}`,
  }
}

export default async function UserPage({ params }: UserPageProps) {
  // Simple fallback for Thomas Ferrier for now
  if (params.username !== 'thomas-ferrier') {
    notFound()
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Thomas Ferrier</h1>
        <p className="text-xl text-muted-foreground">Certified Flight Instructor & Aviation Innovator</p>
        <p className="text-lg">Dynamic user routing is working!</p>
        <div className="mt-8 space-x-4">
          <a href={`/u/${params.username}/about`} className="text-primary underline">About</a>
          <a href={`/u/${params.username}/experience`} className="text-primary underline">Experience</a>
          <a href={`/u/${params.username}/contact`} className="text-primary underline">Contact</a>
        </div>
      </div>
    </main>
  )
} 