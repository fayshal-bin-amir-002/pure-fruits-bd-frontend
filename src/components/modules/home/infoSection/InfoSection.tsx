"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import img from "../../../../assets/infoSection/infoImage.jpg";
import Image from "next/image";

export function InfoSection() {
  return (
    <section className="py-12 grid md:grid-cols-2 gap-10 items-center">
      {/* Left: Image */}
      <div className="w-full">
        <Image
          width={500}
          height={500}
          src={img}
          alt="Pure Fruits BD Info"
          className="rounded-xl shadow-lg w-full object-cover"
        />
      </div>

      {/* Right: Accordion */}
      <div>
        <h2 className="text-3xl font-bold text-green-600 mb-6">
          কেন Pure Fruits BD সেরা?
        </h2>
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="item-1"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>পণ্যের তথ্য</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance text-gray-700">
              <p>
                আমাদের ফ্ল্যাগশিপ প্রোডাক্ট উন্নত প্রযুক্তি এবং প্রিমিয়াম
                ডিজাইনের সমন্বয়ে তৈরি। এটি শক্তিশালী কার্যকারিতা ও নির্ভরযোগ্যতা
                নিশ্চিত করে।
              </p>
              <p>
                মূল ফিচারগুলোর মধ্যে রয়েছে উন্নত প্রসেসিং সক্ষমতা এবং
                ইউজার-ফ্রেন্ডলি ইন্টারফেস — নতুন ও অভিজ্ঞ সকলের জন্য উপযোগী।
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>শিপিং বিবরণ</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance text-gray-700">
              <p>
                আমরা দেশজুড়ে ডেলিভারি দিয়ে থাকি। স্ট্যান্ডার্ড ডেলিভারি ৩-৫
                কর্মদিবসে, আর এক্সপ্রেস শিপিং ১-২ দিনের মধ্যে পৌঁছে দেওয়া হয়।
              </p>
              <p>
                প্রতিটি অর্ডার নিরাপদভাবে প্যাকেজ করা হয় এবং ট্র্যাকিং সুবিধা সহ
                পাঠানো হয়।
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>রিটার্ন নীতি</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance text-gray-700">
              <p>
                ৩০ দিনের মধ্যে রিটার্ন সুবিধা রয়েছে। প্রোডাক্টে সন্তুষ্ট না হলে,
                অরিজিনাল অবস্থায় ফিরিয়ে দিন — আমরা পুরো টাকা ফেরত দেব।
              </p>
              <p>
                রিটার্ন প্রক্রিয়া সহজ এবং ফ্রি। ৪৮ ঘণ্টার মধ্যে রিফান্ড সম্পন্ন
                হয়।
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
