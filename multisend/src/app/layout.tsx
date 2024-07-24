import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-csv-importer/dist/index.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Multisend",
  description: "Send many payment in one transaction",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
        {/* <link href='https://fonts.googleapis.com/css2?family=Permanent Marker' rel='stylesheet' /> */}
        
        <link rel="stylesheet" href='https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap' />

      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
