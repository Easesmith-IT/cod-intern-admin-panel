import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

import { TableCell, TableRow } from "@/components/ui/table";
import { DELETE, PATCH } from "@/constants/apiMethods";
import { useApiMutation } from "@/hooks/useApiMutation";
import { format } from "date-fns";
import { Clock, Eye, IndianRupee, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { Actions } from "../shared/actions";
import { ConfirmModal } from "../shared/confirm-modal";
import Spinner from "../shared/Spinner";
import { Switch } from "../ui/switch";
import Link from "next/link";

export const Course = ({ course }) => {
  const router = useRouter();
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [status, setStatus] = useState(course.status || "");

  const {
    customId,
    batches,
    pricing,
    instructors,
    thumbnail,
    title,
    createdAt,
    category,
    averageRating,
    level,
  } = course;

  const {
    mutateAsync: updateStatus,
    isPending,
    data,
    error,
  } = useApiMutation({
    url: `/admin/courses/${course?._id}/status`,
    method: PATCH,
    invalidateKey: ["course"],
  });

  const { mutateAsync: deleteCourse, isPending: isDeleteCourseLoading } =
    useApiMutation({
      url: `/admin/courses/${course?._id}?deleteType=soft`,
      method: DELETE,
      invalidateKey: ["course"],
    });

  const handleDeleteCourse = async () => {
    await deleteCourse();
  };

  const handleStatus = async (value) => {
    const currentStatus = value ? "published" : "draft";
    setStatus(() => currentStatus);
    await updateStatus({ status: currentStatus });
  };

  useEffect(() => {
    setStatus(course.status);
  }, [course, error]);

  const onDelete = () => {
    setIsAlertModalOpen(true);
  };

  const onView = () => {
    router.push(`/admin/courses/${course?._id}`);
  };

  const onEdit = () => {
    router.push(`/admin/courses/${course?._id}/update`);
  };

  // Calculate total enrolled students across all batches
  const totalStudents =
    batches?.reduce((total, batch) => {
      return total + (batch.students?.length || 0);
    }, 0) || 0;

  // Get the price from pricing object or first batch
  const coursePrice =
    pricing?.discountPrice ||
    pricing?.price ||
    batches?.[0]?.offerPrice ||
    batches?.[0]?.price ||
    0;

  // Get instructor names
  const instructorNames =
    instructors
      ?.map((instructor) =>
        typeof instructor === "object" ? instructor.name : instructor
      )
      .join(", ") || "Not assigned";

  return (
    <>
      <TableRow>
        <TableCell className="font-medium">{customId || "NA"}</TableCell>
        <TableCell className="font-medium">
          <div className="flex items-start space-x-3">
            <Avatar className="h-8 w-8 rounded-none">
              <AvatarImage
                src={thumbnail || "/user-placeholder.png"}
                alt={title}
                className="object-contain"
              />
              <AvatarFallback>
                {title
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium whitespace-pre-wrap w-40">
                {title}
              </div>
              <div className="text-sm text-muted-foreground flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                Created {createdAt && format(new Date(createdAt), "dd-MM-yyyy")}
              </div>
            </div>
          </div>
        </TableCell>
        <TableCell>
          <div className="whitespace-pre-wrap w-32">{instructorNames}</div>
        </TableCell>
        <TableCell>
          <Badge variant="outline" className="capitalize">
            {category}
          </Badge>
        </TableCell>
        <TableCell className="capitalize">
          {level}
        </TableCell>
        <TableCell>
          <div className="font-medium flex items-center">
            <IndianRupee className="size-3" />
            <span>{coursePrice?.toLocaleString() || "Free"}</span>
          </div>
        </TableCell>
        <TableCell title="Total enrolled students across all batches">
          <div className="flex items-center">
            <Users className="h-3 w-3 mr-1 text-muted-foreground" />
            <span>{totalStudents}</span>
          </div>
        </TableCell>
        <TableCell>
          <div className="flex flex-col gap-2 items-start justify-center">
            <Badge
              className="capitalize h-6"
              variant={
                status === "published"
                  ? "success"
                  : status === "archived"
                  ? "destructive"
                  : "inProgress"
              }
            >
              {isPending ? <Spinner spinnerClassName="size-4" /> : status}
            </Badge>
            {status !== "archived" && (
              <Switch
                checked={status === "published"}
                onCheckedChange={handleStatus}
              />
            )}
          </div>
        </TableCell>
        <TableCell>
          <div className="flex items-center">
            <span className="text-yellow-500">★</span>
            <span className="ml-1">{averageRating?.toFixed(1) || "0.0"}</span>
          </div>
        </TableCell>
        <TableCell className="text-right">
          <Actions onDelete={onDelete} onEdit={onEdit} onView={onView} />
        </TableCell>
      </TableRow>

      {isAlertModalOpen && (
        <ConfirmModal
          header="Archive Course"
          description="This will archive the course and make it unavailable for new enrollments."
          isModalOpen={isAlertModalOpen}
          setIsModalOpen={setIsAlertModalOpen}
          disabled={isDeleteCourseLoading}
          onConfirm={handleDeleteCourse}
        />
      )}
    </>
  );
};
