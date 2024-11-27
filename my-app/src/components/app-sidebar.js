import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Bell,
  Settings,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

const workingSpaceItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Users, label: "Team/Learning" },
  { icon: MessageSquare, label: "Social" },
  { icon: Bell, label: "Assessment" },
];

const personalItems = [
  { icon: LayoutDashboard, label: "Timeline" },
  { icon: MessageSquare, label: "Messages" },
  { icon: Bell, label: "Notifications" },
  { icon: Settings, label: "Settings" },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Working space</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {workingSpaceItems.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild isActive={item.active}>
                    <button className="w-full flex items-center">
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.label}
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Personal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {personalItems.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <button className="w-full flex items-center">
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.label}
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
