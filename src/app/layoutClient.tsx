"use client";

import { usePathname } from "next/navigation";
import NavHeader from "@/components/NavHeader";

export default function ClientLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const pathname = usePathname();

	const showHeader = pathname !== "/register" && pathname !== "/sign-in";

	return (
		<div>
			{showHeader && <NavHeader />}
			{children}
		</div>
	);
}
