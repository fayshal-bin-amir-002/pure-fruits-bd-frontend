import FruitCategoryManagement from "@/components/modules/dashboard/fruit-category";
import LoadingSpinner from "@/components/ui/core/Loader/LoadingSpinner";
import { Suspense } from "react";

const FruitCategoryPage = () => {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <FruitCategoryManagement />
      </Suspense>
    </div>
  );
};

export default FruitCategoryPage;
