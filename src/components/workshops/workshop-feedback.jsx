import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Skeleton } from "../ui/skeleton";
import { format } from "date-fns/format";

export const WorkshopFeedback = ({ feedback }) => {
  return (
    <TableRow>
      <TableCell>{feedback.firstName}</TableCell>
      <TableCell>{feedback.lastName}</TableCell>
      <TableCell>{feedback.collegeName}</TableCell>
      <TableCell>{feedback.enrolmentNumber}</TableCell>
      <TableCell>{feedback.contactNumber}</TableCell>
      <TableCell>{feedback.emailId}</TableCell>
      <TableCell>{feedback.overallSatisfaction}</TableCell>
      <TableCell>{feedback.topicRelevance}</TableCell>
      <TableCell>{feedback.trainerEffectiveness}</TableCell>
      <TableCell>{feedback.overallExperience}</TableCell>
      <TableCell>{feedback.additionalComments || "NA"}</TableCell>
      <TableCell>
        {feedback.submittedAt &&
          format(new Date(feedback.submittedAt), "dd/MM/yyyy")}
      </TableCell>
      <TableCell>
        {feedback.workshopDate &&
          format(new Date(feedback.workshopDate), "dd/MM/yyyy")}
      </TableCell>
      {/* <TableCell className="text-right"></TableCell> */}
    </TableRow>
  );
};

WorkshopFeedback.Skeleton = function WorkshopFeedbackSkeleton() {
  return (
    <TableRow>
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
      {/* <TableCell className="text-right">
        <Skeleton className="w-full h-5" />
      </TableCell> */}
    </TableRow>
  );
};
