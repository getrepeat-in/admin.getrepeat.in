import { Sidebar } from "@/components/global/sidebar";
import { Separator } from "@/components/ui/separator";
import { Breadcrumbs } from "@/components/global/breadcrumb";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function MainLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden w-full bg-white dark:bg-[#0a0a0a]">
      <SidebarProvider>
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border/40 px-6 bg-white dark:bg-[#0a0a0a] transition-[width,height] ease-linear">
            <div className="flex items-center gap-4 w-full">
              <SidebarTrigger className="-ml-2" />
              <Separator orientation="vertical" className="h-4" />
              <Breadcrumbs />
            </div>
          </header>
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
