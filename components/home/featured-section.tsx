"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plane, Award, Zap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function FeaturedSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-repeat opacity-5"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Elevate Your Aviation Journey</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how my expertise in flight instruction and aviation technology can help you reach new heights.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <Card className="h-full border-0 shadow-lg overflow-hidden group">
              <CardContent className="p-0">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Flight Instruction"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-primary text-white">Flight Training</Badge>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Plane className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold">Flight Instruction</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Personalized flight training for all levels, from first-time flyers to advanced pilots seeking new
                    ratings.
                  </p>
                  <Button asChild variant="link" className="p-0 h-auto font-medium text-primary">
                    <Link href="/certifications" className="flex items-center">
                      Learn more
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="ml-1"
                      >
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="h-full border-0 shadow-lg overflow-hidden group">
              <CardContent className="p-0">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Aviation Technology"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-accent text-white">Innovation</Badge>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 rounded-full bg-accent/10">
                      <Zap className="h-5 w-5 text-accent" />
                    </div>
                    <h3 className="text-lg font-bold">Aviation Technology</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Cutting-edge projects that combine AI, data analytics, and aviation expertise to enhance safety and
                    training.
                  </p>
                  <Button asChild variant="link" className="p-0 h-auto font-medium text-accent">
                    <Link href="/projects" className="flex items-center">
                      Explore projects
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="ml-1"
                      >
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="h-full border-0 shadow-lg overflow-hidden group">
              <CardContent className="p-0">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Aviation Consulting"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-amber-500 text-white">Expertise</Badge>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 rounded-full bg-amber-500/10">
                      <Award className="h-5 w-5 text-amber-500" />
                    </div>
                    <h3 className="text-lg font-bold">Aviation Consulting</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Professional guidance for flight schools, aviation startups, and individuals navigating the aviation
                    industry.
                  </p>
                  <Button asChild variant="link" className="p-0 h-auto font-medium text-amber-500">
                    <Link href="/experience" className="flex items-center">
                      View services
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="ml-1"
                      >
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
