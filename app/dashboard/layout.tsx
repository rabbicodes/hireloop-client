import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { DashboardSidebar } from "./components/Dashboard-sidebar";



const DashboardLayoutPage = ({ children }: { children: React.ReactNode }) => {
    return (
         <SidebarProvider>
      <DashboardSidebar/>
      <main className="flex-1 p-6">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
    );
};

export default DashboardLayoutPage;