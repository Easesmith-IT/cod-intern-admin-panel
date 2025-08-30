"use client";

import { ChangePassword } from "@/components/admins/ChangePassword";
import Spinner from "@/components/shared/Spinner";
import { TypographyH2 } from "@/components/typography/typography-h2";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PATCH } from "@/constants/apiMethods";
import { permissions } from "@/constants/permissions";
import { useApiMutation } from "@/hooks/useApiMutation";
import { useApiQuery } from "@/hooks/useApiQuery";
import { updatePreview } from "@/lib/updatePreview";
import { EditSubAdminSchema } from "@/schemas/AddSubAdminSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ImagePlus, Pencil } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const UpdateAdmin = () => {
  const router = useRouter();
  const params = useParams();

  const { data, isLoading, error } = useApiQuery({
    url: `/admin/admins/get-details/${params?.adminId}`,
    queryKeys: ["admin"],
  });

  console.log("data", data);

  const {
    name,
    email,
    role,
    position,
    phone,
    permissions: dbPermissions,
    _id,
    status,
    profileImage: image,
  } = data?.admin || {};

  const form = useForm({
    resolver: zodResolver(EditSubAdminSchema),
    defaultValues: {
      position: "manager",
      role: "subadmin",
      name: "",
      status: "",
      phoneNumber: "",
      profileImage: "",
      profileImagePreview: "",
      email: "",
      password: "",
      permissions: {
        dashboard: "none",
        admin: "none",
        job: "none",
        student: "none",
        review: "none",
        content: "none",
        course: "none",
        faq: "none",
        instructor: "none",
      },
    },
  });

  const { control, reset, handleSubmit, register, watch, setValue, getValues } =
    form;
  const [isChangePassword, setIsChangePassword] = useState(false);

  console.log("getValues", getValues());

  const profileImageRef = register("profileImage");
  const profileImage = watch("profileImage");

  useEffect(() => {
    updatePreview(profileImage, "profileImagePreview", setValue);
  }, [form, profileImage]);

  useEffect(() => {
    if (data?.admin) {
      reset({
        name,
        email,
        permissions: dbPermissions,
        phoneNumber: phone,
        position,
        profileImagePreview: image,
        status,
        // role,
      });
    }
  }, [data]);

  const {
    mutateAsync: submitForm,
    isPending: isSubmitFormLoading,
    data: result,
  } = useApiMutation({
    url: `/admin/admins/update/${_id}`,
    method: PATCH,
    invalidateKey: ["admin"],
    // isToast: false,
  });

  const onSubmit = async (data) => {
    console.log("data", data);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phoneNumber);
    formData.append("status", data.status);
    formData.append("password", data.password);
    formData.append("position", data.position);
    formData.append("permissions", JSON.stringify(data.permissions));
    formData.append("image", data.profileImage[0]);
    await submitForm(formData);
  };

  const onError = (errors) => {
    console.log("errors", errors);
  };

  useEffect(() => {
    if (result) {
      console.log("result", result);
      router.push("/admin/admins");
    }
  }, [result]);

  return (
    <div className="space-y-5">
      <button
        onClick={() => router.push("/admin/admins")}
        className="flex gap-1 items-center mb-4"
      >
        <ArrowLeft className="text-3xl cursor-pointer" />
        <TypographyH2 heading="Update Admin" />
      </button>

      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="mx-auto w-full border rounded-xl bg-white px-5 py-4"
        >
          <div className="grid grid-cols-[208px_1fr] items-start gap-6">
            <FormField
              control={control}
              name="profileImage"
              render={({ field }) => (
                <FormItem>
                  <div className="w-52">
                    <FormLabel className="cursor-pointer">
                      {!watch("profileImagePreview") && (
                        <div className="border-2 border-dashed border-[#C2CDD6] w-52 h-52 rounded-lg flex flex-col justify-center items-center">
                          <div className="flex flex-col items-center primary-color border-dashed rounded px-5">
                            <ImagePlus className="h-8 w-8 text-neutral-700" />
                            <p className="font-bold text-neutral-700 mt-2 text-center primary-color text-sm">
                              Add Photo
                            </p>
                          </div>
                        </div>
                      )}
                      {watch("profileImagePreview") && (
                        <div className="relative">
                          <div
                            type="button"
                            className="size-7 absolute shadow top-1 right-1 p-1.5 rounded-full bg-white flex justify-center items-center"
                          >
                            <Pencil />
                          </div>
                          <img
                            className="w-52 h-52"
                            src={getValues("profileImagePreview")}
                            alt=""
                          />
                        </div>
                      )}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        className="placeholder:text-[#3B3B3B] hidden w-full"
                        {...profileImageRef}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-3 gap-6">
              <FormField
                control={control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position</FormLabel>
                    <FormControl>
                      <Select
                        key={field.value}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="flex justify-between w-full items-center h-10 text-sm font-normal font-sans border">
                          <SelectValue placeholder="Select Position" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="manager">Manager</SelectItem>
                          <SelectItem value="support">Support</SelectItem>
                          <SelectItem value="analyst">Analyst</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Select
                        key={field.value}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="flex justify-between w-full items-center h-10 text-sm font-normal font-sans border">
                          <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                        <SelectContent>
                          {/* <SelectItem value="superAdmin">Super Admin</SelectItem> */}
                          <SelectItem value="subadmin">Sub Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Full Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone number</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="10- digit number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Email address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select
                        key={field.value}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="flex justify-between w-full items-center h-10 text-sm font-normal font-sans border">
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="blocked">Blocked</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Label className="text-base font-medium inline-block mt-5">
            Permissions
          </Label>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 mt-1">
            {permissions.map((permission) => (
              <FormField
                key={permission.value}
                control={control}
                name={`permissions.${permission.value}`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium capitalize">
                      {permission.label}
                    </FormLabel>
                    <FormControl>
                      <Select
                        key={field.value}
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full text-[#6B7280] text-sm font-normal font-inter">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="read">Read</SelectItem>
                            <SelectItem value="read&write">
                              Read and Write
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            ))}
          </div>

          <Button
            type="button"
            onClick={() => setIsChangePassword(true)}
            variant="link"
            className="text-blue-600 px-0 mt-2"
          >
            Change password
          </Button>

          <div className="flex justify-end">
            <Button type="submit" variant="codIntern" size="" className="px-10">
              {isSubmitFormLoading ? (
                <Spinner spinnerClassName="size-6" />
              ) : (
                "Update"
              )}
            </Button>
          </div>
        </form>
      </Form>
      {isChangePassword && (
        <ChangePassword
          isChangePassword={isChangePassword}
          setIsChangePassword={setIsChangePassword}
        />
      )}
    </div>
  );
};

export default UpdateAdmin;
