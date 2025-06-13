import LoginConponent from "@/components/modules/auth/login";
import LoadingSpinner from "@/components/ui/core/Loader/LoadingSpinner";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Pure Fruits BD | Log in",
  description:
    "Buy the freshest, hand-picked fruits online in Bangladesh with Pure Fruits BD. আমরা দিচ্ছি সেরা মৌসুমি ও বিদেশি ফল সুলভ দামে, ঘরে বসেই অর্ডার করুন এখনই।",
  keywords: [
    // English Keywords
    "fresh fruits",
    "buy fruits online",
    "fruit delivery Bangladesh",
    "seasonal fruits BD",
    "pure fruits bd",
    "organic fruits",
    "mango delivery",
    "apple banana orange",
    "best fruit shop online BD",
    "online fruit shop",
    "fruit home delivery",
    "fresh mango BD",
    "exotic fruits Bangladesh",

    // Bangla Keywords
    "তাজা ফল",
    "অনলাইনে ফল কিনুন",
    "বাংলাদেশে ফল হোম ডেলিভারি",
    "ফলের দোকান অনলাইন",
    "আমের হোম ডেলিভারি",
    "সিজনাল ফল",
    "ফল কিনুন",
    "সস্তায় ফল",
    "সেরা ফলের দোকান",
    "পিওর ফ্রুটস বিডি",
    "আম কল কমলা আপেল",
  ],
};

const LoginPage = () => {
  return (
    <div className="flex h-[100vh] items-center justify-center">
      <Suspense fallback={<LoadingSpinner />}>
        <LoginConponent />
      </Suspense>
    </div>
  );
};

export default LoginPage;
