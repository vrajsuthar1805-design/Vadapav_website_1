import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MUMBAI SPICE: Navratri Edition | 9 Din 9 Swaad • Vadapav Fest",
  description: "Official menu, combo schemes, and festive rewards for Mumbai Spice: Navratri Edition. Steaming cheese burst vadapavs from 20-28 September (6:00 PM - 12:00 AM).",
  keywords: [
    "Mumbai Spice",
    "Navratri Vadapav Fest",
    "Cheese Burst Vadapav",
    "Garba Vadapav",
    "Borivali Street Food",
    "9 Din 9 Swaad",
    "Vadapav Combos"
  ],
  openGraph: {
    title: "MUMBAI SPICE: Navratri Edition (9 Din 9 Swaad)",
    description: "Steaming hot Cheese Burst Vadapavs & saver combos at our Navratri special stall. 20-28 September, 6:00 PM to 12:00 AM.",
    url: "https://mumbai-spice-navratri.vercel.app",
    siteName: "Mumbai Spice Navratri Fest",
    images: [
      {
        url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Steaming Cheese Burst Vadapav - Mumbai Spice Navratri Edition",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
  },
  twitter: {
    card: "summary_large_image",
    title: "MUMBAI SPICE: Navratri Edition | 9 Din 9 Swaad",
    description: "Steaming hot Cheese Burst Vadapavs & saver combos at our Navratri special stall. 20-28 September, 6:00 PM to 12:00 AM.",
    images: ["https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80"],
  },
};

export const viewport: Viewport = {
  themeColor: "#140606",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-[#0d0404] text-stone-100 antialiased selection:bg-amber-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
