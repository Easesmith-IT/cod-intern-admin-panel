"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const data = [
  { month: "Jan", jobPostings: 65, applications: 420 },
  { month: "Feb", jobPostings: 78, applications: 380 },
  { month: "Mar", jobPostings: 89, applications: 520 },
  { month: "Apr", jobPostings: 95, applications: 610 },
  { month: "May", jobPostings: 102, applications: 680 },
  { month: "Jun", jobPostings: 89, applications: 590 },
]

const chartConfig = {
  jobPostings: {
    label: "Job Postings",
    color: "#9237E3",
  },
  applications: {
    label: "Applications",
    color: "#B865F0",
  },
}

export function JobStatsChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
            content={<ChartTooltipContent />}
          />
          <Line
            type="monotone"
            dataKey="jobPostings"
            stroke="#9237E3"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="applications"
            stroke="#B865F0"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
