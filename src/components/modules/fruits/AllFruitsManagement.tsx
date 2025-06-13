"use client";

import { FruitCardSkeleton } from "@/components/ui/core/Loader/FruitCardSkeleton";

import { useGetAllFruitQuery } from "@/redux/features/fruits/fruitsApi";
import { IFruit } from "@/types/fruit/fruit";
import { useSearchParams } from "next/navigation";
import FruitCard from "../home/fruit-section/FruitCard";
import { IMeta } from "@/types/meta";
import DataTablePagination from "@/components/ui/core/DataTable/DataTablePagination";
import CategoryCards from "../home/fruit-section/CategoryCards";

const AllFruitsManagement = () => {
  const searchParams = useSearchParams();

  const paramsObj: Record<string, string> = {};

  searchParams.forEach((value, key) => {
    paramsObj[key] = value;
  });

  const { data, isLoading, isFetching } = useGetAllFruitQuery(paramsObj);
  const fruits: IFruit[] = data?.data || [];
  const meta: IMeta = data?.meta || {};

  return (
    <div>
      <div>
        <CategoryCards />
      </div>

      <div>
        <div className="mt-4 md:mt-6 lg:mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {(isLoading || isFetching) &&
            [...Array(4)].map((_, i) => <FruitCardSkeleton key={i} />)}
          {!isLoading &&
            !isFetching &&
            fruits?.length > 0 &&
            fruits?.map((fruit) => (
              <FruitCard key={fruit?._id} fruit={fruit} />
            ))}
        </div>
        {!isLoading && fruits?.length > 0 && (
          <div className="flex justify-center mt-4">
            <DataTablePagination totalPage={meta?.totalPage || 1} />
          </div>
        )}
        {!isLoading && !isFetching && fruits?.length === 0 && (
          <div className="h-[300px] flex justify-center items-center">
            <p className="text-2xl">No Fruit Item Found!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllFruitsManagement;
