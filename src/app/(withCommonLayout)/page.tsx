import Banner from "@/components/modules/home/banner/Banner";
import FruitSection from "@/components/modules/home/fruit-section/FruitSection";
import { InfoSection } from "@/components/modules/home/infoSection/InfoSection";
import LoadingSpinner from "@/components/ui/core/Loader/LoadingSpinner";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Pure Fruits BD | Home",
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

export default function Home() {
  return (
    <div>
      <Banner />
      <Suspense fallback={<LoadingSpinner />}>
        <FruitSection />
      </Suspense>
      <InfoSection />
    </div>
  );
}
