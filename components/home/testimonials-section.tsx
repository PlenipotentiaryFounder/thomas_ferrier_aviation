"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "Thomas is an exceptional flight instructor. His patience, knowledge, and ability to explain complex concepts made my journey to becoming a private pilot smooth and enjoyable.",
    author: "Michael Johnson",
    role: "Private Pilot Student",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    quote:
      "Working with Thomas on our aviation safety app was a game-changer. His deep understanding of both aviation and technology brought invaluable insights to our project.",
    author: "Sarah Williams",
    role: "CEO, AeroTech Solutions",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    quote:
      "Thomas's approach to flight instruction is methodical and thorough. He not only taught me how to fly but instilled a deep respect for aviation safety that I carry with me on every flight.",
    author: "David Chen",
    role: "Commercial Pilot",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    quote:
      "The FlyRight.AI platform developed by Thomas has revolutionized how we train our student pilots. The AI-powered feedback has significantly improved learning outcomes.",
    author: "Jennifer Lopez",
    role: "Chief Flight Instructor, Southwest Aviation Academy",
    avatar: "/placeholder.svg?height=100&width=100",
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-secondary/50">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-repeat opacity-5"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What People Are Saying</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Hear from students, colleagues, and clients about their experiences working with me.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index}>
              <Card className="h-full border-0 shadow-lg overflow-hidden">
                <CardContent className="p-8 relative">
                  <Quote className="absolute top-6 right-6 h-12 w-12 text-primary/10" />
                  <p className="text-lg mb-6 relative z-10">{testimonial.quote}</p>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 border-2 border-primary/20">
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.author} />
                      <AvatarFallback>{testimonial.author[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{testimonial.author}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
