import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { courseApplicationStatusMap } from "@/constants/constants";
import { Badge } from "@/components/ui/badge";

export const Application = ({application}) => {
const {
  customId,
  firstName,
  lastName,
  phone,
  email,
  education,
  graduationYear,
  status,
  appliedAt,
} = application;
  return (
    <TableRow>
      {/* <TableCell className="font-medium">{customId || "NA"}</TableCell> */}
      <TableCell>{firstName}</TableCell>
      <TableCell>{lastName}</TableCell>
      <TableCell>{phone}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{education}</TableCell>
      <TableCell>{graduationYear}</TableCell>
      {/* <TableCell>
        <Badge variant={courseApplicationStatusMap[status]} className="capitalize">
          {status}
        </Badge>
      </TableCell> */}
      <TableCell>
        {appliedAt && format(new Date(appliedAt), "dd MMM, yyyy")}
      </TableCell>
      {/* <TableCell className="text-right">
        <Actions onDelete={onDelete} onEdit={onEdit} onView={onView} />
      </TableCell> */}
    </TableRow>
  );
};

Application.Skeleton = function ApplicationSkeleton() {
  return (
    <TableRow>
      {/* <TableCell>
        <Skeleton className="w-full h-5" />
      </TableCell> */}
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
      {/* <TableCell>
        <Skeleton className="w-full h-5" />
      </TableCell> */}
      <TableCell>
        <Skeleton className="w-full h-5" />
      </TableCell>
      {/* <TableCell className="text-right">
        <Skeleton className="w-full h-5" />
      </TableCell> */}
    </TableRow>
  );
};
