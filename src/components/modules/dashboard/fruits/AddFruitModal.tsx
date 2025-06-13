"use client";

import { Button } from "@/components/ui/button";
import ImagePreviewer from "@/components/ui/core/ImageUpload/ImagePreviewer";
import ImageUploader from "@/components/ui/core/ImageUpload/ImageUploader";
import ButtonSpinner from "@/components/ui/core/Loader/ButtonSpinner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { uploadToCloudinary } from "@/helper/uploadToCloudinary";
import { useGetAllFruitCategoryQuery } from "@/redux/features/fruitCategory/fruitCategoryApi";
import { useAddFruitMutation } from "@/redux/features/fruits/fruitsApi";
import { IFruitCategory } from "@/types/fruit-category";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UnitType } from "@/types/fruit/fruit";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface AddFruitModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export const FormSchema = z.object({
  name: z.string().trim().min(1, "Fruit name is required"),
  category: z.string().trim().min(1, "Category is required"),
  regular_price: z
    .number({ invalid_type_error: "Regular price must be a number" })
    .gt(0, "Regular price must be greater than 0"),
  offer_price: z
    .number({ invalid_type_error: "Offer price must be a number" })
    .gt(0, "Offer price must be greater than 0"),
  inStock: z.boolean(),
  unit: z.string().trim().min(1, "Unit is required"),
  quantity: z
    .number({ invalid_type_error: "Quantity must be a number" })
    .min(0, "Quantity cannot be negative"),
  description: z.string().trim().min(1, "Description is required"),
});

const AddFruitModal: React.FC<AddFruitModalProps> = ({
  isOpen,
  onOpenChange,
}) => {
  const [imageUploading, setImageUploading] = useState<boolean>(false);
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      category: "",
      regular_price: 0,
      offer_price: 0,
      inStock: true,
      unit: "kg",
      quantity: 0,
      description: "",
    },
  });

  const [addFruit, { isLoading }] = useAddFruitMutation();
  const { data } = useGetAllFruitCategoryQuery(undefined);
  const fruitCategories: IFruitCategory[] = data?.data || [];

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (imageFiles?.length === 0) {
      toast.error("Please select an Image");
      return;
    }
    setImageUploading(true);
    try {
      const img = await uploadToCloudinary(imageFiles[0]);
      data["image"] = img;
    } catch (err: any) {
      toast.error("Failed to upload image. Please try again!");
      return;
    } finally {
      setImageUploading(false);
    }

    try {
      const res = await addFruit(data).unwrap();
      if (res?.success) {
        toast.success(res?.message);
        onOpenChange(false);
      } else {
        toast.error(res?.message || "Something went wrong!");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong!");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80%] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Fruit Item</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Fruit Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Fruit Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Category */}
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="w-full">
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="w-full">
                          {fruitCategories?.map((category: IFruitCategory) => (
                            <SelectItem key={category._id} value={category._id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Regular Price */}
                <FormField
                  control={form.control}
                  name="regular_price"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Regular Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Regular Price"
                          {...field}
                          value={field.value || ""}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Offer Price */}
                <FormField
                  control={form.control}
                  name="offer_price"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Offer Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Offer Price"
                          {...field}
                          value={field.value || ""}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Unit */}
                <FormField
                  control={form.control}
                  name="unit"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Unit</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="w-full">
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select unit" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="w-full">
                          {Object.values(UnitType).map((unit) => (
                            <SelectItem key={unit} value={unit}>
                              {unit}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Quantity */}
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Quantity"
                          {...field}
                          value={field.value || ""}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* In Stock */}
                <FormField
                  control={form.control}
                  name="inStock"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <Input
                          type="checkbox"
                          checked={field.value}
                          onChange={field.onChange}
                          className="w-auto h-auto scale-125 accent-green-600"
                        />
                      </FormControl>
                      <FormLabel>In Stock</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Description */}
              <div className="mt-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <textarea
                          placeholder="Enter description..."
                          className="w-full p-2 border rounded-md"
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-start mt-4">
                {imagePreview.length > 0 ? (
                  <ImagePreviewer
                    setImageFiles={setImageFiles}
                    imagePreview={imagePreview}
                    setImagePreview={setImagePreview}
                    // className="mt-8"
                  />
                ) : (
                  <div className="flex justify-start">
                    <ImageUploader
                      setImageFiles={setImageFiles}
                      setImagePreview={setImagePreview}
                      label="Upload Image"
                    />
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="text-right mt-6">
                <Button
                  type="submit"
                  className="disabled:cursor-not-allowed"
                  disabled={isLoading || imageUploading}
                >
                  Submit {(imageUploading || isLoading) && <ButtonSpinner />}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddFruitModal;
