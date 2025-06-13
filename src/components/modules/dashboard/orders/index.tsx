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
import {
  useGetAllOrderQuery,
  useUpdateStatusMutation,
} from "@/redux/features/orders/ordersApi";
import { IOrder, OrderStatus } from "@/types/order";
import { useState } from "react";
import { Eye } from "lucide-react";
import ViewOrderModal from "./ViewOrderModal";

const OrdersManagement = () => {
  const [openView, setOpenView] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
  const [searchByOrderId, setSearchByOrderId] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const paramsObj: Record<string, string> = {};

  searchParams.forEach((value, key) => {
    paramsObj[key] = value;
  });

  const { data, isLoading, isFetching } = useGetAllOrderQuery(paramsObj);
  const users: IOrder[] = data?.data || [];
  const meta: IMeta = data?.meta || {};

  const [updateStatus] = useUpdateStatusMutation();

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

  const handleUpdateStatus = async (id: string, status: OrderStatus) => {
    const data = {
      status,
    };
    Swal.fire({
      title: "Are you sure?",
      text: `You wanna "${status}" this order!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await updateStatus({ id, data }).unwrap();
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
    const input = data?.search_field.trim();
    if (input !== "") {
      if (searchByOrderId) {
        handleSearchQuery("_id", input);
      } else {
        handleSearchQuery("searchTerm", input);
      }
    } else {
      if (searchByOrderId) {
        removeSearchQuery("_id");
      } else {
        removeSearchQuery("searchTerm");
      }
    }
  };

  const columns: ColumnDef<IOrder>[] = [
    {
      accessorKey: "order_id",
      header: () => <div>Order Id</div>,
      cell: ({ row }) => <span>{row.original?._id}</span>,
    },
    {
      accessorKey: "name",
      header: () => <div>Name</div>,
      cell: ({ row }) => <span>{row.original?.name}</span>,
    },
    {
      accessorKey: "contant_number",
      header: () => <div>Contact Number</div>,
      cell: ({ row }) => <span>{row.original?.contact_number}</span>,
    },
    {
      accessorKey: "address",
      header: () => <div>Address</div>,
      cell: ({ row }) => (
        <span className="truncate">{row.original?.address}</span>
      ),
    },
    {
      accessorKey: "date",
      header: () => <div>Date</div>,
      cell: ({ row }) => (
        <span>{new Date(row.original?.createdAt).toLocaleDateString()}</span>
      ),
    },
    {
      accessorKey: "status",
      header: () => <div>Status</div>,
      cell: ({ row }) => (
        <span
          className={`${
            row.original?.status === OrderStatus.PENDING && "text-amber-500"
          }
          ${row.original?.status === OrderStatus.COMPLETE && "text-primary"}
          ${row.original?.status === OrderStatus.CANCELED && "text-red-500"}`}
        >
          {row.original?.status}
        </span>
      ),
    },
    {
      accessorKey: "update_status",
      header: () => <div>Update Status</div>,
      cell: ({ row }) => (
        <Select
          onValueChange={(value: OrderStatus) =>
            handleUpdateStatus(row.original._id, value)
          }
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder={row.original.status} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              {Object.values(OrderStatus).map((status) => (
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
      accessorKey: "action",
      header: () => <div>Actions</div>,
      cell: ({ row }) => (
        <div>
          <Button
            variant={"outline"}
            size={"icon"}
            className="cursor-pointer"
            onClick={() => {
              setOpenView(true);
              setSelectedOrder(row.original);
            }}
          >
            <Eye size={28} color="#27d15e" strokeWidth={2.5} />
          </Button>
        </div>
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
        <div className="flex items-start justify-between gap-4">
          <div>
            <Select
              onValueChange={(val) => {
                if (val === "_id") {
                  setSearchByOrderId(true);
                  removeSearchQuery("searchTerm");
                } else {
                  removeSearchQuery("_id");
                  setSearchByOrderId(false);
                }
              }}
            >
              <SelectTrigger className="">
                <SelectValue placeholder="Search By" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="_id">Order ID</SelectItem>
                  <SelectItem value="searchTerm">Search Term</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSearch)} className="w-full">
              <FormField
                control={form.control}
                name="search_field"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input {...field} placeholder="Search..." type="search" />
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
      <ViewOrderModal
        order={selectedOrder}
        onOpenChange={setOpenView}
        isOpen={openView}
      />
    </div>
  );
};

export default OrdersManagement;
