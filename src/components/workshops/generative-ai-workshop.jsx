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
      <TableCell>{workshop.fullName}</TableCell>
      <TableCell>{workshop.email}</TableCell>
      <TableCell>{workshop.mobileNumber}</TableCell>
      <TableCell className="capitalize">{workshop.gender}</TableCell>
      <TableCell>
        {workshop.dateOfBirth &&
          format(new Date(workshop.dateOfBirth), "dd/MM/yyyy")}
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
      <TableCell>{workshop.collegeName}</TableCell>
      <TableCell>{workshop.branch}</TableCell>
      <TableCell>{workshop.year}</TableCell>
      <TableCell>{workshop.universityRollNo}</TableCell>
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
