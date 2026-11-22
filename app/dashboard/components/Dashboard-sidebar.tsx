"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Bookmark,
  BriefcaseBusiness,
  Building2,
  ClipboardList,
  CreditCard,
  CirclePlus,
  LayoutDashboard,
  Settings,
  Users,
  type LucideIcon,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import logo from "@/app/images/logo.png"
import { useSession } from "@/lib/auth-client"

type RoleKey = "seeker" | "recruiter" | "admin"

type MenuItem = {
  name: string
  url: string
  icon: LucideIcon
}

const menuItems: Record<RoleKey, MenuItem[]> = {
  seeker: [
    { name: "Dashboard", url: "/dashboard/seeker", icon: LayoutDashboard },
    { name: "Jobs", url: "/jobs", icon: BriefcaseBusiness },
    { name: "Saved Jobs", url: "/dashboard/seeker/saved", icon: Bookmark },
    { name: "Applications", url: "/dashboard/seeker/applications", icon: ClipboardList },
    { name: "Billing", url: "/dashboard/seeker/billing", icon: CreditCard },
    { name: "Settings", url: "/dashboard/seeker/settings", icon: Settings },
  ],
  recruiter: [
    { name: "Dashboard", url: "/dashboard/recruiter", icon: LayoutDashboard },
    { name: "Add Job", url: "/dashboard/recruiter/jobs/new", icon: CirclePlus },
    { name: "Manage Jobs", url: "/dashboard/recruiter/jobs", icon: BriefcaseBusiness },
    { name: "Applications", url: "/dashboard/recruiter/applications", icon: ClipboardList },
    { name: "Settings", url: "/dashboard/recruiter/settings", icon: Settings },
  ],
  admin: [
    { name: "Dashboard", url: "/dashboard/admin", icon: LayoutDashboard },
    { name: "Users", url: "/dashboard/admin/users", icon: Users },
    { name: "Companies", url: "/dashboard/admin/companies", icon: Building2 },
    { name: "Jobs", url: "/dashboard/admin/jobs", icon: BriefcaseBusiness },
    { name: "Payments", url: "/dashboard/admin/payments", icon: CreditCard },
    { name: "Settings", url: "/dashboard/admin/settings", icon: Settings },
  ],
}

const roleLabels: Record<RoleKey, string> = {
  seeker: "Job seeker",
  recruiter: "Recruiter",
  admin: "Administrator",
}

export function DashboardSidebar() {
  const pathname = usePathname()
  const {data:session}=useSession()

  const role = (session?.user?.role ?? "seeker") as RoleKey

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              render={<Link href="/" />}
              tooltip="HireLoop home"
            >
              <Image
                src={logo}
                alt="HireLoop"
                className="size-8 object-contain"
              />
              <div className="flex flex-col items-start leading-tight">
                <span className="text-sm font-semibold">HireLoop</span>
                <span className="text-[11px] text-muted-foreground">
                  {roleLabels[role]} workspace
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarMenu>
            {menuItems[role].map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton
                  render={<Link href={item.url} />}
                  isActive={pathname === item.url}
                  tooltip={item.name}
                >
                  <item.icon />
                  <span>{item.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
