"use client";
import Image from "next/image";
import img from "@/assets/logo.png";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useGetAllFruitCategoryQuery } from "@/redux/features/fruitCategory/fruitCategoryApi";
import { IFruitCategory } from "@/types/fruit-category";

const CategoryCards = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearchQuery = (query: string, value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set(query, value.toString());

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  const { data } = useGetAllFruitCategoryQuery(undefined);
  const fruitCategories: IFruitCategory[] = data?.data || [];

  return (
    <div className="mx-auto w-full md:w-8/12 rounded-md shadow-lg">
      <div className="flex gap-4 md:gap-6 overflow-x-auto p-4 pl-6 scrollbar-hide">
        <div
          className="shadow-md px-6 py-2 rounded-lg cursor-pointer hover:scale-95 duration-300 text-center flex flex-col items-center justify-center gap-0.5"
          onClick={() => {
            router.push(`${pathname}`, {
              scroll: false,
            });
          }}
        >
          <Image src={img} alt="Banner" className="w-12" priority />
          <p className="text-sm">All Friuts</p>
        </div>
        {fruitCategories?.length > 0 &&
          fruitCategories.map((category: IFruitCategory) => (
            <div
              key={category?._id}
              className="shadow-md px-6 py-2 rounded-lg cursor-pointer hover:scale-95 duration-300 text-center flex flex-col items-center justify-center gap-0.5"
              onClick={() => handleSearchQuery("category", category?._id)}
            >
              <Image
                src={category?.image}
                width={100}
                height={100}
                alt="Banner"
                className="w-12"
                priority
              />
              <p className="text-sm">{category?.name}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CategoryCards;
