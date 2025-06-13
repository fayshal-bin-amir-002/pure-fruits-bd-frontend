import RegisterComponent from "@/components/modules/auth/register";
import LoadingSpinner from "@/components/ui/core/Loader/LoadingSpinner";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Pure Fruits bd.com | Register",
  description:
    "Buy the freshest, hand-picked fruits online in Bangladesh. Pure Fruits BD offers top-quality seasonal and imported fruits at the best prices with home delivery.",
  keywords: [
    "fresh fruits",
    "buy fruits online",
    "fruit delivery Bangladesh",
    "seasonal fruits BD",
    "pure fruits bd",
    "organic fruits",
    "mango delivery",
    "apple banana orange",
    "best fruit shop online BD",
  ],
};

const RegisterPage = () => {
  return (
    <div className="flex h-[100vh] items-center justify-center">
      <Suspense fallback={<LoadingSpinner />}>
        <RegisterComponent />
      </Suspense>
    </div>
  );
};

export default RegisterPage;
