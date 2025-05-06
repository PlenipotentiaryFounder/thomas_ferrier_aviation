"use client"

import { Card, CardContent } from "@/components/ui/card"

const processSteps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We begin with a thorough assessment of your needs, challenges, and goals to understand the full scope of your project.",
  },
  {
    number: "02",
    title: "Analysis",
    description:
      "Detailed analysis of your current systems, processes, and requirements to identify opportunities for improvement.",
  },
  {
    number: "03",
    title: "Solution Design",
    description: "Development of customized solutions tailored to your specific aviation challenges and objectives.",
  },
  {
    number: "04",
    title: "Implementation",
    description: "Careful execution of the proposed solutions with regular check-ins and adjustments as needed.",
  },
  {
    number: "05",
    title: "Evaluation",
    description:
      "Comprehensive assessment of implemented solutions to ensure they meet your needs and deliver expected results.",
  },
]

export default function ProcessSection() {
  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">My Consulting Process</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              A structured approach to solving complex aviation challenges
            </p>
          </div>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border transform -translate-x-1/2 hidden md:block"></div>

          {/* Process steps */}
          <div className="space-y-12">
            {processSteps.map((step, index) => (
              <div key={index} className={`flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                <div className="md:w-1/2 flex justify-center items-start">
                  <Card className="border-0 shadow-lg w-full max-w-md">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mr-4">
                          {step.number}
                        </div>
                        <h3 className="text-xl font-bold">{step.title}</h3>
                      </div>
                      <p className="text-muted-foreground">{step.description}</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="md:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
