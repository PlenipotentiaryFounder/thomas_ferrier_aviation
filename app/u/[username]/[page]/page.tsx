import { notFound } from "next/navigation"
import { Metadata } from "next"

interface UserSubPageProps {
  params: {
    username: string
    page: string
  }
}

export async function generateMetadata({ params }: UserSubPageProps): Promise<Metadata> {
  return {
    title: `${params.page} | ${params.username}`,
    description: `${params.page} page for ${params.username}`,
  }
}

export default async function UserSubPage({ params }: UserSubPageProps) {
  // Simple fallback for Thomas Ferrier for now
  if (params.username !== 'thomas-ferrier') {
    notFound()
  }

  const allowedPages = ['about', 'experience', 'certifications', 'contact', 'logbook', 'gallery', 'projects']
  if (!allowedPages.includes(params.page)) {
    notFound()
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">{params.page.charAt(0).toUpperCase() + params.page.slice(1)}</h1>
        <p className="text-xl text-muted-foreground">Thomas Ferrier - {params.page}</p>
        <p className="text-lg">Dynamic subpage routing is working!</p>
        <div className="mt-8 space-x-4">
          <a href={`/u/${params.username}`} className="text-primary underline">← Back to Home</a>
          <a href={`/u/${params.username}/about`} className="text-primary underline">About</a>
          <a href={`/u/${params.username}/experience`} className="text-primary underline">Experience</a>
          <a href={`/u/${params.username}/contact`} className="text-primary underline">Contact</a>
        </div>
      </div>
    </main>
  )
} 