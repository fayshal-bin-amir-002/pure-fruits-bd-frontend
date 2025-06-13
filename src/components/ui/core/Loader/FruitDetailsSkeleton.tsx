import { Skeleton } from "../../skeleton";

const FruitDetailsSkeleton = () => {
  return (
    <div className="p-4">
      <Skeleton className="w-full h-72 rounded-lg mb-4" />
      <Skeleton className="h-6 w-1/2 mb-2" />
      <Skeleton className="h-5 w-1/3 mb-2" />
      <Skeleton className="h-4 w-full mb-1" />
      <Skeleton className="h-4 w-3/4 mb-4" />
      <div className="flex gap-2">
        <Skeleton className="h-10 w-1/2 rounded-md" />
        <Skeleton className="h-10 w-1/2 rounded-md" />
      </div>
    </div>
  );
};

export default FruitDetailsSkeleton;
