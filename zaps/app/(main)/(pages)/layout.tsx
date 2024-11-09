import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/global/app-siderbar";

type Props = { children: React.ReactNode };

const Layout = (props: Props) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <div className="block md:hidden">
            <SidebarTrigger />
        </div>
        <div
          className="border-l-[1px] pb-20 h-screen
  rounded-l-3xl border-muted-foreground/20 overflow-scroll"
        >
          {props.children}
        </div>
      </main>
    </SidebarProvider>
  );
};

export default Layout;
