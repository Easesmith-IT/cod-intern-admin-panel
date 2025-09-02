import { updatePreview } from "@/lib/updatePreview";
import { Edit, Upload, X } from "lucide-react";
import Image from "next/image";
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

const Info = ({ item, index }) => {
  const { control, watch, formState, setValue } = useFormContext();
  const { isSubmitted, submitCount } = formState;
  const [isEdit, setIsEdit] = useState(false);
  const name = `stats.${index}`;

  const values = watch(`stats.${index}`);

  useEffect(() => {
    if (isSubmitted) setIsEdit(false);
  }, [submitCount, isSubmitted]);

  const imageFile = watch(`${name}.icon`); // actual file
  const imagePreview = watch(`${name}.iconPreview`); // preview url

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // store actual File object
      setValue(`${name}.icon`, file);
      // update preview as base64 string
      updatePreview(e.target.files, `${name}.iconPreview`, setValue);
    }
  };
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsEdit((prev) => !prev)}
        className="absolute top-2 right-2 text-white"
      >
        {isEdit ? <X size={18} /> : <Edit size={18} />}
      </button>
      {isEdit ? (
        <div className="space-y-3">
          <div className="space-y-2 ">
            <FormLabel className="text-white">Image</FormLabel>
            {imagePreview && (
              <Image src={imagePreview} alt="Preview" width={37} height={37} />
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
            name={`stats.${index}.number`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Numbers</FormLabel>
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
            name={`stats.${index}.label`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Label</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      ) : (
        <div className="text-white space-y-4 flex flex-col items-center">
          <Image
            src={values.iconPreview}
            width={37}
            height={37}
            alt="Reviews"
          />
          <h3 className="font-stolzl text-lg sm:text-2xl md:text-4xl font-medium">
            {values.number}+
          </h3>
          <p className="font-book text-sm sm:text-base font-stolzl text-center">
            {values.label}
          </p>
        </div>
      )}
    </div>
  );
};

export default Info;
