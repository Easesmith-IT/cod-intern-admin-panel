"use client";

import { Button } from "@/components/ui/button";
import { localPermissions } from "@/constants/permissions";
import { readCookie } from "@/lib/readCookie";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  BookOpen,
  Briefcase,
  CalendarDays,
  CreditCard,
  Files,
  FileText,
  FolderCog,
  HelpCircle,
  LayoutDashboard,
  MessageSquareText,
  PanelLeft,
  Settings,
  ShieldCheck,
  UserRound,
  UserRoundCheck,
} from "lucide-react"; // Added UserRound and UserRoundCheck icons
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "admins", label: "Admins", icon: ShieldCheck },
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "jobs", label: "Jobs", icon: Briefcase },
  { id: "students", label: "Students", icon: UserRound }, // New Students menu item
  { id: "instructors", label: "Instructors", icon: UserRoundCheck }, // New Instructors menu item
  { id: "content", label: "Content Management", icon: FolderCog },
  { id: "faqs", label: "Faqs", icon: HelpCircle },
  // { id: "analytics", label: "Analytics", icon: BarChart3 },
  // { id: "payments", label: "Payments", icon: CreditCard },
  // { id: "settings", label: "Settings", icon: Settings },
  { id: "workshops", label: "Workshop Registration", icon: CalendarDays },
  {
    id: "workshopFeedbacks",
    label: "Workshop Feedbacks",
    icon: MessageSquareText,
  },
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const pathname = usePathname();
  const userInfo = readCookie("userInfo");
  const [permissions, setPermissions] = useState(null);

  useEffect(() => {
    const userInfo = readCookie("userInfo");
    setPermissions(userInfo?.permissions || {});
  }, []);

  console.log("userInfo", userInfo);

  return (
    <div
      className={cn(
        "bg-white shadow-lg h-[100vh] sticky top-0 overflow-y-auto transition-all overflow-x-hidden duration-300 flex flex-col border-r",
        collapsed ? "w-20" : "w-64"
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
          {!permissions &&
            Array.from({ length: 10 }).map((_, index) => (
              <Skeleton key={index} className="w-full h-9" />
            ))}
          {permissions &&
            menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <li key={item.id}>
                  <Button
                    variant={
                      pathname.includes(`/admin/${item.id}`)
                        ? "codIntern"
                        : "ghost"
                    }
                    className={cn(
                      "w-full justify-start",
                      collapsed ? "px-2 justify-center" : "px-4",
                      !permissions?.[localPermissions[item.id]] && "hidden",
                      permissions?.[localPermissions[item.id]] &&
                        permissions?.[localPermissions[item.id]] === "none" &&
                        "hidden"
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
