"use client";

import { DataTable } from "@/components/ui/core/DataTable";
import TableSkeleton from "@/components/ui/core/Loader/TableSkeleton";
import { UserRole, UserStatus } from "@/redux/features/auth/authSlice";
import {
  useGetAllUserQuery,
  useRoleChangeMutation,
  useStatusChangeMutation,
} from "@/redux/features/user/userApi";
import { IMeta } from "@/types/meta";
import { IUser } from "@/types/user";
import { ColumnDef } from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import DataTablePagination from "@/components/ui/core/DataTable/DataTablePagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import Swal from "sweetalert2";

const UserManagement = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const paramsObj: Record<string, string> = {};

  searchParams.forEach((value, key) => {
    paramsObj[key] = value;
  });

  const { data, isLoading, isFetching } = useGetAllUserQuery(paramsObj);
  const users: IUser[] = data?.data || [];
  const meta: IMeta = data?.meta || {};

  const [statusChange] = useStatusChangeMutation();
  const [roleChange] = useRoleChangeMutation();

  const handleSearchQuery = (query: string, value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set(query, value.toString());

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  const removeSearchQuery = (query: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(query);

    const newQuery = params.toString();
    const newUrl = newQuery ? `${pathname}?${newQuery}` : pathname;

    router.push(newUrl, { scroll: false });
  };

  const handleStatusChange = async (id: string, status: UserStatus) => {
    const data = {
      status,
    };
    Swal.fire({
      title: "Are you sure?",
      text: `You wanna "${status}" this user!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await statusChange({ id, data }).unwrap();
          if (res?.success) {
            toast.success(res?.message);
          } else {
            toast.error(res?.message || "Something went wrong!");
          }
        } catch (err: any) {
          toast.error(err?.data?.message || "Something went wrong!");
        }
      }
    });
  };

  const handleRoleChange = async (id: string, role: UserRole) => {
    const data = {
      role,
    };
    Swal.fire({
      title: "Are you sure?",
      text: `You wanna make this user as "${role}"!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await roleChange({ id, data }).unwrap();
          if (res?.success) {
            toast.success(res?.message);
          } else {
            toast.error(res?.message || "Something went wrong!");
          }
        } catch (err: any) {
          toast.error(err?.data?.message || "Something went wrong!");
        }
      }
    });
  };

  const handleSearch = async (data: { search_field: string }) => {
    if (data?.search_field.trim() !== "") {
      handleSearchQuery("searchTerm", data?.search_field);
    } else {
      removeSearchQuery("searchTerm");
    }
  };

  const columns: ColumnDef<IUser>[] = [
    {
      accessorKey: "phone_number",
      header: () => <div>Phone Number</div>,
      cell: ({ row }) => <span>{row.original.phone_number}</span>,
    },
    {
      accessorKey: "role",
      header: () => <div>Role</div>,
      cell: ({ row }) => (
        <span
          className={`${
            row.original.role === UserRole.ADMIN && "text-primary font-medium"
          }`}
        >
          {row.original.role}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: () => <div>Status</div>,
      cell: ({ row }) => (
        <span
          className={`${
            row.original.status === UserStatus.ACTIVE
              ? "text-primary"
              : "text-red-500"
          }`}
        >
          {row.original.status}
        </span>
      ),
    },
    {
      accessorKey: "status_change",
      header: () => <div>Status Change</div>,
      cell: ({ row }) => (
        <Select
          onValueChange={(value: UserStatus) =>
            handleStatusChange(row.original._id, value)
          }
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder={row.original.status} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              {Object.values(UserStatus).map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      ),
    },
    {
      accessorKey: "role_change",
      header: () => <div>Role Change</div>,
      cell: ({ row }) => (
        <Select
          onValueChange={(value: UserRole) =>
            handleRoleChange(row.original._id, value)
          }
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder={row.original.role} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Roles</SelectLabel>
              {Object.values(UserRole).map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      ),
    },
  ];

  const form = useForm({
    defaultValues: {
      search_field: "",
    },
  });

  return (
    <div>
      <div className="w-full md:w-2/3 lg:w-1/2 mb-6 ms-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSearch)} className="w-full">
            <FormField
              control={form.control}
              name="search_field"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Search Phone Number..."
                      type="search"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-right mt-2">
              <Button
                type="submit"
                className="cursor-pointer"
                variant={"outline"}
              >
                Search
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <div className="mb-6">
        {isLoading || isFetching ? (
          <TableSkeleton />
        ) : (
          <DataTable data={users} columns={columns} />
        )}
      </div>
      {!isLoading && users?.length > 0 && (
        <div className="flex justify-center">
          <DataTablePagination totalPage={meta?.totalPage || 1} />
        </div>
      )}
    </div>
  );
};

export default UserManagement;
