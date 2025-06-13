import { Skeleton } from "@/components/ui/skeleton";

export const FruitCardSkeleton = () => {
  return (
    <div className="rounded-lg border shadow-sm overflow-hidden">
      {/* Image */}
      <div className="w-full h-64">
        <Skeleton className="w-full h-full" />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <Skeleton className="h-5 w-1/2" /> {/* Name */}
        <Skeleton className="h-4 w-1/3" /> {/* Price */}
        <Skeleton className="h-3 w-full" /> {/* Description line 1 */}
        <Skeleton className="h-3 w-3/4" /> {/* Description line 2 */}
      </div>

      {/* Footer */}
      <div className="p-4 pt-2 flex gap-2">
        <Skeleton className="h-10 w-1/2 rounded-md" />
        <Skeleton className="h-10 w-1/2 rounded-md" />
      </div>
    </div>
  );
};
