"use client";

import Link from "next/link";
import Container from "./Container";
import Image from "next/image";
import logo from "../../assets/logo.png";
import { usePathname, useRouter } from "next/navigation";
import SideBar from "../modules/home/Navbar/SideBar";
import { navLinks } from "@/constants/navbar/NavLinks";
import { Button } from "../ui/button";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Logout } from "@/services/auth";
import { protectedRoutes } from "@/routes/protectedRoutes";

const NavBar = () => {
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
    <div className="bg-white shadow sticky top-0 z-40" suppressHydrationWarning>
      <Container>
        <div className="h-full flex justify-between items-center py-2 lg:py-1">
          <h3>
            <Link href="/">
              <Image
                src={logo}
                alt="logo"
                priority
                className="w-16 md:w-20 lg:w-24"
              />
            </Link>
          </h3>
          <div>
            <div className="hidden lg:flex justify-center items-center gap-10">
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
              {user ? (
                <Button
                  className="cursor-pointer"
                  onClick={() => handleLogout()}
                >
                  Log Out
                </Button>
              ) : (
                <Link href="/login">
                  <Button className="cursor-pointer">Log In</Button>
                </Link>
              )}
            </div>
            <div className="block lg:hidden">
              <SideBar />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NavBar;
