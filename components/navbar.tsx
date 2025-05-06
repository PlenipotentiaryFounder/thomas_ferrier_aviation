"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ModeToggle } from "./mode-toggle"
import { Menu, X, Plane } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

const navLinks = [
  { name: "About", href: "/about" },
  { name: "Certifications", href: "/certifications" },
  { name: "Experience", href: "/experience" },
  { name: "Logbook", href: "/logbook" },
  { name: "Gallery", href: "/gallery" },
  { name: "Projects", href: "/projects" },
  { name: "Consulting", href: "/consulting" },
  { name: "Contact", href: "/contact" },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const isMobile = useMobile()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500",
        isScrolled ? "bg-background/80 backdrop-blur-xl shadow-lg py-3" : "bg-transparent py-6",
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative w-10 h-10 flex items-center justify-center">
            <div className="absolute inset-0 bg-primary/20 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
            <Plane className="h-6 w-6 text-primary z-10 group-hover:rotate-12 transition-transform duration-300" />
          </div>
          <span className="font-bold text-xl tracking-tight">Thomas Ferrier</span>
        </Link>

        {isMobile ? (
          <>
            <div className="flex items-center space-x-2">
              <ModeToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
                className="relative"
              >
                <div className="absolute inset-0 bg-primary/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>

            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-full left-0 right-0 glass-effect border-t border-b border-border/50"
                >
                  <nav className="flex flex-col py-4 container mx-auto">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className={cn(
                          "px-4 py-4 transition-colors flex items-center space-x-2",
                          pathname === link.href ? "text-primary font-medium" : "hover:text-primary",
                        )}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span>{link.name}</span>
                        {pathname === link.href && (
                          <motion.div
                            layoutId="activeIndicatorMobile"
                            className="h-1 w-1 rounded-full bg-primary"
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </Link>
                    ))}
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <div className="flex items-center space-x-8">
            <nav className="flex space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 relative rounded-full transition-colors",
                    pathname === link.href ? "text-primary font-medium" : "hover:text-primary",
                  )}
                >
                  {pathname === link.href && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute inset-0 bg-primary/10 rounded-full"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              ))}
            </nav>
            <ModeToggle />
          </div>
        )}
      </div>
    </header>
  )
}
