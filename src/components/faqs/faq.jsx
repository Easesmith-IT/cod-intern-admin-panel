import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

import { TableCell, TableRow } from "@/components/ui/table";
import { DELETE, PATCH } from "@/constants/apiMethods";
import { useApiMutation } from "@/hooks/useApiMutation";
import { format } from "date-fns";
import parse from "html-react-parser";
import { Clock, HelpCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Actions } from "../shared/actions";
import { ConfirmModal } from "../shared/confirm-modal";
import Spinner from "../shared/Spinner";
import { Switch } from "../ui/switch";
import { options } from "@/constants/constants";

export const Faq = ({ faq }) => {
  const router = useRouter();
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isActive, setIsActive] = useState(faq.isActive || false);

  const {
    mutateAsync: updateStatus,
    isPending,
    error,
  } = useApiMutation({
    url: `/admin/faqs/update/${faq?._id}`,
    method: PATCH,
    invalidateKey: ["faq"],
  });

  const { mutateAsync: deleteFaq, isPending: isDeleteFaqLoading } =
    useApiMutation({
      url: `/admin/faqs/delete/${faq?._id}`,
      method: DELETE,
      invalidateKey: ["faq"],
    });

  const handleDeleteFaq = async () => {
    await deleteFaq();
  };

  const handleStatus = async (value) => {
    setIsActive(value);
    await updateStatus({ isActive: value });
  };

  useEffect(() => {
    setIsActive(faq.isActive);
  }, [faq, error]);

  const onDelete = () => {
    setIsAlertModalOpen(true);
  };

  const onView = () => {
    router.push(`/admin/faqs/${faq?._id}`);
  };

  const onEdit = () => {
    router.push(`/admin/faqs/${faq?._id}/update`);
  };

  // Truncate long text for display
  const truncateText = (text, maxLength = 50) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <>
      <TableRow>
        <TableCell className="font-medium">
          <div className="flex items-start space-x-3">
            <HelpCircle className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
            <div>
              <div className="font-medium whitespace-pre-wrap w-60">
                {truncateText(faq.question, 80)}
              </div>
              <div className="text-sm text-muted-foreground flex items-center mt-1">
                <Clock className="h-3 w-3 mr-1" />
                Created{" "}
                {faq.createdAt && format(new Date(faq.createdAt), "dd-MM-yyyy")}
              </div>
            </div>
          </div>
        </TableCell>
        <TableCell>
          <div className="whitespace-pre-wrap w-60 line-clamp-4 !my-editor">
            {faq.answer && parse(faq.answer, options)}
          </div>
        </TableCell>
        <TableCell>
          <Badge
            variant={faq.category === "General" ? "secondary" : "outline"}
            className="capitalize"
          >
            {faq.category}
          </Badge>
        </TableCell>
        <TableCell>
          {faq.courseId && faq.courseId.title ? (
            <div className="text-sm">
              <div className="font-medium">{faq.courseId.title}</div>
              {faq.courseId.description && (
                <div className="text-muted-foreground">
                  {truncateText(faq.courseId.description, 30)}
                </div>
              )}
            </div>
          ) : (
            <span className="text-muted-foreground">N/A</span>
          )}
        </TableCell>
        <TableCell className="text-center">
          <Badge variant="outline" className="min-w-8">
            {faq.order || 0}
          </Badge>
        </TableCell>
        <TableCell>
          <div className="flex flex-col gap-2 items-start justify-center">
            <Badge
              className="capitalize h-6"
              variant={isActive ? "success" : "secondary"}
            >
              {isPending ? (
                <Spinner spinnerClassName="size-4" />
              ) : isActive ? (
                "Active"
              ) : (
                "Inactive"
              )}
            </Badge>
            <Switch
              checked={isActive}
              onCheckedChange={handleStatus}
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
          header="Delete FAQ"
          description="This will permanently delete the FAQ. This action cannot be undone."
          isModalOpen={isAlertModalOpen}
          setIsModalOpen={setIsAlertModalOpen}
          disabled={isDeleteFaqLoading}
          onConfirm={handleDeleteFaq}
        />
      )}
    </>
  );
};
