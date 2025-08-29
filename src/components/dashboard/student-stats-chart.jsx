"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useApiQuery } from "@/hooks/useApiQuery";
import {
  Clock,
  Shield,
  UserCheck,
  Users
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import Spinner from "../shared/Spinner";

const COLORS = {
  active: "#22c55e", // green
  inactive: "#6b7280", // gray
  suspended: "#ef4444", // red
  pending: "#f59e0b", // amber
};

const AUTH_COLORS = {
  local: "#3b82f6", // blue
  google: "#dc2626", // red
  facebook: "#1d4ed8", // blue
};

export const StudentStatsChart = () => {
  const { data, isLoading, error } = useApiQuery({
    url: "/admin/students/stats",
    queryKeys: ["studentStats"],
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  if (error || !data?.data) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          Failed to load student statistics
        </p>
      </div>
    );
  }

  const stats = data.data;
  const overview = stats.overview;
  const statusBreakdown = stats.statusBreakdown;
  const authProviderBreakdown = stats.authProviderBreakdown;
  const recentRegistrations = stats.recentRegistrations;

  // Format data for charts
  const statusPieData = statusBreakdown.map((item) => ({
    name: item._id,
    value: item.count,
    fill: COLORS[item._id] || "#8884d8",
  }));

  const authPieData = authProviderBreakdown.map((item) => ({
    name: item._id,
    value: item.count,
    fill: AUTH_COLORS[item._id] || "#8884d8",
  }));

  const registrationBarData = recentRegistrations.map((item) => ({
    date: new Date(item._id).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    registrations: item.count,
  }));

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Students
                </p>
                <p className="text-2xl font-bold">
                  {overview.totalStudents?.toLocaleString() || 0}
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Active Students
                </p>
                <p className="text-2xl font-bold">
                  {overview.activeStudents?.toLocaleString() || 0}
                </p>
                <p className="text-xs text-muted-foreground">
                  {overview.totalStudents > 0
                    ? `${(
                        (overview.activeStudents / overview.totalStudents) *
                        100
                      ).toFixed(1)}% of total`
                    : "0% of total"}
                </p>
              </div>
              <UserCheck className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Verified Emails
                </p>
                <p className="text-2xl font-bold">
                  {overview.verifiedEmails?.toLocaleString() || 0}
                </p>
                <p className="text-xs text-muted-foreground">
                  {overview.totalStudents > 0
                    ? `${(
                        (overview.verifiedEmails / overview.totalStudents) *
                        100
                      ).toFixed(1)}% verified`
                    : "0% verified"}
                </p>
              </div>
              <Shield className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-gray-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Pending Students
                </p>
                <p className="text-2xl font-bold">
                  {overview.pendingStudents?.toLocaleString() || 0}
                </p>
                <p className="text-xs text-muted-foreground">
                  {overview.totalStudents > 0
                    ? `${(
                        (overview.pendingStudents / overview.totalStudents) *
                        100
                      ).toFixed(1)}% pending`
                    : "0% pending"}
                </p>
              </div>
              <Clock className="h-8 w-8 text-gray-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <ResponsiveContainer width="60%" height={200}>
                <PieChart>
                  <Pie
                    data={statusPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {statusPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [value, "Students"]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2">
                {statusPieData.map((item) => (
                  <div key={item.name} className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.fill }}
                    />
                    <span className="text-sm capitalize">{item.name}</span>
                    <Badge variant="outline" className="ml-auto">
                      {item.value}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Auth Provider Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Registration Methods
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <ResponsiveContainer width="60%" height={200}>
                <PieChart>
                  <Pie
                    data={authPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {authPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [value, "Students"]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2">
                {authPieData.map((item) => (
                  <div key={item.name} className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.fill }}
                    />
                    <span className="text-sm capitalize">{item.name}</span>
                    <Badge variant="outline" className="ml-auto">
                      {item.value}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Registrations Chart */}
      {registrationBarData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Recent Registrations (Last 30 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={registrationBarData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  formatter={(value) => [value, "New Students"]}
                  labelStyle={{ color: "#000" }}
                />
                <Bar
                  dataKey="registrations"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
