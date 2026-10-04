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
      <div>{children}</div>
      <div className="md:hidden">
        <SideNav />
      </div>
    </>
  );
}
