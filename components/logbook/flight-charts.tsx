"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Sample data - replace with actual flight data
const monthlyHoursData = [
  { name: "Jan", hours: 22 },
  { name: "Feb", hours: 18 },
  { name: "Mar", hours: 25 },
  { name: "Apr", hours: 30 },
  { name: "May", hours: 28 },
  { name: "Jun", hours: 35 },
  { name: "Jul", hours: 42 },
  { name: "Aug", hours: 38 },
  { name: "Sep", hours: 32 },
  { name: "Oct", hours: 27 },
  { name: "Nov", hours: 24 },
  { name: "Dec", hours: 20 },
]

const aircraftTypeData = [
  { name: "Cessna 172", value: 850 },
  { name: "Piper PA-28", value: 620 },
  { name: "Cirrus SR22", value: 380 },
  { name: "Beechcraft Bonanza", value: 290 },
  { name: "Diamond DA40", value: 360 },
]

const flightTypeData = [
  { name: "Instruction", value: 950 },
  { name: "Personal", value: 750 },
  { name: "Cross Country", value: 500 },
  { name: "Night", value: 300 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

export default function FlightCharts() {
  const [activeTab, setActiveTab] = useState("monthly")

  return (
    <section className="w-full py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Flight Data Visualization</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Visual representation of my flight hours, aircraft types, and flight categories.
          </p>
        </motion.div>

        <Tabs defaultValue="monthly" className="w-full" onValueChange={setActiveTab}>
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="monthly">Monthly Hours</TabsTrigger>
              <TabsTrigger value="aircraft">Aircraft Types</TabsTrigger>
              <TabsTrigger value="categories">Flight Categories</TabsTrigger>
            </TabsList>
          </div>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>
                {activeTab === "monthly" && "Monthly Flight Hours (Current Year)"}
                {activeTab === "aircraft" && "Hours by Aircraft Type"}
                {activeTab === "categories" && "Hours by Flight Category"}
              </CardTitle>
              <CardDescription>
                {activeTab === "monthly" && "Distribution of flight hours across each month"}
                {activeTab === "aircraft" && "Total hours logged in different aircraft models"}
                {activeTab === "categories" && "Breakdown of hours by flight purpose and conditions"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TabsContent value="monthly" className="mt-0">
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyHoursData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.8)",
                          borderRadius: "8px",
                          border: "none",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                      <Bar dataKey="hours" fill="#0088FE" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              <TabsContent value="aircraft" className="mt-0">
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={aircraftTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {aircraftTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`${value} hours`, "Flight Hours"]}
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.8)",
                          borderRadius: "8px",
                          border: "none",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              <TabsContent value="categories" className="mt-0">
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={flightTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {flightTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`${value} hours`, "Flight Hours"]}
                        contentStyle={{
                          backgroundColor: "rgba(255, 255, 255, 0.8)",
                          borderRadius: "8px",
                          border: "none",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>
      </div>
    </section>
  )
}
