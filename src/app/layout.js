import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/navbar";
import StoreProvider from "./globalRedux/StoreProvider";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <main className="bg-slate-100">
          <StoreProvider>
            <Navbar></Navbar>
            <Toaster position="top-center" reverseOrder={false} />
            {children}
            <Footer></Footer>
          </StoreProvider>
        </main>
      </body>
    </html>
  );
}
