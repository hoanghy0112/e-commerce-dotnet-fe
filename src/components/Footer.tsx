import React from "react";
import PAYMENT1 from "@/assets/paymentMethod/Payment method icon-1.png";
import PAYMENT2 from "@/assets/paymentMethod/Payment method icon-2.png";
import PAYMENT3 from "@/assets/paymentMethod/Payment method icon-3.png";
import PAYMENT4 from "@/assets/paymentMethod/Payment method icon-4.png";
import PAYMENT5 from "@/assets/paymentMethod/Payment method icon-5.png";
import PAYMENT6 from "@/assets/paymentMethod/Payment method icon.png";
import Image from "next/image";
const Footer: React.FC = () => {
  return (
    <footer className="bg-black-500 text-white py-10 mt-20">
      {/* Top Section */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
        {/* Support Section */}
        <div>
          <h3 className="font-bold text-lg mb-4">SUPPORT</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-gray-400 transition">
                My Account
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400 transition">
                Favorite List
              </a>
            </li>
          </ul>
        </div>

        {/* More Section */}
        <div>
          <h3 className="font-bold text-lg mb-4">MORE</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-gray-400 transition">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400 transition">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400 transition">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400 transition">
                Order Tracking
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400 transition">
                FAQs
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info Section */}
        <div>
          <h3 className="font-bold text-lg mb-4">CONTACT INFO</h3>
          <p className="text-sm">No 1234, ABC Street, ABC, ETT, Vietnam.</p>
          <p className="text-sm mt-2">089789789 - 097797786</p>
          <p className="text-sm mt-2">
            <a
              href="mailto:support@abcxyz@mail.com"
              className="hover:text-gray-400 transition"
            >
              support@abcxyz@mail.com
            </a>
          </p>
        </div>

        {/* Newsletter Section */}
        <div>
          <h3 className="font-bold text-lg mb-4">NEW LETTER</h3>
          <p className="text-sm mb-4">
            Get all the best deals, sales, and offers from the best online
            shopping store. Sign up now!
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 p-2 border border-gray-600 bg-black text-white rounded-l-md focus:outline-none focus:border-gray-400"
            />
            <button
              type="submit"
              className="px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-r-md transition"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-10 pt-6">
        <div className="container mx-auto text-center">
          <p className="mb-4 space-x-4">
            <a href="#" className="hover:text-gray-400 transition">
              ABOUT US
            </a>
            |
            <a href="#" className="hover:text-gray-400 transition">
              CUSTOMER SERVICE
            </a>
            |
            <a href="#" className="hover:text-gray-400 transition">
              PRIVACY POLICY
            </a>
            |
            <a href="#" className="hover:text-gray-400 transition">
              ORDERS AND RETURNS
            </a>
            |
            <a href="#" className="hover:text-gray-400 transition">
              CONTACT US
            </a>
          </p>
          <div className="flex justify-center space-x-4 mb-4">
            <Image src={PAYMENT1} alt="payment method" />
            <Image src={PAYMENT2} alt="payment method" />
            <Image src={PAYMENT3} alt="payment method" />
            <Image src={PAYMENT4} alt="payment method" />
            <Image src={PAYMENT5} alt="payment method" />
            <Image src={PAYMENT6} alt="payment method" />
          </div>
          <p className="text-sm text-gray-500">
            Logo © 2024 Mobile Shop. All Rights Reserved. Designed by TheLiem
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
