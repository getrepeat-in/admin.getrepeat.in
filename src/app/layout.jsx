import "./globals.css";
import { Poppins } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import QueryProvider from "@/providers/query-provider";
import NotificationBanner from "@/components/global/notification-banner";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Get Repeat Admin",
  description: "Admin portal for Get Repeat",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${poppins.variable} h-full antialiased`}
      >
        <body className="min-h-full font-sans bg-white dark:bg-[#0a0a0a]">
          <QueryProvider>
            <NotificationBanner />
            {children}
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
