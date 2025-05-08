"use client";
import { AppSidebar } from "@/components/modules/dashboard/sidebar/app-sidebar";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toggle, setToggle] = useState(true);
  // const hendleToggle = () =>{
  //   setToggle()
  // }
  return (
    <SidebarProvider>
      <AppSidebar />
      {/* toggle */}
      {toggle ? (
        <SidebarInset className="bg-gray-200 md:ml-56 px-4 -mt-24 py-4">
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4 ">
              <SidebarTrigger
                onClick={() => setToggle(!toggle)}
                className="-ml-1"
              />
            </div>
          </header>
          <div className="p-4 pt-0 min-h-screen ">{children}</div>
        </SidebarInset>
      ) : (
        <SidebarInset className=" md:ml-16">
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4 ">
              <SidebarTrigger
                onClick={() => setToggle(!toggle)}
                className="-ml-1"
              />
            </div>
          </header>
          <div className="p-4 pt-0 min-h-screen ">{children}</div>
        </SidebarInset>
      )}
    </SidebarProvider>
  );
}
