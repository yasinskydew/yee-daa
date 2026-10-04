import React from "react";
import SideNav from "../ui/platform/sidenav";

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <aside className="hidden md:block">
        <SideNav />
      </aside>
      <main>{children}</main>
      <div className="md:hidden">
        <SideNav />
      </div>
    </>
  );
}
