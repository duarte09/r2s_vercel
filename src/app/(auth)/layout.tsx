"use client";

import { ReactNode } from "react";
import { AuthRightPanel } from "@/components/layoutComponents/AuthRightPanel";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <div className="flex-1">{children}</div>
      <AuthRightPanel />
    </div>
  );
}
