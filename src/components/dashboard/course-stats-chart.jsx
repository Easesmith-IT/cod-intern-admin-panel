"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const data = [
  { category: "Web Dev", courses: 45, enrollments: 1234 },
  { category: "Data Science", courses: 32, enrollments: 856 },
  { category: "Mobile Dev", courses: 28, enrollments: 567 },
  { category: "Marketing", courses: 35, enrollments: 2341 },
  { category: "Design", courses: 22, enrollments: 445 },
  { category: "Business", courses: 18, enrollments: 332 },
]

const chartConfig = {
  courses: {
    label: "Courses",
    color: "#9237E3",
  },
  enrollments: {
    label: "Enrollments",
    color: "#B865F0",
  },
}

export function CourseStatsChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis 
            dataKey="category" 
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 8)}
          />
          <YAxis hide />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dashed" />}
          />
          <Bar dataKey="courses" fill="#9237E3" radius={4} />
          <Bar dataKey="enrollments" fill="#B865F0" radius={4} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
