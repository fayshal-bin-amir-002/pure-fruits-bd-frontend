"use client";

import Container from "@/components/shared/Container";
import Footer from "@/components/shared/Footer";
import NavBar from "@/components/shared/NavBar";
import { ReactNode } from "react";
import FloatingCartButton from "../cart/FloatingCartButton";
import { useAppSelector } from "@/redux/hooks";
import { selectCartItems } from "@/redux/features/cart/cartSlice";

const HomePage = ({ children }: { children: ReactNode }) => {
  const itemCount = useAppSelector(selectCartItems)?.length;
  return (
    <div>
      <NavBar />
      <main className="min-h-[calc(100vh-310px)]">
        <Container>{children}</Container>
      </main>
      {itemCount > 0 && (
        <span className="fixed bottom-8 right-8 z-50 cursor-pointer ">
          <FloatingCartButton />
        </span>
      )}
      <Footer />
    </div>
  );
};

export default HomePage;
