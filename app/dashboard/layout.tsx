import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { DashboardSidebar } from "./components/Dashboard-sidebar";



const DashboardLayoutPage = ({ children }: { children: React.ReactNode }) => {
    return (
         <SidebarProvider>
      <DashboardSidebar/>
      <main className="min-w-0 flex-1 p-3 sm:p-6">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
    );
};

export default DashboardLayoutPage;