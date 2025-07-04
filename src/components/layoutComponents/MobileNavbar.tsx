"use client"

import { SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";

export function MobileNavbar() {
  return (
    <header className="flex md:hidden items-center justify-between p-3 border-b bg-background sticky top-0 z-10 h-16">
      <SidebarTrigger />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Link href="/dashboard">
          <Image
            src="/assets/R2S_logo&text_blue.png"
            alt="Run2Sell Logo"
            width={120}
            height={30}
            priority
          />
        </Link>
      </div>
            <div className="w-8" />
    </header>
  )
}