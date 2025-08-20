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

export const Job = ({ job }) => {
  const router = useRouter();
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [status, setStatus] = useState(job.status || "");

  const {
    mutateAsync: updateStatus,
    isPending,
    data,
    error,
  } = useApiMutation({
    url: `/admin/jobs/update-status/${job?._id}`,
    method: PATCH,
    invalidateKey: ["job"],
    // isToast: false,
  });

  const { mutateAsync: deleteJob, isPending: isDeleteJobLoading } =
    useApiMutation({
      url: `/admin/jobs/delete/${job?._id}`,
      method: DELETE,
      invalidateKey: ["job"],
      // isToast: false,
    });

  const handleDeleteJob = async () => {
    await deleteJob();
  };

  const handleStatus = async (value) => {
    const currentStatus = value ? "active" : "inactive";
    setStatus(() => currentStatus);
    await updateStatus({ status: currentStatus });
  };

  useEffect(() => {
    setStatus(job.status);
  }, [job, error]);

  const onDelete = () => {
    setIsAlertModalOpen(true);
  };
  const onView = () => {
    router.push(`/admin/jobs/${job?._id}`);
  };

  const onEdit = () => {
    router.push(`/admin/jobs/${job?._id}/update`);
  };

  return (
    <>
      <TableRow>
        <TableCell className="font-medium">{job.jobId}</TableCell>
        <TableCell className="font-medium">
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8 rounded-none">
              <AvatarImage
                src={job.jobImage || "/user-placeholder.png"}
                alt={job.company}
                className="object-contain"
              />
              <AvatarFallback>{job.company.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium truncate w-60">{job.title}</div>
              <div className="text-sm text-muted-foreground flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                Posted{" "}
                {job.postingDate &&
                  format(new Date(job.postingDate), "dd-MM-yyyy")}
              </div>
            </div>
          </div>
        </TableCell>
        <TableCell>{job.company}</TableCell>
        <TableCell>
          <div className="flex items-center">
            <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
            <div className="truncate w-60">
              {job.city}, {job.state}, {job.country}
            </div>
          </div>
        </TableCell>
        <TableCell>
          <Badge variant="outline" className="capitalize">
            {job.category}
          </Badge>
        </TableCell>
        <TableCell title="View Job Applications">
          <Link href={`/admin/jobs/${job._id}/applications`}>
            <Badge variant="secondary">
              {job.applicationCount} applications
              <Eye className="size-6" />
            </Badge>
          </Link>
        </TableCell>
        <TableCell>
          <div className="flex flex-col gap-2 items-start justify-center">
            <Badge
              className="capitalize h-6"
              variant={status === "active" ? "success" : "inProgress"}
            >
              {isPending ? <Spinner spinnerClassName="size-4" /> : status}
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

      {isAlertModalOpen && (
        <ConfirmModal
          header="Delete Job"
          description="This will delete the job and all of its contents."
          isModalOpen={isAlertModalOpen}
          setIsModalOpen={setIsAlertModalOpen}
          disabled={isDeleteJobLoading}
          onConfirm={handleDeleteJob}
        />
      )}
    </>
  );
};
