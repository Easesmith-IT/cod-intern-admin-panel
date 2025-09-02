import { Edit, Upload, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { updatePreview } from "@/lib/updatePreview";
import { Card, CardContent } from "@/components/ui/card";

export const InfoCard = ({ index }) => {
  const { control, watch, formState, setValue } = useFormContext();
  const { isSubmitted, submitCount } = formState;
  const [isEdit, setIsEdit] = useState(false);
  const name = `infos.${index}`;

  const values = watch(`infos.${index}`);

  useEffect(() => {
    if (isSubmitted) setIsEdit(false);
  }, [submitCount, isSubmitted]);

  const imageFile = watch(`${name}.image`); // actual file
  const imagePreview = watch(`${name}.imagePreview`); // preview url

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // store actual File object
      setValue(`${name}.image`, file);
      // update preview as base64 string
      updatePreview(e.target.files, `${name}.imagePreview`, setValue);
    }
  };

  return (
    <Card className="rounded-md relative shadow-[0px_4px_30px_0px_ #0000001A] border-[#9237E333]">
      <CardContent>
        <button
          type="button"
          onClick={() => setIsEdit((prev) => !prev)}
          className="absolute top-2 right-2"
        >
          {isEdit ? <X size={18} /> : <Edit size={18} />}
        </button>

        {isEdit ? (
          <div className="space-y-3">
            <div className="space-y-2">
              <FormLabel>Image</FormLabel>
              {imagePreview && (
                <Image
                  src={imagePreview}
                  alt="Preview"
                  width={52}
                  height={52}
                />
              )}
              <div className="flex items-center gap-3">
                <label className="cursor-pointer flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-md border hover:bg-gray-200">
                  <Upload className="size-4" />
                  <span className="text-sm">Upload Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
                {/* {imagePreview && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      setValue(`${name}.image`, null);
                      setValue(`${name}.imagePreview`, "");
                    }}
                  >
                    Remove
                  </Button>
                )} */}
              </div>
            </div>
            {/* Title */}
            <FormField
              control={control}
              name={`infos.${index}.title`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={control}
              name={`infos.${index}.desc`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea className="resize-none" rows={4} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ) : (
          <div>
            <Image
              src={values.imagePreview}
              width={52}
              height={52}
              alt={values.title}
            />
            <h4 className="font-stolzl font-medium text-lg">{values.title}</h4>
            <p className="text-sm text-para mt-2">{values.desc}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
