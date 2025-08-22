"use client";

import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ConfirmModal } from "../shared/confirm-modal";
import { useEffect, useState } from "react";
import { readCookie } from "@/lib/readCookie";
import { useApiMutation } from "@/hooks/useApiMutation";
import { POST } from "@/constants/apiMethods";
import { useRouter } from "next/navigation";
import { removeAuthCookies, setAuthCookies } from "@/lib/cookies";

export const Header = () => {
  const router = useRouter();
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

  const userInfo = readCookie("userInfo");
  // console.log("userInfo", userInfo);

  const {
    mutateAsync: logout,
    isPending: isLogoutLoading,
    data: result,
  } = useApiMutation({
    url: "/admin/admins/logout",
    method: POST,
    invalidateKey: ["logout"],
    // isToast: false,
  });

  const handleLogout = async () => {
    // await logout({ email: userInfo.email });
    removeAuthCookies();
    router.push("/");
  };

  // useEffect(() => {
  //   if (result) {
  //   }
  // }, [result]);

  return (
    <header className="bg-white sticky z-20 top-0 shadow-sm border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input placeholder="Search..." className="pl-10 w-64" />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-purple-50 hover:text-purple-700"
          >
            <Bell className="h-4 w-4" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-8 w-8 rounded-full hover:bg-purple-50"
              >
                <Avatar className="h-8 w-8 ring-2 ring-purple-200">
                  <AvatarImage
                    src=""
                    alt="Admin"
                  />
                  <AvatarFallback
                    style={{ backgroundColor: "#9237E3", color: "white" }}
                  >
                    AD
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Admin User</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    admin@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="hover:bg-purple-50">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-purple-50">
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={() => setIsAlertModalOpen(true)}
                className="hover:bg-purple-50"
              >
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {isAlertModalOpen && (
          <ConfirmModal
            isModalOpen={isAlertModalOpen}
            setIsModalOpen={setIsAlertModalOpen}
            header="Logout"
            description="Are you sure you want to logout?"
            disabled={isLogoutLoading}
            onConfirm={handleLogout}
          />
        )}
      </div>
    </header>
  );
};
