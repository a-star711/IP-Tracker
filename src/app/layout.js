import ToastProvider from "./components/Toast";
import "./globals.css";
import { Poppins } from 'next/font/google'

export const metadata = {
  title: "IP-Tracker",
  description: "Track any IPv4 or IPv6 address location,ISP & timezone",
};

const poppins = Poppins({
  subsets:['latin'],
  weight: ['400', '700'],
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    
      <body className={poppins.className}>
        <ToastProvider>
        {children}
        </ToastProvider>
      </body>
 
    </html>
  );
}
