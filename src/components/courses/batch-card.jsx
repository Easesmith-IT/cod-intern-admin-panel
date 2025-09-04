import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageIcon, IndianRupee, Users, X } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import DatePicker from "../shared/DatePicker";
import { useEffect } from "react";
import { updatePreview } from "@/lib/updatePreview";

export const BatchCard = ({
  batchIndex,
  weekDays,
  formatTimeForInput,
  formatTimeForDisplay,
  onRemove,
}) => {
  const {
    setValue,
    getValues,
    watch,
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const {
    fields: highlightFields,
    append: appendHighlight,
    remove: removeHighlight,
  } = useFieldArray({
    control: control,
    name: `batches.${batchIndex}.batchHighlights`,
  });

  console.log("getValues", getValues());

  const imageRef = register(`batches.${batchIndex}.image`);
  const image = watch(`batches.${batchIndex}.image`);
  const imagePreview = watch(`batches.${batchIndex}.imagePreview`);

  console.log("image", image);
  

  useEffect(() => {
    image && updatePreview(image, `batches.${batchIndex}.imagePreview`, setValue);
  }, [setValue, image]);

  const removeImage = () => {
    setValue(`batches.${batchIndex}.image`, null);
    setValue(`batches.${batchIndex}.imagePreview`, "");
  };

  console.log("errors", errors);

  const selectedDays = watch(`batches.${batchIndex}.schedule.days`) || [];
  const price = watch(`batches.${batchIndex}.price`) || 0;
  const offerPrice = watch(`batches.${batchIndex}.offerPrice`) || 0;

  const savings =
    price && offerPrice && offerPrice < price ? price - offerPrice : 0;
  const savingsPercentage =
    savings > 0 ? Math.round((savings / price) * 100) : 0;

  const toggleDay = (day) => {
    const currentDays = getValues(`batches.${batchIndex}.schedule.days`) || [];
    if (currentDays.includes(day)) {
      setValue(
        `batches.${batchIndex}.schedule.days`,
        currentDays.filter((d) => d !== day)
      );
    } else {
      setValue(`batches.${batchIndex}.schedule.days`, [...currentDays, day]);
    }
  };

  return (
    <div className="border rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">Batch {batchIndex + 1}</h4>
        {onRemove && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="text-red-600 hover:text-red-700"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <FormField
        control={control}
        name={`batches.${batchIndex}.image`}
        render={({ field }) => (
          <FormItem>
            <div className="w-52">
              <FormLabel className="cursor-pointer">
                {!imagePreview && (
                  <div className="border-2 border-dashed border-[#C2CDD6] w-52 h-40 rounded-lg flex flex-col justify-center items-center">
                    <div className="flex flex-col items-center border-dashed rounded px-5">
                      <ImageIcon className="h-8 w-8 text-neutral-700" />
                      <p className="font-bold text-neutral-700 mt-2 text-center text-sm">
                        Upload Thumbnail
                      </p>
                      <span className="text-xs text-gray-500">
                        PNG, JPG up to 4.5MB
                      </span>
                    </div>
                  </div>
                )}
              </FormLabel>
              {imagePreview && (
                <div className="relative inline-block">
                  <img
                    src={imagePreview}
                    alt="Thumbnail preview"
                    className="w-52 h-40 object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}

              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  {...imageRef}
                />
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <FormField
          control={control}
          name={`batches.${batchIndex}.name`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Batch Name *</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., Morning Batch - January 2024"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`batches.${batchIndex}.status`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <FormField
          control={control}
          name={`batches.${batchIndex}.startDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date *</FormLabel>
              <FormControl>
                <DatePicker value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={`batches.${batchIndex}.endDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date (Not using on website)</FormLabel>
              <FormControl>
                <DatePicker value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Schedule */}
      <div>
        <FormLabel>Class Schedule * (Not using on website)</FormLabel>
        <div className="mt-2 space-y-3">
          {/* Days Selection */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Select class days:
            </p>
            <div className="flex flex-wrap gap-2">
              {weekDays.map((day) => (
                <Button
                  key={day}
                  type="button"
                  variant={selectedDays.includes(day) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleDay(day)}
                  className="text-xs"
                >
                  {day.slice(0, 3)}
                </Button>
              ))}
            </div>
            {errors?.batches?.[batchIndex]?.schedule?.days?.message && (
              <FormMessage>
                {errors.batches[batchIndex]?.schedule?.days.message}
              </FormMessage>
            )}
          </div>

          {/* Time Selection */}
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={control}
              name={`batches.${batchIndex}.schedule.time.start`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Time * (Not using on website)</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`batches.${batchIndex}.schedule.time.end`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Time * (Not using on website)</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>

      {/* Pricing & Seats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <FormField
          control={control}
          name={`batches.${batchIndex}.seatsLimit`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Seats Limit *</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type="number"
                    placeholder="50"
                    {...field}
                    onChange={(e) =>
                      field.onChange(Number(e.target.value) || 0)
                    }
                  />
                  <Users className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={`batches.${batchIndex}.price`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Regular Price *</FormLabel>
              <FormControl>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="number"
                    placeholder="29999"
                    className="pl-10"
                    {...field}
                    onChange={(e) =>
                      field.onChange(Number(e.target.value) || 0)
                    }
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={`batches.${batchIndex}.offerPrice`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Offer Price</FormLabel>
              <FormControl>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="number"
                    placeholder="19999"
                    className="pl-10"
                    {...field}
                    onChange={(e) =>
                      field.onChange(Number(e.target.value) || 0)
                    }
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Savings Display */}
      {savings > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-2">
          <div className="text-sm text-green-800">
            Students Save: ₹{savings.toLocaleString()} ({savingsPercentage}%
            off)
          </div>
        </div>
      )}

      <div>
        <FormLabel>Batch Highlights</FormLabel>
        <div className="space-y-3 mt-2">
          {highlightFields.map((field, index) => (
            <div
              key={field.id}
              className="flex items-center gap-2 border rounded-lg p-2"
            >
              <FormField
                control={control}
                name={`batches.${batchIndex}.batchHighlights.${index}.text`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        placeholder="e.g., Live interactive classes"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeHighlight(index)}
                className="text-red-600 hover:text-red-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => appendHighlight({ text: "" })}
            className="w-full"
          >
            + Add Highlight
          </Button>
        </div>
      </div>
    </div>
  );
};
