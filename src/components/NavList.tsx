"use client";

import { NAV_HEADERS } from "@/constants/nav-headers";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Text from "./Typography/Text";

export default function NavList() {
	const pathname = usePathname();

	return (
		<div className=" py-4 flex gap-16 justify-center bg-black-500">
			{NAV_HEADERS.map(({ title, path }) => (
				<Link href={path} key={path}>
					<Text className=" pb-[6px] text-white font-medium duration-200 hover:text-black-100">
						{title}
					</Text>
					{path === pathname ? (
						<div
							style={{
								viewTransitionName: "nav-list",
							}}
							className="mx-1 h-1 rounded-sm bg-white"
						/>
					) : null}
				</Link>
			))}
		</div>
	);
}
