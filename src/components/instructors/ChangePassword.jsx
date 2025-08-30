import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TypographyH2 } from "../typography/typography-h2";
import { Button } from "../ui/button";
import { changePasswordSchema } from "@/schemas/AddSubAdminSchema";
import { TypographyH3 } from "../typography/typography-h3";
import { TypographyH4 } from "../typography/typography-h4";
import { useApiMutation } from "@/hooks/useApiMutation";
import { PATCH } from "@/constants/apiMethods";
import { useParams } from "next/navigation";
import Spinner from "../shared/Spinner";

export const ChangePassword = ({ isChangePassword, setIsChangePassword }) => {
  const params = useParams();

  const form = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const {
    mutateAsync: submitForm,
    isPending: isSubmitFormLoading,
    data: result,
  } = useApiMutation({
    url: "/admin/instructors/change-password",
    method: PATCH,
    invalidateKey: ["instructor"],
    // isToast: false,
  });

  const onSubmit = async (data) => {
    console.log("data :", data);
    await submitForm({ ...data, instructorId: params.id });
  };

  useEffect(() => {
    if (result) {
      setIsChangePassword(false);
    }
  }, [result]);

  return (
    <Dialog open={isChangePassword} onOpenChange={setIsChangePassword}>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <TypographyH4 heading="Change Password" />
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={`text-[#111928] font-semibold font-inter opacity-80`}
                  >
                    Old Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#84818C] h-4 w-4" />
                      <Input
                        type={showOldPassword ? "text" : "password"}
                        placeholder="Enter Password"
                        className="pl-10 pr-10"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowOldPassword(!showOldPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showOldPassword ? (
                          <EyeOff className="h-4 w-4 cursor-pointer" />
                        ) : (
                          <Eye className="h-4 w-4 cursor-pointer" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={`text-[#111928] font-semibold font-inter opacity-80`}
                  >
                    New Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#84818C] h-4 w-4" />
                      <Input
                        type={showNewPassword ? "text" : "password"}
                        placeholder="Enter Password"
                        className="pl-10 pr-10"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showNewPassword ? (
                          <EyeOff className="h-4 w-4 cursor-pointer" />
                        ) : (
                          <Eye className="h-4 w-4 cursor-pointer" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button
                disabled={isSubmitFormLoading}
                type="submit"
                variant="codIntern"
                className="text-sm"
              >
                {isSubmitFormLoading ? <Spinner /> : "Change Password"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
