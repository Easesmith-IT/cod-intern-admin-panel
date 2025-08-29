import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

import { TableCell, TableRow } from "@/components/ui/table";
import { DELETE, PATCH } from "@/constants/apiMethods";
import { useApiMutation } from "@/hooks/useApiMutation";
import { format } from "date-fns";
import { Clock, Eye, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { Actions } from "../shared/actions";
import { ConfirmModal } from "../shared/confirm-modal";
import Spinner from "../shared/Spinner";
import { Switch } from "../ui/switch";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import { statusMap } from "@/constants/constants";


export const Student = ({ student }) => {
  const router = useRouter();
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [status, setStatus] = useState(student.status || "");

  const {
    mutateAsync: updateStatus,
    isPending,
    data,
    error,
  } = useApiMutation({
    url: `/admin/students/${student?._id}/status`,
    method: PATCH,
    invalidateKey: ["students"],
    // isToast: false,
  });

  const { mutateAsync: deleteStudent, isPending: isDeleteStudentLoading } =
    useApiMutation({
      url: `/admin/students/${student?._id}`,
      method: DELETE,
      invalidateKey: ["students"],
      // isToast: false,
    });

  const handleDeleteStudent = async () => {
    await deleteStudent();
  };

  const handleStatus = async (value) => {
    const currentStatus = value ? "active" : "inactive";
    setStatus(() => currentStatus);
    await updateStatus({ status: currentStatus });
  };

  useEffect(() => {
    setStatus(student.status);
  }, [student, error]);

  const onDelete = () => {
    setIsAlertModalOpen(true);
  };
  const onView = () => {
    router.push(`/admin/students/${student?._id || student.studentId}`);
  };

  const onEdit = () => {
    router.push(`/admin/students/${student?._id}/update`);
  };

  return (
    <>
      <TableRow>
        <TableCell className="font-medium">
          {student.customId || "NA"}
        </TableCell>
        <TableCell className="font-medium">
          <div className="flex gap-2">
          <div className="flex items-start space-x-3">
            <Avatar className="h-8 w-8 rounded-none shrink-0">
              <AvatarImage
                src={student.image || "/user-placeholder.png"}
                alt={student.name}
                className="object-cover"
                />
              <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          <p>{student.name}</p>
                </div>
        </TableCell>
        {/* <TableCell></TableCell> */}
        <TableCell>{student.emailId}</TableCell>
        <TableCell>{student.phone || "N/A"}</TableCell>
        <TableCell>
          <Badge className="capitalize" variant="secondary">
            {student.authProvider}
          </Badge>
        </TableCell>
        <TableCell>
          {student.emailVerified ? (
            <Badge variant="success">Verified</Badge>
          ) : (
            <Badge variant="secondary">Unverified</Badge>
          )}
        </TableCell>
        <TableCell>{student.courses?.length || 0}</TableCell>
        <TableCell>{student.jobApplications?.length || 0}</TableCell>
        {/* <TableCell>{student.skills.join(", ")}</TableCell> */}
        {/* <TableCell>
          <Badge variant="secondary">
            {student.applicationCount} applications
            <Eye className="size-6" />
          </Badge>
        </TableCell> */}
        <TableCell>
          <div className="flex flex-col gap-2 items-start justify-center">
            <Badge className="capitalize h-6" variant={statusMap[status]}>
              {isPending ? <Spinner spinnerClassName="size-4" /> : status}
            </Badge>
            {(status === "active" || status === "inactive") && (
              <Switch
                checked={status === "active"}
                onCheckedChange={handleStatus}
              />
            )}
          </div>
        </TableCell>
        <TableCell className="text-right">
          <Actions onDelete={onDelete} onEdit={onEdit} onView={onView} />
        </TableCell>
      </TableRow>

      {isAlertModalOpen && (
        <ConfirmModal
          header="Delete Student"
          description="This will delete the student and all of its contents."
          isModalOpen={isAlertModalOpen}
          setIsModalOpen={setIsAlertModalOpen}
          disabled={isDeleteStudentLoading}
          onConfirm={handleDeleteStudent}
        />
      )}
    </>
  );
};

Student.Skeleton = function StudentSkeleton() {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="w-full h-5" />
      </TableCell>
      <TableCell>
        <div className="inline-flex gap-2 items-center w-full">
          <Skeleton className="size-8 rounded-full shrink-0" />
          <Skeleton className="w-full h-5 flex-1" />
        </div>
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
      <TableCell className="text-right">
        <Skeleton className="w-full h-5" />
      </TableCell>
    </TableRow>
  );
};
