import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import { TableCell, TableRow } from "@/components/ui/table";
import {
  Clock,
  Currency,
  Edit,
  IndianRupee,
  MapPin,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Actions } from "../shared/actions";

export const Job = ({ job }) => {
  const router = useRouter();
  const onDelete = () => {};
  const onView = () => {
    router.push("/admin/jobs/123");
  };

  const onEdit = () => {
    router.push("/admin/jobs/update");
  };

  return (
    <TableRow key={job.id}>
      <TableCell className="font-medium">
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={job.logo || "/placeholder.svg"}
              alt={job.company}
            />
            <AvatarFallback>{job.company.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{job.title}</div>
            <div className="text-sm text-muted-foreground flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              Posted {new Date(job.postedDate).toLocaleDateString()}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell>{job.company}</TableCell>
      <TableCell>
        <div className="flex items-center">
          <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
          {job.location}
        </div>
      </TableCell>
      <TableCell>
        <Badge variant="outline">{job.type}</Badge>
      </TableCell>
      {/* <TableCell className="font-medium">{job.salary}</TableCell> */}
      <TableCell>
        <Badge variant="secondary">{job.applications} applications</Badge>
      </TableCell>
      <TableCell>
        <Badge
          className="capitalize"
          variant={job.status === "active" ? "success" : "inPrgress"}
        >
          {job.status}
        </Badge>
      </TableCell>
      <TableCell className="text-right">
        <Actions
          onDelete={onDelete}
          onEdit={onEdit}
          showViewAction
          onView={onView}
        />
      </TableCell>
    </TableRow>
  );
};
