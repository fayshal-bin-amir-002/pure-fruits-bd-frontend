import Banner from "@/components/modules/home/banner/Banner";
import FruitSection from "@/components/modules/home/fruit-section/FruitSection";
import { InfoSection } from "@/components/modules/home/infoSection/InfoSection";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/ui/core/Loader/LoadingSpinner";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Pure Fruits bd.com | Home",
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
