"use client";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  Home,
  MessageSquare,
  BookUser,
  CalendarDays,
  FileText,
  Settings,
  ChartBar,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/chat", label: "Conversas", icon: MessageSquare },
    { href: "/painel-comercial", label: "Painel comercial", icon: ChartBar },
    // { href: "/contatos", label: "Contatos", icon: BookUser },
    // { href: "/calendario", label: "Calendário", icon: CalendarDays },
    // { href: "/orcamentos", label: "Orçamentos", icon: FileText },
  ];

  return (
    <Sidebar className="bg-background">
      <SidebarHeader className="p-5">
        <Image
          src="/assets/R2S_logo&text_blue.png"
          alt="Run2Sell Logo"
          width={180}
          height={100}
        />
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu className="flex flex-col gap-2 px-3 pt-4">
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith(item.href)}
                className={cn(
                  "h-12 justify-start rounded-lg text-gray-500 hover:bg-gray-100",
                  "data-[active=true]:bg-primary data-[active=true]:text-primary-foreground data-[active=true]:hover:bg-primary/90"
                )}
              >
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu className="px-3 pb-2">
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname.startsWith("/configuracoes")}
              className={cn(
                "h-10 justify-start rounded-lg text-gray-500 hover:bg-gray-100",
                "data-[active=true]:bg-primary data-[active=true]:text-primary-foreground data-[active=true]:hover:bg-primary/90"
              )}
            >
              <Link href="/configuracoes">
                <Settings className="h-5 w-5" />
                <span className="font-medium">Configurações</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}