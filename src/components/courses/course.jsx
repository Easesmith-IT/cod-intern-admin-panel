import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import { TableCell, TableRow } from "@/components/ui/table";
import {
    IndianRupee
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Actions } from "../shared/actions";

export const Course = ({ course }) => {
  const router = useRouter();

  const onDelete = () => {};

  const onEdit = () => {
    router.push("/admin/admins/update");
  };

  return (
    <TableRow>
      <TableCell className="font-medium">
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={"/user-placeholder.png"} alt={"Course"} />
            <AvatarFallback>
              {course.title
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="font-medium">{course.title}</div>
        </div>
      </TableCell>
      <TableCell>{course.instructor}</TableCell>
      <TableCell>
        <Badge variant="outline">{course.category}</Badge>
      </TableCell>
      <TableCell>
        <div className="font-medium flex items-center">
          <IndianRupee className="size-3" />
          <span>{course.price}</span>
        </div>
      </TableCell>
      <TableCell>{course.students.toLocaleString()}</TableCell>
      <TableCell>
        <Badge
          variant={course.status === "Published" ? "success" : "unpublished"}
        >
          {course.status}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="flex items-center">
          <span className="text-yellow-500">★</span>
          <span className="ml-1">{course.rating}</span>
        </div>
      </TableCell>
      <TableCell className="text-right">
        <Actions onDelete={onDelete} onEdit={onEdit} />
      </TableCell>
    </TableRow>
  );
};
