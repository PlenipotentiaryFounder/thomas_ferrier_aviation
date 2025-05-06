"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What are your rates for flight instruction?",
    answer:
      "My instruction rates are $75 per hour for ground instruction and $95 per hour for flight instruction. Aircraft rental is additional and varies by type. Please contact me for a detailed rate sheet and package options.",
  },
  {
    question: "Do you offer discovery flights for beginners?",
    answer:
      "Yes! I offer discovery flights for those interested in experiencing flight or considering pilot training. These introductory flights typically last about an hour and include a pre-flight briefing, hands-on flying experience, and post-flight discussion.",
  },
  {
    question: "Which airports do you operate from?",
    answer:
      "I primarily instruct at Falcon Field Airport (KFFZ), Chandler Municipal Airport (KCHD), and Scottsdale Airport (KSDL) in the Phoenix metropolitan area. I can also arrange instruction at other airports in Arizona upon request.",
  },
  {
    question: "How long does it take to get a private pilot license?",
    answer:
      "The time required varies based on how frequently you train and your individual progress. On average, it takes 3-6 months when training 2-3 times per week. The FAA minimum is 40 flight hours, but the national average is closer to 60-70 hours.",
  },
  {
    question: "Do you offer consulting services for aviation technology projects?",
    answer:
      "Yes, I provide consulting services for aviation technology projects, particularly those involving flight training innovations, safety systems, and AI applications in aviation. Please contact me with details about your project for a consultation.",
  },
  {
    question: "Can you help with advanced ratings and endorsements?",
    answer:
      "Absolutely. I specialize in helping pilots advance their skills and certifications, including instrument ratings, commercial licenses, and various endorsements such as complex, high-performance, and tailwheel aircraft.",
  },
]

export default function FAQ() {
  return (
    <section className="py-16 relative overflow-hidden bg-secondary/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Find answers to common questions about flight instruction, services, and more.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
