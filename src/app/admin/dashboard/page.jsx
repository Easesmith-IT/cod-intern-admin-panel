"use client";

import { CourseStatsChart } from "@/components/dashboard/course-stats-chart";
import { JobStatsChart } from "@/components/dashboard/job-stats-chart";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { StatsChart } from "@/components/dashboard/stats-chart";
import { StudentStatsChart } from "@/components/dashboard/student-stats-chart";
import { TypographyH2 } from "@/components/typography/typography-h2";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  BookOpen,
  Briefcase,
} from "lucide-react";

const stats = [
  {
    title: "Total Students",
    value: "12,543",
    change: "+18%",
    icon: Users,
    color: "var(--main)",
  },
  {
    title: "Active Courses",
    value: "234",
    change: "+12%",
    icon: BookOpen,
    color: "var(--main)",
  },
  {
    title: "Job Postings",
    value: "89",
    change: "+23%",
    icon: Briefcase,
    color: "var(--main)",
  },
  {
    title: "Revenue",
    value: "$45,231",
    change: "+15%",
    icon: DollarSign,
    color: "var(--main)",
  },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <TypographyH2 heading="Dashboard" />
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your course and job
          platform today.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.title}
              className="border-l-4 hover:shadow-md transition-shadow"
              style={{ borderLeftColor: stat.color }}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4" style={{ color: stat.color }} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium" style={{ color: "#9237E3" }}>
                    {stat.change}
                  </span>{" "}
                  from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
        <Card
          className="col-span-2 border-t-4"
          style={{ borderTopColor: "#9237E3" }}
        >
          <CardHeader>
            <CardTitle style={{ color: "#9237E3" }}>
              Revenue & Student Growth
            </CardTitle>
            <CardDescription>
              Monthly trends for revenue and student acquisition
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <StatsChart />
          </CardContent>
        </Card>
        <Card className="border-t-4" style={{ borderTopColor: "#9237E3" }}>
          <CardHeader>
            <CardTitle style={{ color: "#9237E3" }}>Recent Activity</CardTitle>
            <CardDescription>
              Latest user activities and system events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivity />
          </CardContent>
        </Card>
      </div>

      {/* Student Analytics Section */}
      <Card className="border-t-4" style={{ borderTopColor: "#9237E3" }}>
        <CardHeader>
          <CardTitle style={{ color: "#9237E3" }}>
            Student Analytics
          </CardTitle>
          <CardDescription>
            Comprehensive student statistics and trends
          </CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <StudentStatsChart />
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
        <Card className="border-t-4" style={{ borderTopColor: "#9237E3" }}>
          <CardHeader>
            <CardTitle style={{ color: "#9237E3" }}>Course Analytics</CardTitle>
            <CardDescription>
              Courses and enrollments by category
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <CourseStatsChart />
          </CardContent>
        </Card>
        <Card className="border-t-4" style={{ borderTopColor: "#9237E3" }}>
          <CardHeader>
            <CardTitle style={{ color: "#9237E3" }}>
              Job Market Trends
            </CardTitle>
            <CardDescription>
              Job postings and applications over time
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <JobStatsChart />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
