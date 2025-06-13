"use client";

import Image from "next/image";
import img1 from "../../../assets/banner/banner_image_3.jpg";
import img2 from "../../../assets/banner/banner_image_4.jpg";

const reviews = [
  {
    name: "সাবিহা ইসলাম",
    review:
      "পিওর ফ্রুটস বিডি থেকে কেনা ফলগুলো খুবই টাটকা ছিল। বিশেষ করে আমগুলো অসাধারণ ছিল। ধন্যবাদ!",
    image: "https://i.postimg.cc/LsXG8XFn/girl1.jpg",
  },
  {
    name: "রাশেদ মাহমুদ",
    review:
      "বাড়িতে এমন ফ্রেশ ফল পেয়ে সত্যিই অবাক হয়েছি। সার্ভিসও খুব দ্রুত। আবার অর্ডার করবো ইনশাআল্লাহ।",
    image: "https://i.postimg.cc/xTvwshPT/boy1.png",
  },
  {
    name: "মেহজাবিন চৌধুরী",
    review:
      "অনলাইন থেকে ফল কেনার প্রথম অভিজ্ঞতা ছিল, আর আমি দারুণ খুশি। টাটকা, সুস্বাদু আর সময়মতো ডেলিভারি।",
    image: "https://i.postimg.cc/76jFcycb/girl2.jpg",
  },
];

const AboutUs = () => {
  return (
    <div className="py-6 md:py-8 space-y-12 md:space-y-16 lg:space-y-20">
      {/* Hero Section */}
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <Image
          src={img1}
          alt="Fresh fruits basket"
          width={600}
          height={400}
          className="rounded-2xl shadow-xl"
        />
        <div>
          <h1 className="text-4xl font-bold text-green-600 mb-4">
            Pure Fruits BD
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            আমরা Pure Fruits BD-তে বিশ্বাস করি আপনি এবং আপনার পরিবার যেন পান
            একেবারে টাটকা ও নিরাপদ ফল। দেশি-বিদেশি নানা ধরনের ফল সংগ্রহ করে আমরা
            পৌঁছে দেই আপনার দরজায়— কোন প্রিজারভেটিভ ছাড়াই, সর্বোচ্চ সততায়।
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-bold text-green-600 mb-4">
            কেন আমাদের বেছে নেবেন?
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>১০০% টাটকা ও অর্গানিক ফল সরবরাহ</li>
            <li>সারা দেশ দ্রুত ডেলিভারি</li>
            <li>বিশ্বস্ততা ও গুণগত মানে শতভাগ নিশ্চয়তা</li>
            <li>সহজ এবং ঝামেলাহীন অর্ডার ব্যবস্থা</li>
          </ul>
        </div>
        <Image
          src={img2}
          alt="Why choose us"
          width={600}
          height={400}
          className="rounded-2xl shadow-xl"
        />
      </div>

      {/* Customer Reviews */}
      <div>
        <h2 className="text-3xl font-bold text-green-600 text-center mb-10">
          গ্রাহক প্রতিক্রিয়া
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl shadow-md border hover:shadow-lg transition"
            >
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={review.image}
                  alt={review.name}
                  width={50}
                  height={50}
                  className="rounded-full border-2 border-green-500"
                />
                <h4 className="text-md font-semibold text-gray-800">
                  {review.name}
                </h4>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {review.review}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
