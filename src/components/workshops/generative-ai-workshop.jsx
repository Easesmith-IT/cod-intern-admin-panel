import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Skeleton } from "../ui/skeleton";
import { format } from "date-fns/format";
import { cn } from "@/lib/utils";

export const GenerativeAIWorkshopComp = ({ workshop }) => {
  return (
    <TableRow>
      <TableCell>
        {workshop.createdAt &&
          format(new Date(workshop.createdAt), "dd-MM-yyyy")}
      </TableCell>
      <TableCell>{workshop.fullName || "NA"}</TableCell>
      <TableCell>{workshop.email || "NA"}</TableCell>
      <TableCell>{workshop.mobileNumber || "NA"}</TableCell>
      <TableCell className="capitalize">{workshop.gender || "NA"}</TableCell>
      <TableCell>
        {(workshop.dateOfBirth &&
          format(new Date(workshop.dateOfBirth), "dd/MM/yyyy")) ||
          "NA"}
      </TableCell>
      <TableCell>
        <span
          className={cn(
            "px-2 py-0.5 rounded-sm capitalize",
            workshop.status === "pending" && "bg-yellow-100 text-yellow-800",
            workshop.status === "paid" && "bg-green-100 text-green-800",
            workshop.status === "failed" && "bg-red-100 text-red-800"
          )}
        >
          {workshop.status}
        </span>
      </TableCell>
      <TableCell>₹{workshop?.paymentInfo?.amount || 0}</TableCell>
      <TableCell>{workshop.collegeName || "NA"}</TableCell>
      <TableCell>{workshop.branch || "NA"}</TableCell>
      <TableCell>{workshop.year || "NA"}</TableCell>
      <TableCell>{workshop.grade || "NA"}</TableCell>
      <TableCell>{workshop.universityRollNo || "NA"}</TableCell>
      {/* <TableCell className="text-right"></TableCell> */}
    </TableRow>
  );
};

GenerativeAIWorkshopComp.Skeleton = function WorkshopSkeleton() {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="w-full h-5" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-full h-5" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-full h-5" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-full h-5" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-full h-5" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-full h-5" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-full h-5" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-full h-5" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-full h-5" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-full h-5" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-full h-5" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-full h-5" />
      </TableCell>
      {/* <TableCell className="text-right">
        <Skeleton className="w-full h-5" />
      </TableCell> */}
    </TableRow>
  );
};
