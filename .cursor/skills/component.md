---
name: component
description: Generate production-ready Next.js component with Tailwind
globs: ["app/**/*.tsx"]
---

Generate a Next.js component following these rules:

1. Determine if server or client component (default: server)
2. Define TypeScript interface for props
3. Use semantic HTML elements
4. Apply Tailwind classes (mobile-first)
5. Add dark mode support with dark: prefix
6. Include hover/focus states for interactive elements
7. Add aria attributes where needed
8. Export as named export

Template:
```tsx
interface {Name}Props {
  // define props
}

export function {Name}({ /* destructured props */ }: {Name}Props) {
  return (
    <div className="">
      {/* component content */}
    </div>
  );
}