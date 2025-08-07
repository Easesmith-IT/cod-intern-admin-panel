"use client"

import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const data = [
  { month: "Jan", students: 400, revenue: 2400, courses: 12, jobs: 8 },
  { month: "Feb", students: 300, revenue: 1398, courses: 15, jobs: 12 },
  { month: "Mar", students: 200, revenue: 9800, courses: 18, jobs: 15 },
  { month: "Apr", students: 278, revenue: 3908, courses: 22, jobs: 18 },
  { month: "May", students: 189, revenue: 4800, courses: 25, jobs: 23 },
  { month: "Jun", students: 239, revenue: 3800, courses: 28, jobs: 27 },
]

const chartConfig = {
  students: {
    label: "Students",
    color: "#9237E3",
  },
  revenue: {
    label: "Revenue",
    color: "#B865F0",
  },
  courses: {
    label: "Courses",
    color: "#C785F5",
  },
  jobs: {
    label: "Jobs",
    color: "#D6A5F8",
  },
}

export function StatsChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="fillStudents" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#9237E3" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#9237E3" stopOpacity={0.1}/>
            </linearGradient>
            <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#B865F0" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#B865F0" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="month" 
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis hide />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" />}
          />
          <Area
            dataKey="students"
            type="natural"
            fill="url(#fillStudents)"
            fillOpacity={0.4}
            stroke="#9237E3"
            stackId="a"
          />
          <Area
            dataKey="revenue"
            type="natural"
            fill="url(#fillRevenue)"
            fillOpacity={0.4}
            stroke="#B865F0"
            stackId="a"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
