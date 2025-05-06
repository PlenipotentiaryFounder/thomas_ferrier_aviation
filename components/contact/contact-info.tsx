"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Mail, Phone, MapPin, Linkedin, Github, Instagram } from "lucide-react"

export default function ContactInfo() {
  return (
    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
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
                <a href="tel:+14805551234" className="text-muted-foreground hover:text-green-500 transition-colors">
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
                <p className="text-sm text-muted-foreground mt-1">Available for instruction at KFFZ, KCHD, KSDL</p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <h4 className="font-medium text-lg mb-4">Connect with me</h4>
            <div className="flex gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-3 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-800/50 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800/50 dark:text-gray-400 dark:hover:bg-gray-700/50 transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-3 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200 dark:bg-pink-900/30 dark:text-pink-400 dark:hover:bg-pink-800/50 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-border">
            <h4 className="font-medium text-lg mb-4">Office Hours</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Monday - Friday</span>
                <span>8:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Saturday</span>
                <span>9:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sunday</span>
                <span>Closed</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
