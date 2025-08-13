import { Badge } from "@/components/ui/badge";

import { TableCell, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { Actions } from "../shared/actions";
import { Switch } from "../ui/switch";
import { useEffect, useState } from "react";
import { useApiMutation } from "@/hooks/useApiMutation";
import { DELETE, PATCH } from "@/constants/apiMethods";
import Spinner from "../shared/Spinner";
import { ConfirmModal } from "../shared/confirm-modal";

export const Admin = ({ admin }) => {
  const router = useRouter();
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [status, setStatus] = useState(admin.status || "");

  const {
    mutateAsync: updateStatus,
    isPending,
    data,
    error,
  } = useApiMutation({
    url: `/admin/admins/update-status/${admin?._id}`,
    method: PATCH,
    invalidateKey: ["admin"],
    // isToast: false,
  });

  const { mutateAsync: deleteAdmin, isPending: isDeleteAdminLoading } =
    useApiMutation({
      url: `/admin/admins/delete/${admin?._id}`,
      method: DELETE,
      invalidateKey: ["admin"],
      // isToast: false,
    });

  const handleDeleteAdmin = async () => {
    await deleteAdmin();
  };

  const handleStatus = async (value) => {
    const currentStatus = value ? "active" : "inactive";
    setStatus(() => currentStatus);
    await updateStatus({ status: currentStatus });
  };

  useEffect(() => {
    setStatus(admin.status);
  }, [admin, error]);

  const onDelete = () => {
    setIsAlertModalOpen(true);
  };
  const onView = () => {
    router.push(`/admin/admins/${admin?._id}`);
  };

  const onEdit = () => {
    router.push(`/admin/admins/${admin?._id}/update`);
  };

  return (
    <>
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
              {isPending ? <Spinner spinnerClassName="size-4" /> : status}
            </Badge>
            {(admin.role !== "superAdmin" && admin.status !== "blocked") && (
              <Switch
                checked={status === "active"}
                onCheckedChange={handleStatus}
              />
            )}
          </div>
        </TableCell>
        <TableCell className="text-right">
          <Actions
            disabled={admin.role === "superAdmin"}
            onDelete={onDelete}
            onEdit={onEdit}
            onView={onView}
          />
        </TableCell>
      </TableRow>
      {isAlertModalOpen && (
        <ConfirmModal
          header="Delete Admin"
          description="This will delete the admin and all of its contents."
          isModalOpen={isAlertModalOpen}
          setIsModalOpen={setIsAlertModalOpen}
          disabled={isDeleteAdminLoading}
          onConfirm={handleDeleteAdmin}
        />
      )}
    </>
  );
};
