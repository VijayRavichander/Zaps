import { CircuitBoardIcon, Home, Inbox, Search, Settings, ReceiptText, Layers } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
    isActive: true
  },
  {
    title: "Workflows",
    url: "/workflows",
    icon: Inbox,
    isActive: false
  },
  {
    title: "Connections",
    url: "/connections",
    icon: CircuitBoardIcon,
    isActive: false

  },
  {
    title: "Billings",
    url: "/billings",
    icon: ReceiptText,
    isActive: false

  },

  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    isActive: false

  },
  {
    title: "Templates",
    url: "/templates",
    icon: Layers,
    isActive: false

  }
]

const onClickSideBarMenuItem = (e: any) => {
    console.log(e)
}

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Zaps</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="font-bold">
                    {/* Need To Add Active Element  */}
                  <SidebarMenuButton asChild size={"lg"}
                  >
                    <a href={item.url} >
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
