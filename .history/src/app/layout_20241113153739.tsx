import { Metadata } from "next";

import { Roboto } from "next/font/google";

import ClientLayout from "./clientLayout";

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
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en" className={roboto.className}>
      <body className="bg-white">
        <ClientLayout>{children}</ClientLayout> 
      </body>
    </html>
  );
}
