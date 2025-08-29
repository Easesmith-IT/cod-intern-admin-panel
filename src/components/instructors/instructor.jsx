import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

import { TableCell, TableRow } from "@/components/ui/table";
import { DELETE, PATCH } from "@/constants/apiMethods";
import { useApiMutation } from "@/hooks/useApiMutation";
import { format } from "date-fns";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { Actions } from "../shared/actions";
import { ConfirmModal } from "../shared/confirm-modal";
import Spinner from "../shared/Spinner";
import { Switch } from "../ui/switch";
import { Skeleton } from "../ui/skeleton";

export const Instructor = ({ instructor }) => {
  const router = useRouter();
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isActive, setIsActive] = useState(instructor.isActive || false);

  const {
    mutateAsync: toggleStatus,
    isPending,
  } = useApiMutation({
    url: `/admin/instructors/${instructor?._id}/toggle-status`,
    method: PATCH,
    invalidateKey: ["instructors"],
  });

  const { mutateAsync: deleteInstructor, isPending: isDeleteInstructorLoading } =
    useApiMutation({
      url: `/admin/instructors/${instructor?._id}`,
      method: DELETE,
      invalidateKey: ["instructors"],
    });

  const handleDeleteInstructor = async () => {
    await deleteInstructor();
  };

  const handleStatusToggle = async (value) => {
    setIsActive(value);
    await toggleStatus();
  };

  useEffect(() => {
    setIsActive(instructor.isActive);
  }, [instructor]);

  const onDelete = () => {
    setIsAlertModalOpen(true);
  };
  
  const onView = () => {
    router.push(`/admin/instructors/${instructor?._id}`);
  };

  const onEdit = () => {
    router.push(`/admin/instructors/${instructor?._id}/update`);
  };

  return (
    <>
      <TableRow>
        <TableCell className="font-medium">
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8 rounded-none shrink-0">
              <AvatarImage
                src={instructor.profileImage || "/user-placeholder.png"}
                alt={`${instructor.firstName} ${instructor.lastName}`}
                className="object-cover"
              />
              <AvatarFallback>
                {instructor.firstName?.charAt(0)}{instructor.lastName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{instructor.firstName} {instructor.lastName}</p>
              <p className="text-sm text-muted-foreground">{instructor.email}</p>
            </div>
          </div>
        </TableCell>
        
        <TableCell>{instructor.phone || "N/A"}</TableCell>
        
        <TableCell>
          <div className="flex flex-wrap gap-1 max-w-32">
            {instructor.expertise?.slice(0, 2).map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {instructor.expertise?.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{instructor.expertise.length - 2}
              </Badge>
            )}
          </div>
        </TableCell>
        
        <TableCell>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-500" />
            <span className="text-sm">{instructor.ratings?.average || 0}</span>
            <span className="text-xs text-muted-foreground">
              ({instructor.ratings?.count || 0})
            </span>
          </div>
        </TableCell>
        
        <TableCell>{instructor.courses?.length || 0}</TableCell>
        
        <TableCell>{instructor.certifications?.length || 0}</TableCell>
        
        <TableCell>
          <div className="flex flex-col gap-2 items-start justify-center">
            <Badge className="capitalize h-6" variant={isActive ? "success" : "secondary"}>
              {isPending ? <Spinner spinnerClassName="size-4" /> : (isActive ? "Active" : "Inactive")}
            </Badge>
            <Switch
              checked={isActive}
              onCheckedChange={handleStatusToggle}
              disabled={isPending}
            />
          </div>
        </TableCell>
        
        <TableCell className="text-right">
          <Actions onDelete={onDelete} onEdit={onEdit} onView={onView} />
        </TableCell>
      </TableRow>

      {isAlertModalOpen && (
        <ConfirmModal
          header="Delete Instructor"
          description="This will delete the instructor and remove them from all associated courses."
          isModalOpen={isAlertModalOpen}
          setIsModalOpen={setIsAlertModalOpen}
          disabled={isDeleteInstructorLoading}
          onConfirm={handleDeleteInstructor}
        />
      )}
    </>
  );
};

Instructor.Skeleton = function InstructorSkeleton() {
  return (
    <TableRow>
      <TableCell>
        <div className="inline-flex gap-2 items-center w-full">
          <Skeleton className="size-8 rounded-full shrink-0" />
          <div className="flex-1 space-y-1">
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-3/4 h-3" />
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Skeleton className="w-full h-5" />
      </TableCell>
      <TableCell>
        <div className="flex gap-1">
          <Skeleton className="w-16 h-5" />
          <Skeleton className="w-16 h-5" />
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
      <TableCell className="text-right">
        <Skeleton className="w-full h-5" />
      </TableCell>
    </TableRow>
  );
};
