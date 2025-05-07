"use client"

import { Plane, Heart, ArrowUp, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative bg-secondary/80 pt-16 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-repeat opacity-5"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-6 group">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="absolute inset-0 bg-primary/20 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
                <Plane className="h-6 w-6 text-primary z-10 group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <span className="font-bold text-xl">Thomas Ferrier</span>
            </Link>
            <p className="text-muted-foreground text-sm sm:text-base mb-6">
              Certified Flight Instructor and aviation innovator based in Phoenix, Arizona. Passionate about flight
              education and pushing the boundaries of aviation technology.
            </p>
            <div className="flex space-x-4">
              <Button variant="outline" size="icon" className="rounded-full min-w-10 min-h-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
                <span className="sr-only">LinkedIn</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full min-w-10 min-h-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
                <span className="sr-only">GitHub</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full min-w-10 min-h-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
                <span className="sr-only">Instagram</span>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/certifications" className="text-muted-foreground hover:text-primary transition-colors">
                  Certifications
                </Link>
              </li>
              <li>
                <Link href="/experience" className="text-muted-foreground hover:text-primary transition-colors">
                  Experience
                </Link>
              </li>
              <li>
                <Link href="/logbook" className="text-muted-foreground hover:text-primary transition-colors">
                  Flight Logbook
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-muted-foreground hover:text-primary transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-muted-foreground hover:text-primary transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-muted-foreground hover:text-primary transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-muted-foreground hover:text-primary transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-primary mr-3 mt-0.5" />
                <a
                  href="mailto:thomas@ferrieraviation.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  thomas@ferrieraviation.com
                </a>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-primary mr-3 mt-0.5" />
                <a href="tel:+14805551234" className="text-muted-foreground hover:text-primary transition-colors">
                  (480) 555-1234
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5" />
                <span className="text-muted-foreground">
                  Phoenix, Arizona
                  <br />
                  Available at KFFZ, KCHD, KSDL
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/40 pt-8 pb-10 w-full flex flex-col sm:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground mb-4 sm:mb-0">
            &copy; {currentYear} Thomas Ferrier Aviation. All rights reserved.
          </div>

          <div className="flex items-center text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-3.5 w-3.5 mx-1 text-red-500" />
            <span>in Phoenix, Arizona</span>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <div className="fixed bottom-8 right-8 z-40">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: showScrollTop ? 1 : 0,
            scale: showScrollTop ? 1 : 0.8,
            pointerEvents: showScrollTop ? "auto" : "none",
          }}
          transition={{ duration: 0.2 }}
        >
          <Button
            size="icon"
            className="bg-primary/90 hover:bg-primary shadow-lg"
            onClick={scrollToTop}
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </footer>
  )
}
