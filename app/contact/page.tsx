import ContactHero from "@/components/contact/contact-hero"
import ContactForm from "@/components/contact/contact-form"
import ContactInfo from "@/components/contact/contact-info"
import FAQ from "@/components/contact/faq"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact | Thomas Ferrier Aviation",
  description: "Get in touch with Thomas Ferrier for flight instruction, consulting, or collaboration.",
}

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <ContactHero />
      <div className="container grid md:grid-cols-2 gap-12 py-16">
        <ContactForm />
        <ContactInfo />
      </div>
      <FAQ />
    </main>
  )
}
