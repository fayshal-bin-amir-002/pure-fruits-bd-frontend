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
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { verifyToken } from "@/helper/verifyToken";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectCurrentUser, setUser } from "@/redux/features/auth/authSlice";
import { setCookies } from "@/services/auth";

const FormSchema = z.object({
  phone_number: z
    .string({ required_error: "Phone number is required" })
    .regex(/^[0-9]{11}$/, "Phone number must be exactly 11 digits (0-9)"),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters long"),
});

const LoginConponent = () => {
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phone_number: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const res = await login(data).unwrap();
      if (res?.success) {
        await setCookies(res.data.accessToken);
        // (await cookies()).set("accessToken", res.data.accessToken);
        const user = verifyToken(res.data.accessToken);
        dispatch(setUser({ token: res.data.accessToken, user: user }));
        toast.success(res?.message);
        if (redirect) {
          router.push(redirect);
        } else {
          router.push("/");
        }
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
        />
        <div className="text-center">
          <CardTitle>Welcome Back!</CardTitle>
          <CardDescription>Login into your account.</CardDescription>
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
              Log In {isLoading && <Loader2 className="animate-spin" />}
            </Button>
          </form>
        </Form>
        <p className="pt-4">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary underline font-medium">
            Register
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

export default LoginConponent;
