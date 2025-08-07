"use client";

import { TypographyH2 } from "@/components/typography.jsx/typography-h2";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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

const CreateJob = () => {
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
 
   const onSubmit = (data) => {
     console.log("data", data);
   };
 
   return (
     <div className="space-y-5">
       <button
         onClick={() => router.push("/admin/jobs")}
         className="flex gap-1 items-center mb-4"
       >
         <ArrowLeft className="text-3xl cursor-pointer" />
         <TypographyH2 heading="Add Job" />
       </button>

       <Form {...form}>
         <form
           onSubmit={handleSubmit(onSubmit)}
           className="mx-auto w-full border rounded-xl bg-white px-5 py-4"
         >
           <div className="grid grid-cols-3 gap-6">
             <FormField
               control={control}
               name="title"
               render={({ field }) => (
                 <FormItem>
                   <FormLabel>Job Title</FormLabel>
                   <FormControl>
                     <Input placeholder="Job Title" {...field} />
                   </FormControl>
                   <FormMessage />
                 </FormItem>
               )}
             />
             <FormField
               control={control}
               name="postingDate"
               render={({ field }) => (
                 <FormItem>
                   <FormLabel>Posting Date</FormLabel>
                   <FormControl>
                     <Calendar
                       mode="single"
                    //    selected={value}
                    //    onSelect={handleDateSelect}
                       initialFocus
                     />
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
                       <Select
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

           <div className="flex justify-end">
             <Button
               type="submit"
               variant="codIntern"
               size=""
               className="px-10"
             >
               Add
             </Button>
           </div>
         </form>
       </Form>
     </div>
   );
}

export default CreateJob