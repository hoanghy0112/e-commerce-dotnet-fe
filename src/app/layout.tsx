import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import "./globals.css";
import NavHeader from "@/components/NavHeader";

export const metadata: Metadata = {
	title: "E-Commerce app",
	description: "",
};

const roboto = Roboto({
	subsets: ["latin"],
	variable: "--font-primary",
	weight: ["100", "300", "400", "500", "700", "900"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={roboto.className}>
			<body>
				<NavHeader />
				<div>{children}</div>
			</body>
		</html>
	);
}
