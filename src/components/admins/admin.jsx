import { Badge } from "@/components/ui/badge";

import { TableCell, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { Actions } from "../shared/actions";
import { Switch } from "../ui/switch";

export const Admin = ({ admin }) => {
  const router = useRouter();

  const onDelete = () => {};

  const onEdit = () => {
    router.push("/admin/admins/update");
  };

  return (
    <TableRow>
      <TableCell>ADMIN-ID-5339-1158-74-25</TableCell>
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
        <Badge variant={admin.role === "Super Admin" ? "default" : "secondary"}>
          {admin.role}
        </Badge>
      </TableCell>
      <TableCell>manager</TableCell>
      <TableCell>
        <div className="flex flex-col gap-2 items-center">
          <Badge
            variant={admin.status === "Active" ? "success" : "destructive"}
          >
            {admin.status}
          </Badge>
          <Switch />
        </div>
      </TableCell>
      <TableCell className="text-right">
        <Actions onDelete={onDelete} onEdit={onEdit} />
      </TableCell>
    </TableRow>
  );
};
