"use client";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks } from "@/constants/navbar/NavLinks";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { protectedRoutes } from "@/routes/protectedRoutes";
import { Logout } from "@/services/auth";
import { AlignJustify } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const SideBar = () => {
  const pathname = usePathname();
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    dispatch(logout());
    await Logout();
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <AlignJustify size={28} color="#27d15e" strokeWidth={2.5} />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            Pure <span className="text-primary">Fruits</span> bd.com
          </SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="flex flex-col items-center gap-4">
            {navLinks.map((i) => (
              <Link
                key={i.title}
                href={i.url}
                className={`${
                  pathname === i.url && "text-primary font-medium"
                } text-lg`}
              >
                {i.title}
              </Link>
            ))}
            {user && user?.role === "ADMIN" && (
              <Link
                href="/dashboard"
                className={`${
                  pathname === "/dashboard" && "text-primary font-medium"
                } text-lg`}
              >
                Dashboard
              </Link>
            )}
          </div>
        </div>
        <SheetFooter>
          {user ? (
            <Button
              className="cursor-pointer w-full"
              onClick={() => handleLogout()}
            >
              Log Out
            </Button>
          ) : (
            <Link href="/login">
              <Button className="cursor-pointer w-full">Log In</Button>
            </Link>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default SideBar;
