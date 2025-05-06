"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Clock, Calendar, Plane, BarChart3, PieChart, Activity, Download, Filter, FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  PieChart as RechartsPie,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts"
import { cn } from "@/lib/utils"

// NOTE: This would be fetched from Supabase in production
// Sample data based on the CSV
const flightData = {
  totalHours: 200.4,
  picHours: 124.3,
  totalFlights: 131,
  lastFlight: "2025-04-21",
  aircraftTypes: [
    { name: "Piper Archer II", hours: 142.5, color: "#3b82f6" },
    { name: "Piper Seminole", hours: 45.2, color: "#10b981" },
    { name: "Diamond DA20", hours: 12.7, color: "#f59e0b" },
  ],
  monthlyHours: [
    { month: "May '24", hours: 12.5 },
    { month: "Jun '24", hours: 15.8 },
    { month: "Jul '24", hours: 18.2 },
    { month: "Aug '24", hours: 22.1 },
    { month: "Sep '24", hours: 19.5 },
    { month: "Oct '24", hours: 24.3 },
    { month: "Nov '24", hours: 20.7 },
    { month: "Dec '24", hours: 16.9 },
    { month: "Jan '25", hours: 14.2 },
    { month: "Feb '25", hours: 12.8 },
    { month: "Mar '25", hours: 11.5 },
    { month: "Apr '25", hours: 11.9 },
  ],
  experienceBreakdown: [
    { name: "PIC", value: 124.3, color: "#3b82f6" },
    { name: "Dual Received", value: 76.1, color: "#10b981" },
    { name: "Cross Country", value: 45.8, color: "#f59e0b" },
    { name: "Night", value: 18.2, color: "#8b5cf6" },
    { name: "Instrument", value: 36.0, color: "#ec4899" },
  ],
  recentFlights: [
    {
      date: "2025-04-21",
      aircraft: "Piper Archer II",
      route: "KFFZ-KFFZ",
      duration: "2.0",
      type: "Training",
      notes: "CFI Initial checkride",
    },
    {
      date: "2025-04-19",
      aircraft: "Diamond DA20",
      route: "KFFZ-KFFZ",
      duration: "1.8",
      type: "Training",
      notes: "Spin training",
    },
    {
      date: "2025-04-16",
      aircraft: "Piper Archer III",
      route: "KFFZ-KFFZ",
      duration: "2.0",
      type: "Training",
      notes: "CFI preparation",
    },
    {
      date: "2025-03-31",
      aircraft: "Piper Archer II",
      route: "KFFZ-KPAN-88AZ-KFFZ",
      duration: "2.7",
      type: "Personal",
      notes: "Birthday flight with Alexis",
    },
  ],
}

// The issue is that we're returning early with `if (!mounted) return null` before all hooks are called.
// Let's fix this by ensuring all hooks are called unconditionally, and then conditionally render the content.

// First, let's move the fadeIn variable outside of the component since it's not using any hooks
const fadeIn = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
}

