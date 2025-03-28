import { Geist, Geist_Mono } from "next/font/google";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { PUBLIC_ROUTER } from "@/constant";
import { Toaster } from "react-hot-toast";
import * as React from "react";
import {
  Popover,
} from "@/components/ui/popover";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Toaster />
      <Button onClick={() => router.push(PUBLIC_ROUTER.LOGIN)}>Login</Button>
      <Popover open={open} onOpenChange={setOpen}>
      </Popover>
    </div>
  );
}
