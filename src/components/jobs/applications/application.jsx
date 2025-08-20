import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const Application = ({ application }) => {
  const { customId, jobId, fullName, email, gender, dateOfBirth, phoneNumber,_id } =
    application || {};
    const router = useRouter();
  const [status, setStatus] = useState(application.status || "");
  const onDelete = () => {};
  const onView = () => {
  };

  const onEdit = () => {};

  const handleStatus = async (value) => {};

  return (
    <TableRow>
      <TableCell className="font-medium">{customId}</TableCell>
      {/* <TableCell className="font-medium">
        <div className="flex items-center space-x-3">
          <div>
            <div className="font-medium truncate w-60">{jobId.title}</div>
            <div className="text-sm text-muted-foreground flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              Posted{" "}
              {jobId.postingDate &&
                format(new Date(jobId.postingDate), "dd-MM-yyyy")}
            </div>
          </div>
        </div>
      </TableCell> */}
      {/* <TableCell>{jobId.company}</TableCell> */}
      <TableCell>{fullName}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{gender}</TableCell>
      <TableCell>
        {dateOfBirth && format(new Date(dateOfBirth), "dd/MM/yyyy")}
      </TableCell>
      <TableCell>{phoneNumber}</TableCell>
      {/* <TableCell>
        <div className="flex flex-col gap-2 items-start justify-center">
          <Badge
            className={cn("capitalize h-6", getStatusColorCode(status))}
          >
            {status}
          </Badge>
        </div>
      </TableCell> */}
      {/* <TableCell className="text-right">
        <Actions onDelete={onDelete} onEdit={onEdit} onView={onView} />
      </TableCell> */}
    </TableRow>
  );
};

Application.Skeleton = function ApplicationSkeleton() {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="h-4 w-24" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-32" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-28" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-20" />
      </TableCell>
    </TableRow>
  );
};
