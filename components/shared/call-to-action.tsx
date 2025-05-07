"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"

interface CallToActionProps {
  title: string
  description: string
  primaryAction: string
  primaryLink: string
  secondaryAction: string
  secondaryLink: string
  bgColor?: "primary" | "secondary" | "accent" | "none"
}

export default function CallToAction({
  title,
  description,
  primaryAction,
  primaryLink,
  secondaryAction,
  secondaryLink,
  bgColor = "secondary",
}: CallToActionProps) {
  return (
    <section className={`w-full py-20 ${bgColor !== "none" ? `bg-${bgColor}/10` : ""}`}>
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">{title}</h2>
            <p className="max-w-[600px] text-muted-foreground text-lg md:text-xl/relaxed">
              {description}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 lg:justify-end"
          >
            <Button asChild size="lg" className="group relative overflow-hidden">
              <Link href={primaryLink}>
                <span className="relative z-10">{primaryAction}</span>
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={secondaryLink}>{secondaryAction}</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
