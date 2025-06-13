"use client";

import Link from "next/link";
import {
  Facebook,
  Mail,
  Phone,
  MessageCircleMore,
  Info,
  ShoppingCart,
  Home,
} from "lucide-react";
import Container from "./Container";

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t mt-12">
      <Container>
        <div className="py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-700">
          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Facebook className="h-5 w-5 text-blue-600" />
                <a
                  href="https://www.facebook.com/profile.php?id=61570577015180"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Facebook Page
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-green-600" />
                <a
                  href="https://wa.me/8801328599629"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  WhatsApp: +8801328-599629
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-red-500" />
                <a
                  href="mailto:nishaturrahman134@gmail.com"
                  className="hover:underline"
                >
                  Email: nishaturrahman134@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                <Link href="/fruits" className="hover:underline">
                  Fruits
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                <Link href="/about-us" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircleMore className="h-5 w-5" />
                <Link href="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Brand Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              About Pure <span className="text-primary">Fruits</span> BD
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Pure Fruits BD brings you the freshest fruits straight from
              trusted local farms. We ensure quality, affordability, and health
              in every bite. We are launching soon—stay tuned!
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t text-center py-4 text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Pure Fruits BD. All rights reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
