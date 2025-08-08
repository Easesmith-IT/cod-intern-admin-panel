"use client";

import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Settings,
  BarChart3,
  FileText,
  Package,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Briefcase,
  CreditCard,
  ShieldCheck,
  UserRound,
  UserRoundCheck,
  PanelLeft,
} from "lucide-react"; // Added UserRound and UserRoundCheck icons
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "admins", label: "Admins", icon: ShieldCheck },
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "jobs", label: "Jobs", icon: Briefcase },
  { id: "students", label: "Students", icon: UserRound }, // New Students menu item
  { id: "instructors", label: "Instructors", icon: UserRoundCheck }, // New Instructors menu item
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "settings", label: "Settings", icon: Settings },
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const pathname = usePathname();

  return (
    <div
      className={cn(
        "bg-white shadow-lg h-screen sticky top-0 overflow-y-auto transition-all duration-300 flex flex-col border-r",
        collapsed ? "w-20" : "w-52"
      )}
    >
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <h1 className="text-xl font-bold" style={{ color: "#9237E3" }}>
              Admin Panel
            </h1>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 hover:bg-purple-50"
          >
            <PanelLeft className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <Button
                  variant={pathname.includes(item.id) ? "codIntern" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    collapsed ? "px-2 justify-center" : "px-4"
                    // pathname.includes(item.id)
                    //   ? "bg-purple-600 text-white hover:bg-purple-700"
                    //   : "hover:bg-purple-50 hover:text-purple-700"
                  )}
                  asChild
                >
                  <Link href={`/admin/${item.id}`}>
                    <Icon className="h-4 w-4" />
                    {!collapsed && <span className="ml-2">{item.label}</span>}
                  </Link>
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