export default function FlightLogbook() {
  const [mounted, setMounted] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  useEffect(() => {
    setMounted(true)
  }, [])

  // Instead of returning null early, we'll conditionally render the content
  return (
    <section id="logbook" className="relative py-32 overflow-hidden bg-secondary/50" ref={sectionRef}>
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-background to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-background to-transparent"></div>

        <motion.div
          style={{ y, opacity }}
          className="absolute -left-64 top-64 w-[40rem] h-[40rem] rounded-full bg-blue-500/5 blur-3xl"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]), opacity }}
          className="absolute -right-64 bottom-64 w-[30rem] h-[30rem] rounded-full bg-purple-500/5 blur-3xl"
        />
      </div>

      {mounted && (
        <div className="section-container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <h2 className="section-title relative inline-block">
              Flight Logbook
              <motion.div
                className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 h-1 bg-primary"
                initial={{ width: 0 }}
                whileInView={{ width: "50%" }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
              />
            </h2>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-6">
              Detailed record of flight experience, hours, and aircraft types.
            </p>
          </motion.div>

          <div className="mb-12">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 mb-4 md:mb-0"
              >
                <div className="p-2 rounded-full bg-primary/10">
                  <Plane className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold">Flight Summary</h3>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export Logbook CSV
                </Button>
              </motion.div>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              <StatCard
                icon={<Clock className="h-8 w-8 text-primary" />}
                title={flightData.totalHours.toString()}
                description="Total Hours"
                variant="primary"
              />
              <StatCard
                icon={<Plane className="h-8 w-8 text-green-500" />}
                title={flightData.picHours.toString()}
                description="PIC Hours"
                variant="green"
              />
              <StatCard
                icon={<Calendar className="h-8 w-8 text-amber-500" />}
                title={flightData.totalFlights.toString()}
                description="Total Flights"
                variant="amber"
              />
              <StatCard
                icon={<Activity className="h-8 w-8 text-purple-500" />}
                title={flightData.lastFlight}
                description="Last Flight"
                variant="purple"
              />
            </motion.div>
          </div>

          <Tabs defaultValue="monthly" className="w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <TabsList className="mb-4 sm:mb-0">
                <TabsTrigger value="monthly" className="gap-1.5">
                  <BarChart3 className="h-4 w-4" />
                  <span className="hidden sm:inline">Monthly Hours</span>
                  <span className="sm:hidden">Monthly</span>
                </TabsTrigger>
                <TabsTrigger value="aircraft" className="gap-1.5">
                  <PieChart className="h-4 w-4" />
                  <span className="hidden sm:inline">Aircraft Types</span>
                  <span className="sm:hidden">Aircraft</span>
                </TabsTrigger>
                <TabsTrigger value="experience" className="gap-1.5">
                  <Activity className="h-4 w-4" />
                  <span className="hidden sm:inline">Experience</span>
                  <span className="sm:hidden">Experience</span>
                </TabsTrigger>
                <TabsTrigger value="recent" className="gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <span className="hidden sm:inline">Recent Flights</span>
                  <span className="sm:hidden">Recent</span>
                </TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <Select defaultValue="12">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Time period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">Last 3 months</SelectItem>
                    <SelectItem value="6">Last 6 months</SelectItem>
                    <SelectItem value="12">Last 12 months</SelectItem>
                    <SelectItem value="all">All time</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <TabsContent value="monthly" className="mt-0">
                <Card className="border-0 shadow-lg overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20">
                    <CardTitle>Monthly Flight Hours</CardTitle>
                    <CardDescription>Flight hours logged per month over the past year</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="h-[400px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={flightData.monthlyHours} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#888" strokeOpacity={0.2} />
                          <XAxis dataKey="month" tick={{ fill: "#888" }} />
                          <YAxis tick={{ fill: "#888" }} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "rgba(255, 255, 255, 0.8)",
                              borderRadius: "8px",
                              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                              border: "none",
                            }}
                          />
                          <Legend />
                          <Bar
                            dataKey="hours"
                            name="Flight Hours"
                            fill="#3b82f6"
                            radius={[4, 4, 0, 0]}
                            animationDuration={1500}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 py-3 px-6">
                    <div className="text-sm text-muted-foreground">
                      Total hours in this period:{" "}
                      <span className="font-medium text-foreground">{flightData.totalHours} hours</span>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="aircraft" className="mt-0">
                <Card className="border-0 shadow-lg overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-green-500/5 to-green-500/10 dark:from-green-500/10 dark:to-green-500/20">
                    <CardTitle>Hours by Aircraft Type</CardTitle>
                    <CardDescription>Distribution of flight hours across different aircraft models</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="h-[400px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPie>
                          <Pie
                            data={flightData.aircraftTypes}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={150}
                            fill="#8884d8"
                            dataKey="hours"
                            animationDuration={1500}
                          >
                            {flightData.aircraftTypes.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip
                            formatter={(value) => [`${value} hours`, "Hours"]}
                            contentStyle={{
                              backgroundColor: "rgba(255, 255, 255, 0.8)",
                              borderRadius: "8px",
                              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                              border: "none",
                            }}
                          />
                          <Legend />
                        </RechartsPie>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-gradient-to-r from-green-500/5 to-green-500/10 dark:from-green-500/10 dark:to-green-500/20 py-3 px-6">
                    <div className="text-sm text-muted-foreground">
                      Most flown: <span className="font-medium text-foreground">Piper Archer II (142.5 hours)</span>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="experience" className="mt-0">
                <Card className="border-0 shadow-lg overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-purple-500/5 to-purple-500/10 dark:from-purple-500/10 dark:to-purple-500/20">
                    <CardTitle>Experience Breakdown</CardTitle>
                    <CardDescription>Flight experience categorized by type and conditions</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="h-[400px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPie>
                          <Pie
                            data={flightData.experienceBreakdown}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            label={({ name, value }) => `${name}: ${value} hrs`}
                            outerRadius={150}
                            fill="#8884d8"
                            dataKey="value"
                            animationDuration={1500}
                          >
                            {flightData.experienceBreakdown.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip
                            formatter={(value) => [`${value} hours`, "Hours"]}
                            contentStyle={{
                              backgroundColor: "rgba(255, 255, 255, 0.8)",
                              borderRadius: "8px",
                              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                              border: "none",
                            }}
                          />
                          <Legend />
                        </RechartsPie>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-gradient-to-r from-purple-500/5 to-purple-500/10 dark:from-purple-500/10 dark:to-purple-500/20 py-3 px-6">
                    <div className="text-sm text-muted-foreground">
                      Primary experience: <span className="font-medium text-foreground">PIC (124.3 hours)</span>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="recent" className="mt-0">
                <Card className="border-0 shadow-lg overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-amber-500/5 to-amber-500/10 dark:from-amber-500/10 dark:to-amber-500/20">
                    <CardTitle>Recent Flights</CardTitle>
                    <CardDescription>Latest entries from the flight logbook</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="px-6 py-4 text-left font-medium">Date</th>
                            <th className="px-6 py-4 text-left font-medium">Aircraft</th>
                            <th className="px-6 py-4 text-left font-medium">Route</th>
                            <th className="px-6 py-4 text-left font-medium">Duration</th>
                            <th className="px-6 py-4 text-left font-medium">Type</th>
                            <th className="px-6 py-4 text-left font-medium">Notes</th>
                          </tr>
                        </thead>
                        <tbody>
                          {flightData.recentFlights.map((flight, index) => (
                            <tr
                              key={index}
                              className={cn(
                                "hover:bg-muted/50 transition-colors",
                                index !== flightData.recentFlights.length - 1 && "border-b",
                              )}
                            >
                              <td className="px-6 py-4">{flight.date}</td>
                              <td className="px-6 py-4">{flight.aircraft}</td>
                              <td className="px-6 py-4">{flight.route}</td>
                              <td className="px-6 py-4">{flight.duration} hrs</td>
                              <td className="px-6 py-4">
                                <Badge
                                  variant="outline"
                                  className={cn(
                                    flight.type === "Training"
                                      ? "border-blue-200 bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800"
                                      : "border-green-200 bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-300 dark:border-green-800",
                                  )}
                                >
                                  {flight.type}
                                </Badge>
                              </td>
                              <td className="px-6 py-4 text-muted-foreground">{flight.notes}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-gradient-to-r from-amber-500/5 to-amber-500/10 dark:from-amber-500/10 dark:to-amber-500/20 py-3 px-6 flex justify-between">
                    <div className="text-sm text-muted-foreground">Showing 4 of 131 total flights</div>
                    <Button variant="outline" size="sm">
                      View All Flights
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </motion.div>
          </Tabs>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-12 text-center"
          >
            <p className="text-muted-foreground mb-4">
              Flight data imported from ForeFlight logbook. Last updated: April 21, 2025
            </p>
            <Button variant="outline" className="group">
              <FileText className="mr-2 h-5 w-5 group-hover:text-primary transition-colors" />
              <span className="mr-2">Download Complete Logbook</span>
              <Download className="h-4 w-4 group-hover:translate-y-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      )}
    </section>
  )
}

function StatCard({
  icon,
  title,
  description,
  variant = "primary",
}: {
  icon: React.ReactNode
  title: string
  description: string
  variant?: "primary" | "green" | "amber" | "purple"
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
    >
      <Card
        className={cn(
          "card-hover h-full border-0 shadow-lg overflow-hidden",
          variant === "primary" && "bg-gradient-to-br from-white to-blue-50 dark:from-slate-900 dark:to-blue-950/30",
          variant === "green" && "bg-gradient-to-br from-white to-green-50 dark:from-slate-900 dark:to-green-950/30",
          variant === "amber" && "bg-gradient-to-br from-white to-amber-50 dark:from-slate-900 dark:to-amber-950/30",
          variant === "purple" && "bg-gradient-to-br from-white to-purple-50 dark:from-slate-900 dark:to-purple-950/30",
        )}
      >
        <CardContent className="p-6 flex flex-col items-center text-center">
          <div
            className={cn(
              "mb-4 p-3 rounded-full",
              variant === "primary" && "bg-blue-100 dark:bg-blue-900/30",
              variant === "green" && "bg-green-100 dark:bg-green-900/30",
              variant === "amber" && "bg-amber-100 dark:bg-amber-900/30",
              variant === "purple" && "bg-purple-100 dark:bg-purple-900/30",
            )}
          >
            {icon}
          </div>
          <h3 className="text-2xl font-bold mb-1">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
