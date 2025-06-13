"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import bannerImage1 from "@/assets/banner/banner_image_1.jpg";
import bannerImage2 from "@/assets/banner/banner_image_2.jpg";
import bannerImage3 from "@/assets/banner/banner_image_3.jpg";
import bannerImage4 from "@/assets/banner/banner_image_4.jpg";

const bannerImages = [bannerImage1, bannerImage2, bannerImage3, bannerImage4];

const Banner = () => {
  return (
    <div className="py-4 md:py-6 lg:py-8">
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        spaceBetween={30}
        modules={[Pagination, Autoplay]}
        className="w-full h-[400px] lg:h-[500px]"
      >
        {bannerImages.map((img) => (
          <SwiperSlide className="h-[400px] lg:h-[500px] rounded-lg shadow-2xl">
            <div className="relative w-full h-full">
              <Image
                src={img}
                alt="Banner"
                fill
                className="object-cover rounded-lg"
                priority
              />

              <div className="absolute inset-0 bg-black/40 z-10 rounded-lg"></div>

              <div className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center px-2">
                <h1 className="text-3xl md:text-5xl font-bold">
                  Welcome to Pure <span className="text-primary">Fruits</span>{" "}
                  BD
                </h1>
                <p className="mt-4 text-lg md:text-xl">
                  Fresh, organic fruits delivered to your door.
                </p>
                <Button className="mt-8 cursor-pointer" size={"lg"}>
                  <Link href={"/fruits"}>Explore Pure Fruits</Link>
                </Button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
