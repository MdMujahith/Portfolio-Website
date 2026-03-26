import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mohamed Mujahith - Portfolio",
  description: "A portfolio showcasing the projects and skills of Mohamed Mujahith.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* 1. Preconnect to Google's servers for speed */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* 2. Load Google Sans Flex */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wght@6..144,1..1000&display=swap" 
          rel="stylesheet" 
        />
      </head>
      
      {/* 3. Removed Geist variables. The font is now applied globally via globals.css */}
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}