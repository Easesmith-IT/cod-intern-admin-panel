"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils"; // Adjust if you're not using `cn` utility
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

export default function DatePicker({
  value,
  onChange,
  placeholder = "Select a date",
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDateSelect = (date) => {
    if (date) {
      onChange(date);
      setIsOpen(false);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full flex h-9 px-2.5 gap-2 justify-between border-input hover:bg-transparent text-sm font-normal hover:text-black/80 text-black/80 rounded-md",
            !value && "text-muted-foreground"
          )}
        >
          {value ? (
            format(value, "PPP")
          ) : (
            <span className="text-sm text-black/80 font-normal">
              {placeholder}
            </span>
          )}
          <CalendarIcon className="text-black/80 text-xl" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          captionLayout="dropdown"
          mode="single"
          selected={value}
          onSelect={handleDateSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
