"use client"

import type React from "react"
import { useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Mail, MapPin, Linkedin, Github, Instagram, Send, CheckCircle, Phone } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // NOTE: In production, this would submit to a Supabase function or API route
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormState({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  return (
    <section id="contact" className="relative py-32 overflow-hidden" ref={sectionRef}>
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-secondary/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-background to-transparent"></div>
        <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-repeat opacity-5"></div>

        <motion.div
          style={{ y, opacity }}
          className="absolute -right-64 top-64 w-[40rem] h-[40rem] rounded-full bg-primary/5 blur-3xl"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]), opacity }}
          className="absolute -left-64 bottom-64 w-[30rem] h-[30rem] rounded-full bg-accent/5 blur-3xl"
        />
      </div>

      <div className="section-container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="section-title relative inline-block">
            Get In Touch
            <motion.div
              className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 h-1 bg-primary"
              initial={{ width: 0 }}
              whileInView={{ width: "50%" }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-6">
            Have a question or want to work together? Reach out and let's connect.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="border-0 shadow-lg overflow-hidden h-full">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20">
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Feel free to reach out through any of these channels</CardDescription>
              </CardHeader>

              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-medium text-lg">Email</h4>
                      <a
                        href="mailto:thomas@ferrieraviation.com"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        thomas@ferrieraviation.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-green-500/10 text-green-500">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-medium text-lg">Phone</h4>
                      <a
                        href="tel:+14805551234"
                        className="text-muted-foreground hover:text-green-500 transition-colors"
                      >
                        (480) 555-1234
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-amber-500/10 text-amber-500">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-medium text-lg">Location</h4>
                      <p className="text-muted-foreground">Phoenix, Arizona</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Available for instruction at KFFZ, KCHD, KSDL
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <h4 className="font-medium text-lg mb-4">Connect with me</h4>
                  <div className="flex gap-4">
                    <SocialButton icon={<Linkedin className="h-5 w-5" />} href="https://linkedin.com" color="blue" />
                    <SocialButton icon={<Github className="h-5 w-5" />} href="https://github.com" color="gray" />
                    <SocialButton icon={<Instagram className="h-5 w-5" />} href="https://instagram.com" color="pink" />
                  </div>
                </div>
              </CardContent>

              <CardFooter className="bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 py-4 px-6">
                <p className="text-sm text-muted-foreground">Response time: Usually within 24 hours</p>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="border-0 shadow-lg overflow-hidden h-full">
              <CardHeader className="bg-gradient-to-r from-accent/5 to-accent/10 dark:from-accent/10 dark:to-accent/20">
                <CardTitle>Send a Message</CardTitle>
                <CardDescription>Fill out the form below and I'll get back to you as soon as possible</CardDescription>
              </CardHeader>

              <CardContent className="p-6">
                {isSubmitted ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6">
                    <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                      <CheckCircle className="h-8 w-8 text-green-500" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground mb-6">
                      Thank you for reaching out. I'll get back to you as soon as possible.
                    </p>
                    <Button onClick={() => setIsSubmitted(false)}>Send Another Message</Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          required
                          className="border-input/60 focus-visible:ring-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formState.email}
                          onChange={handleChange}
                          required
                          className="border-input/60 focus-visible:ring-primary"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        required
                        className="border-input/60 focus-visible:ring-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formState.message}
                        onChange={handleChange}
                        required
                        className="border-input/60 focus-visible:ring-primary resize-none"
                      />
                    </div>

                    <Button type="submit" className="w-full bg-accent hover:bg-accent/90" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="h-4 w-4" />
                          Send Message
                        </span>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function SocialButton({
  icon,
  href,
  color = "blue",
}: {
  icon: React.ReactNode
  href: string
  color?: "blue" | "gray" | "pink"
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Social media link"
      className={cn(
        "p-3 rounded-full transition-transform hover:scale-110",
        color === "blue" &&
          "bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-800/50",
        color === "gray" &&
          "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800/50 dark:text-gray-400 dark:hover:bg-gray-700/50",
        color === "pink" &&
          "bg-pink-100 text-pink-600 hover:bg-pink-200 dark:bg-pink-900/30 dark:text-pink-400 dark:hover:bg-pink-800/50",
      )}
    >
      {icon}
    </a>
  )
}
