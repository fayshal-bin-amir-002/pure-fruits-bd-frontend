"use client";

import { useSearchParams } from "next/navigation";
import FruitCard from "./FruitCard";
import { useGetAllFruitQuery } from "@/redux/features/fruits/fruitsApi";
import { IFruit } from "@/types/fruit/fruit";
import { FruitCardSkeleton } from "@/components/ui/core/Loader/FruitCardSkeleton";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const AllFriutsContainer = () => {
  const searchParams = useSearchParams();
  const paramsObj: Record<string, string> = {};

  searchParams.forEach((value, key) => {
    paramsObj[key] = value;
  });

  const { data, isLoading, isFetching } = useGetAllFruitQuery(paramsObj);
  const fruits: IFruit[] = data?.data || [];
  return (
    <div>
      <div className="mt-6 md:mt-8 lg:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {(isLoading || isFetching || fruits?.length === 0) &&
          [...Array(4)].map((_, i) => <FruitCardSkeleton key={i} />)}
        {!isLoading &&
          !isFetching &&
          fruits?.length > 0 &&
          fruits
            ?.slice(0, 8)
            ?.map((fruit) => <FruitCard key={fruit?._id} fruit={fruit} />)}
      </div>
      <div className="flex justify-center items-center mt-6">
        <Link href="/fruits">
          <Button className="cursor-pointer">Explore All Pure Fruits</Button>
        </Link>
      </div>
    </div>
  );
};

export default AllFriutsContainer;
