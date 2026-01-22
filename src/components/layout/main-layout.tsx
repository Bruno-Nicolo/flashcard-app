import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function MainLayout() {
  return (
    <div className="flex h-dvh w-full bg-background">
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 overflow-auto">
          <SidebarTrigger className="mx-1" />
          <Outlet />
        </main>
      </SidebarProvider>
    </div>
  );
}
