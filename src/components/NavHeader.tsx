"use client";
import Image from "next/image";
import LOGO from "../assets/logo.svg";
import SEARCH_ICON from "../assets/icons/search-lg.svg";
import CART_ICON from "../assets/icons/cart.svg";
import PROFILE_ICON from "../assets/icons/user.svg";
import IconButton from "./IconButton";
import NavList from "./NavList";
import { useState } from "react";
import CartModal from "./CartModal";
import useAuthStore from "@/stores/auth.store";
import NotificationDropdown from "./NotificationDropDown";
import { useRouter } from "next/navigation";
export default function NavHeader() {
  const [isCartOpen, setCartOpen] = useState<boolean>(false);
  const router = useRouter();
  const toggleCart = () => setCartOpen(!isCartOpen);
  const handleProfileClick = () => {
    router.replace("/home/profile");
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    router.replace(`/phones?keyword=${e.target.value}`);
  };
  return (
    <div>
      <div className="px-24 py-4 flex justify-between items-center">
        <div className="flex gap-5 items-center">
          <Image src={LOGO} width={169} height={169} alt="logo" />
        </div>
        <div className="px-5 py-2 w-[500px] rounded-[0.5rem] flex items-center gap-4 border-[1px] border-black-500">
          <input
            className="flex-1 text-black-500 outline-none"
            type="text"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch(e);
              }
            }}
            placeholder="Search for products"
          />
          <Image src={SEARCH_ICON} width={24} height={24} alt="search" />
        </div>
        <div className="flex gap-5 items-center">
          <IconButton icon={CART_ICON} alt="cart" onClick={toggleCart} />
          <NotificationDropdown />
          <IconButton
            icon={PROFILE_ICON}
            alt="profile"
            onClick={handleProfileClick}
          />
        </div>
      </div>
      <NavList />

      {/* Cart Modal */}
      <CartModal isOpen={isCartOpen} onClose={toggleCart} />
    </div>
  );
}
