import React, { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Clock, MapPin } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import Spinner from "@/components/shared/Spinner";
import { Actions } from "@/components/shared/actions";

export const Application = ({ application }) => {
  const [status, setStatus] = useState(application.status || "");
  const onDelete = () => {};
  const onView = () => {};

  const onEdit = () => {};

  const handleStatus = async (value) => {};

  return (
    <TableRow>
      <TableCell className="font-medium">{application.customId}</TableCell>
      <TableCell className="font-medium">
        <div className="flex items-center space-x-3">
          <div>
            <div className="font-medium truncate w-60">{application.title}</div>
            <div className="text-sm text-muted-foreground flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              Posted{" "}
              {application.postingDate &&
                format(new Date(application.postingDate), "dd-MM-yyyy")}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell>{application.company}</TableCell>
      <TableCell>
        <div className="flex items-center">
          <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
          <div className="truncate w-60">
            {application.city}, {application.state}, {application.country}
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant="outline" className="capitalize">
          {application.category}
        </Badge>
      </TableCell>
      {/* <TableCell>
          <Badge variant="secondary">{application.applications} applications</Badge>
        </TableCell> */}
      <TableCell>
        <div className="flex flex-col gap-2 items-start justify-center">
          <Badge
            className="capitalize h-6"
            variant={status === "active" ? "success" : "inProgress"}
          >
            {false ? <Spinner spinnerClassName="size-4" /> : status}
          </Badge>
          <Switch
            checked={status === "active"}
            onCheckedChange={handleStatus}
          />
        </div>
      </TableCell>
      <TableCell className="text-right">
        <Actions onDelete={onDelete} onEdit={onEdit} onView={onView} />
      </TableCell>
    </TableRow>
  );
};
