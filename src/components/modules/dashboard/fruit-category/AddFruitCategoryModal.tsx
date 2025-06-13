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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { uploadToCloudinary } from "@/helper/uploadToCloudinary";
import { useAddFruitCategoryMutation } from "@/redux/features/fruitCategory/fruitCategoryApi";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

interface AddFriutCategoryModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const AddFruitCategoryModal: React.FC<AddFriutCategoryModalProps> = ({
  isOpen,
  onOpenChange,
}) => {
  const [imageUploading, setImageUploading] = useState<boolean>(false);
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);
  const form = useForm({
    defaultValues: {
      name: "",
    },
  });

  const [addFruitCategory, { isLoading }] = useAddFruitCategoryMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (imageFiles?.length === 0) {
      toast.error("Please select an Image");
      return;
    }
    if (data?.name?.trim() === "") {
      toast.error("Please enter category name");
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
      const res = await addFruitCategory(data).unwrap();
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Fruit Category</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex justify-center mb-4">
                {imagePreview.length > 0 ? (
                  <ImagePreviewer
                    setImageFiles={setImageFiles}
                    imagePreview={imagePreview}
                    setImagePreview={setImagePreview}
                    // className="mt-8"
                  />
                ) : (
                  <div>
                    <ImageUploader
                      setImageFiles={setImageFiles}
                      setImagePreview={setImagePreview}
                      label="Upload Icon"
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between gap-4 pt-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Fruit Category Name..."
                          {...field}
                          value={field.value || ""}
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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

export default AddFruitCategoryModal;
