import { AppSidebar } from "@/components/layoutComponents/Sidebar";
import { MobileNavbar } from "@/components/layoutComponents/MobileNavbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <SidebarProvider>
      <div className="flex flex-1 h-screen overflow-hidden">
        <AppSidebar />
        <div className="flex-1 flex flex-col overflow-y-auto">
          <MobileNavbar />
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}