import React from 'react'
import { TableCell, TableRow } from '../ui/table';
import { Skeleton } from '../ui/skeleton';

export const AdminSkeleton = () => {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="w-full h-5" />
      </TableCell>
      <TableCell>
          <Skeleton className="w-full h-5 flex-1" />
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
      <TableCell>
        <Skeleton className="w-full h-5" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-full h-5" />
      </TableCell>
      <TableCell className="text-right">
        <Skeleton className="w-full h-5" />
        <Skeleton className="w-10 mx-auto h-5 mt-2" />
      </TableCell>
      <TableCell className="text-right">
        <Skeleton className="w-full h-5" />
      </TableCell>
    </TableRow>
  );
}
