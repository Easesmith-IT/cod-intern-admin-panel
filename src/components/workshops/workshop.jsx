import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Skeleton } from "../ui/skeleton";
import { format } from "date-fns/format";

export const Workshop = ({ workshop }) => {
  return (
    <TableRow>
      <TableCell>{workshop.fullName}</TableCell>
      <TableCell>{workshop.email}</TableCell>
      <TableCell>{workshop.mobileNumber}</TableCell>
      <TableCell className="capitalize">{workshop.gender}</TableCell>
      <TableCell>
        {workshop.dateOfBirth && format(new Date(workshop.dateOfBirth),"dd/MM/yyyy")}
      </TableCell>
      <TableCell>{workshop.collegeName}</TableCell>
      <TableCell>{workshop.branch}</TableCell>
      <TableCell>{workshop.year}</TableCell>
      <TableCell>{workshop.universityRollNo}</TableCell>
      {/* <TableCell className="text-right"></TableCell> */}
    </TableRow>
  );
};

Workshop.Skeleton = function WorkshopSkeleton() {
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
      {/* <TableCell className="text-right">
        <Skeleton className="w-full h-5" />
      </TableCell> */}
    </TableRow>
  );
};
