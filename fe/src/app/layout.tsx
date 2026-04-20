import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: "Hupuna Chat",
  description: "Ứng dụng nhắn tin realtime — Zalo-like",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      suppressHydrationWarning
      className={cn(
        "h-full antialiased",
        dmSans.variable,
        playfair.variable
      )}
    >
      <head>
        {/* No-flash: đọc theme từ localStorage trước khi React render */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
              var m=localStorage.getItem('chat-mode')||'light';
              var t=localStorage.getItem('chat-theme')||'orange';
              document.documentElement.setAttribute('data-mode',m);
              document.documentElement.setAttribute('data-theme',t);
            })();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}
