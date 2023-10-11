import "./../globals.css";
import type { Metadata } from "next";
import Navbar from "../../components/Navbar/navbar";
import { Plus } from "lucide-react";

export const metadata: Metadata = {
  title: "New Source | dunnoyet",
  description: "Serious in depth learning.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const helperName = "Helper";
  return (
    <html lang="en">
      <body className={` bg-background flex flex-col`}>
        <Navbar
          brandSide={[
            {
              content: {
                logoPath: "/logo_light.png",
                alt: "dunnoyet",
                variant: "link",
                url: "/",
              },
              rightDivider: true,
            },
            {
              content: {
                url: "/learn/test",
                text: {
                  text: helperName,
                  color: "primary-header",
                },
                alt: "Helper",
                variant: "link",
                tooltip: "My Helper",
              },
            },
          ]}
          middle={[]}
          userSide={[
            {
              content: {
                alt: "New Question",
                variant: "default",
                url: "/learn/new",
                padding: "p-2",
                jsx: <Plus className="h-full" color="#FFFFFF" />,
                tooltip: "New Question",
              },
            },
            {
              content: {
                logoPath: "/pfp.png",
                alt: "Profile Picture",
                variant: "ghost",
                url: "/",
                padding: "p-0",
                tooltip: "My Profile",
              },
            },
          ]}
          alignment="between"
        />
        {children}
      </body>
    </html>
  );
}
