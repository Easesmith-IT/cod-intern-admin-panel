"use client";

import { ChangePassword } from "@/components/admins/ChangePassword";
import { TypographyH2 } from "@/components/typography.jsx/typography-h2";
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
import { permissions } from "@/constants/permissions";
import { AddSubAdminSchema } from "@/schemas/AddSubAdminSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const UpdateAdmin = () => {
 const router = useRouter();
 const form = useForm({
   resolver: zodResolver(AddSubAdminSchema),
   defaultValues: {
     position: "manager",
     role: "subadmin",
     name: "",
     phoneNumber: "",
     email: "",
     password: "",
     cityName: "",
     permissions: {
       dashboard: "none",
       admins: "none",
       review: "none",
     },
   },
 });

 const { control, reset, handleSubmit } = form;
 const [isShowPassword, setIsShowPassword] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);

 const onSubmit = (data) => {
   console.log("data", data);
 };

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
         onSubmit={handleSubmit(onSubmit)}
         className="mx-auto w-full border rounded-xl bg-white px-5 py-4"
       >
         <div className="grid grid-cols-3 gap-6">
           <FormField
             control={control}
             name="position"
             render={({ field }) => (
               <FormItem>
                 <FormLabel>Position</FormLabel>
                 <FormControl>
                   <Select value={field.value} onValueChange={field.onChange}>
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
                   <Select value={field.value} onValueChange={field.onChange}>
                     <SelectTrigger className="flex justify-between w-full items-center h-10 text-sm font-normal font-sans border">
                       <SelectValue placeholder="Select Role" />
                     </SelectTrigger>
                     <SelectContent>
                       <SelectItem value="subadmin">Subadmin</SelectItem>
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
                   <Input type="email" placeholder="Email address" {...field} />
                 </FormControl>
                 <FormMessage />
               </FormItem>
             )}
           />

           <FormField
             control={control}
             name="password"
             render={({ field }) => (
               <FormItem>
                 <FormLabel>Password</FormLabel>
                 <FormControl>
                   <div className="relative">
                     <Input
                       type={isShowPassword ? "text" : "password"}
                       placeholder="*************"
                       {...field}
                     />
                     <button
                       type="button"
                       onClick={() => setIsShowPassword(!isShowPassword)}
                       className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                     >
                       {isShowPassword ? (
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
         </div>

         <Label className="text-base font-medium inline-block mt-5">
           Permissions
         </Label>

         <div className="grid grid-cols-6 gap-3 mt-1">
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
                     <Select onValueChange={field.onChange} value={field.value}>
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

         {isChangePassword && (
           <ChangePassword
             isChangePassword={isChangePassword}
             setIsChangePassword={setIsChangePassword}
           />
         )}

         <div className="flex justify-end">
           <Button type="submit" variant="codIntern" size="" className="px-10">
             Update
           </Button>
         </div>
       </form>
     </Form>
   </div>
 );
}

export default UpdateAdmin