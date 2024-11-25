import React from "react";
import Link from "next/link";
import routes from "../../constants/routes";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";

function NavBar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
    // <div>
    //   <Link href={routes.home}>
    //     <div>Home</div>
    //   </Link>

    //   <Link href={routes.login}>
    //     <div>Login</div>
    //   </Link>

    //   <Link href={routes.register}>
    //     <div>Register</div>
    //   </Link>

    //   <Link href={routes.about}>
    //     <div>About</div>
    //   </Link>
    // </div>
  );
}

export default NavBar;
