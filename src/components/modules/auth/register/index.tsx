"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import image from "../../../../assets/logo.png";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRegisterMutation } from "@/redux/features/user/userApi";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  phone_number: z
    .string({ required_error: "Phone number is required" })
    .trim()
    .regex(/^[0-9]{11}$/, "Phone number must be exactly 11 digits (0-9)"),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(6, "Password must be at least 6 characters long"),
});

const RegisterComponent = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phone_number: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const res = await register(data).unwrap();
      if (res?.success) {
        toast.success(res?.message);
        router.push("/login");
      } else {
        toast.error(res?.message || "Something went wrong!");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong!");
    }
  }

  return (
    <Card className="w-[400px] mx-auto">
      <CardHeader>
        <Image
          src={image}
          alt={"logo"}
          width={400}
          height={400}
          className="w-[200px] mx-auto mb-4"
          priority
        />
        <div className="text-center">
          <CardTitle>Hey there!</CardTitle>
          <CardDescription>Register your account.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormDescription>
                    Password should be at least 6 characters long.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full cursor-pointer disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              Register {isLoading && <Loader2 className="animate-spin" />}
            </Button>
          </form>
        </Form>
        <p className="pt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-primary underline font-medium">
            Log In
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

export default RegisterComponent;
