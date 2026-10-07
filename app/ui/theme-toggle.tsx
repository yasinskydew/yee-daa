"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/app/ui/primitives/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button className="w-24" aria-hidden disabled>
        ...
      </Button>
    );
  }

  const isDark = resolvedTheme === "dark";
  return (
    <Button className="w-24" onClick={() => setTheme(isDark ? "light" : "dark")}>
      {isDark ? "Light" : "Dark"}
    </Button>
  );
}
