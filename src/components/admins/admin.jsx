import { Badge } from "@/components/ui/badge";

import { TableCell, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { Actions } from "../shared/actions";
import { Switch } from "../ui/switch";
import { useState } from "react";

export const Admin = ({ admin }) => {
  const router = useRouter();
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [status, setStatus] = useState(admin.status || "");

  const onDelete = () => {};

  const onEdit = () => {
    router.push("/admin/admins/update");
  };

  const handleStatus = async (value) => {
    const currentStatus = value ? "active" : "inactive";
    setStatus(() => currentStatus);
    //  await updateStatus({ status: currentStatus });
  };

  return (
    <TableRow>
      <TableCell>{admin.customId}</TableCell>
      <TableCell className="font-medium">
        <div className="flex items-center space-x-3">
          {/* <Avatar className="h-8 w-8">
            <AvatarImage src={"/user-placeholder.png"} alt={admin.name} />
            <AvatarFallback>
              {admin.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar> */}
          <span>{admin.name}</span>
        </div>
      </TableCell>
      <TableCell>{admin.email}</TableCell>
      <TableCell>{admin.phone}</TableCell>
      <TableCell>
        <Badge
          className="uppercase"
          variant={admin.role === "superAdmin" ? "default" : "secondary"}
        >
          {admin.role}
        </Badge>
      </TableCell>
      <TableCell className="capitalize">{admin.position}</TableCell>
      <TableCell className="w-20">
        <div className="flex flex-col gap-2 items-center">
          <Badge
            variant={
              status === "active"
                ? "success"
                : status === "inactive"
                ? "inPrgress"
                : "destructive"
            }
            className="capitalize h-6"
          >
            {status}
          </Badge>
          <Switch
            checked={status === "active"}
            onCheckedChange={handleStatus}
          />
        </div>
      </TableCell>
      <TableCell className="text-right">
        <Actions onDelete={onDelete} onEdit={onEdit} />
      </TableCell>
    </TableRow>
  );
};
