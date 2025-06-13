"use client";

import {
  Facebook,
  Mail,
  MapPin,
  Phone,
  Send,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import Swal from "sweetalert2";

const Contact = () => {
  const handleSendMessage = (e: any) => {
    e.preventDefault();
    const form = e.target;

    Swal.fire({
      title: "Success",
      text: "Your message sent successfully.",
      icon: "success",
    });
    form.reset();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      {/* Page Title */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-green-600">যোগাযোগ করুন</h1>
        <p className="text-gray-600 mt-2">
          আপনার যেকোনো প্রশ্ন বা পরামর্শের জন্য আমাদের সাথে যোগাযোগ করুন।
        </p>
      </div>

      {/* Contact Info & Form */}
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-2xl font-semibold text-green-500">
              আমাদের ঠিকানা
            </h2>
            <div className="flex items-center gap-3 text-gray-700 justify-center md:justify-start">
              <MapPin size={20} />
              <span>রংপুর, বাংলাদেশ</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700 justify-center md:justify-start">
              <Phone size={20} />
              <span>+8801328-599629</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700 justify-center md:justify-start">
              <Mail size={20} />
              <span>nishaturrahman134@gmail.com</span>
            </div>
          </div>

          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl font-semibold text-green-500">
              আমাদের অনুসরণ করুন
            </h2>
            <div className="flex items-center gap-4 text-green-600 justify-center md:justify-start">
              <Link
                href="https://www.facebook.com/profile.php?id=61570577015180"
                target="_blank"
              >
                <Facebook size={28} className="hover:text-green-800" />
              </Link>
              <Link href="https://wa.me/8801328599629" target="_blank">
                <MessageCircle size={28} className="hover:text-green-800" />
              </Link>
              <Link href="mailto:nishaturrahman134@gmail.com">
                <Mail size={28} className="hover:text-green-800" />
              </Link>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSendMessage}
          className="bg-gray-50 p-6 rounded-xl shadow-md space-y-5"
        >
          <h2 className="text-2xl font-semibold text-green-500 mb-2">
            একটি বার্তা পাঠান
          </h2>
          <div>
            <label className="block text-sm font-medium mb-1">নাম</label>
            <input
              type="text"
              placeholder="আপনার নাম"
              className="w-full border rounded-md px-4 py-2 outline-green-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">ইমেইল</label>
            <input
              type="email"
              placeholder="example@email.com"
              className="w-full border rounded-md px-4 py-2 outline-green-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">বার্তা</label>
            <textarea
              rows={4}
              placeholder="আপনার প্রশ্ন বা মন্তব্য লিখুন..."
              className="w-full border rounded-md px-4 py-2 outline-green-400"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 flex items-center gap-2"
          >
            <Send size={16} />
            পাঠান
          </button>
        </form>
      </div>

      {/* Brand Touch Section */}
      <div className="bg-green-50 py-8 px-6 rounded-xl text-center space-y-3 shadow-inner">
        <h2 className="text-2xl font-bold text-green-700">Pure Fruits BD</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          স্বাস্থ্যই হোক আপনার অগ্রাধিকার। আমরা প্রতিশ্রুতিবদ্ধ আপনাকে পুষ্টিকর
          ও নিরাপদ ফল সরবরাহ করতে — ঘরে বসেই!
        </p>
      </div>
    </div>
  );
};

export default Contact;
