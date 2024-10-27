import Image from "next/image";
import LOGO from "../assets/logo.svg";
import SEARCH_ICON from "../assets/icons/search-lg.svg";
import NOTIFICATION_ICON from "../assets/icons/bell.svg";
import CART_ICON from "../assets/icons/cart.svg";
import PROFILE_ICON from "../assets/icons/user.svg";
import IconButton from "./IconButton";
import NavList from "./NavList";

export default function NavHeader() {
	return (
		<div>
			<div className=" px-24 py-4 flex justify-between items-center">
				<div className="flex gap-5 items-center">
					<Image src={LOGO} width={30} height={30} alt="logo" />
					<p className=" font-bold text-black-500 text-3xl">Logo</p>
				</div>
				<div className=" px-5 py-2 w-[500px] rounded-[0.5rem] flex items-center gap-4 border-[1px] border-black-500">
					<input
						className=" flex-1 text-black-500 outline-none"
						type="text"
					/>
					<Image src={SEARCH_ICON} width={24} height={24} alt="search" />
				</div>
				<div className=" flex gap-5 items-center">
					<IconButton icon={CART_ICON} alt="cart" />
					<IconButton icon={NOTIFICATION_ICON} alt="notification" />
					<IconButton icon={PROFILE_ICON} alt="profile" />
				</div>
			</div>
			<NavList />
		</div>
	);
}
