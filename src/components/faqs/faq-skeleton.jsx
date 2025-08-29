import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

export const FaqSkeleton = () => {
  return (
    <TableRow>
      <TableCell className="font-medium">
        <div className="flex items-start space-x-3">
          <Skeleton className="h-5 w-5 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-60" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="space-y-1">
          <Skeleton className="h-4 w-60" />
          <Skeleton className="h-4 w-40" />
        </div>
      </TableCell>
      <TableCell>
        <Skeleton className="h-6 w-20" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-32" />
      </TableCell>
      <TableCell className="text-center">
        <Skeleton className="h-6 w-8 mx-auto" />
      </TableCell>
      <TableCell>
        <div className="flex flex-col gap-2 items-start">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-4 w-10" />
        </div>
      </TableCell>
      <TableCell className="text-right">
        <Skeleton className="h-8 w-24 ml-auto" />
      </TableCell>
    </TableRow>
  );
};
