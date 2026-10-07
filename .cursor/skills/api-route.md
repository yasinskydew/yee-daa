
### 4.3 Skill: API Route
Создайте `.cursor/skills/api-route.md`:

```markdown
---
name: api-route
description: Create Next.js Route Handler with validation
globs: ["src/app/api/**/*.ts"]
---

Create a Next.js Route Handler:

1. Import NextRequest, NextResponse from 'next/server'
2. Define Zod schema for input validation
3. Implement proper HTTP method (GET/POST/PUT/DELETE)
4. Validate input with schema.parse()
5. Return consistent JSON response format
6. Handle errors with appropriate status codes
7. Add TypeScript types for request/response

Response format:
- Success: { success: true, data: ... }
- Validation error: { success: false, error: 'Validation failed', details: [...] }
- Server error: { success: false, error: 'Internal server error' }