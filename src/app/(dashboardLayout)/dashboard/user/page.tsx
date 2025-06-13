import UserManagement from "@/components/modules/dashboard/user";
import LoadingSpinner from "@/components/ui/core/Loader/LoadingSpinner";
import { Suspense } from "react";

const UsersPage = () => {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <UserManagement />
      </Suspense>
    </div>
  );
};

export default UsersPage;
