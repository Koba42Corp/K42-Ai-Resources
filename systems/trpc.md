# tRPC

## Overview

tRPC is an end-to-end typesafe API framework that lets you build APIs without code generation or runtime overhead. It provides full TypeScript type safety from client to server, making API development faster and safer.

**Type**: API Framework / Type-Safe RPC  
**License**: MIT (Open Source)  
**Primary Language**: TypeScript  
**Founded**: 2020  
**Website**: [trpc.io](https://trpc.io)

---

## What is tRPC?

tRPC allows you to build APIs with full TypeScript type safety without code generation. Your API types are automatically inferred on the client, providing autocomplete, type checking, and refactoring safety.

### Key Characteristics

- **End-to-End Type Safety**: Types flow from server to client
- **No Code Generation**: No build step required
- **Framework Agnostic**: Works with Next.js, Express, Fastify, etc.
- **Lightweight**: Small bundle size
- **Great DX**: Excellent developer experience
- **Automatic Inference**: Types inferred from server
- **React Integration**: First-class React support

---

## Optimal Use Cases

### ✅ Best For

1. **TypeScript Full-Stack Apps**
   - Next.js applications
   - React applications
   - TypeScript projects
   - Type-safe APIs

2. **Monorepo Projects**
   - Shared types between client/server
   - Single source of truth
   - Type safety across packages

3. **Rapid Development**
   - Fast iteration
   - No code generation
   - Instant type updates
   - Great autocomplete

4. **Small to Medium APIs**
   - Internal APIs
   - B2B applications
   - SaaS products
   - Full-stack applications

5. **Developer Productivity**
   - Reduce bugs
   - Faster development
   - Better refactoring
   - Type safety

### ❌ Not Ideal For

1. **Non-TypeScript Projects**
   - Requires TypeScript
   - JavaScript-only projects

2. **Public REST APIs**
   - Not designed for public APIs
   - Use REST/GraphQL instead

3. **Multi-Language Clients**
   - TypeScript/JavaScript only
   - Need code generation for other languages

4. **Very Large Teams**
   - May need more structure
   - GraphQL might be better

---

## Architecture & Core Features

### Core Concepts

#### 1. Router
```typescript
// server/router.ts
import { initTRPC } from '@trpc/server';

const t = initTRPC.context().create();

export const router = t.router({
  getUser: t.procedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return { id: input.id, name: 'John' };
    }),
});
```

#### 2. Client
```typescript
// client.ts
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
    }),
  ],
});

const user = await trpc.getUser.query({ id: '123' });
```

#### 3. React Hooks
```typescript
// React component
import { trpc } from './utils/trpc';

function UserProfile({ userId }: { userId: string }) {
  const { data, isLoading } = trpc.getUser.useQuery({ id: userId });
  
  if (isLoading) return <div>Loading...</div>;
  return <div>{data?.name}</div>;
}
```

### Key Features

#### 1. Type Safety
- Automatic type inference
- Compile-time type checking
- Refactoring safety
- No runtime type errors

#### 2. Input Validation
- Zod integration
- Automatic validation
- Type-safe inputs
- Error handling

#### 3. Procedures
- Queries (GET-like)
- Mutations (POST-like)
- Subscriptions (WebSocket)

#### 4. Middleware
- Authentication
- Logging
- Rate limiting
- Context creation

---

## Comparison with Alternatives

### tRPC vs REST API

| Feature | tRPC | REST API |
|---------|------|----------|
| **Type Safety** | End-to-end | Manual |
| **Code Generation** | None | Manual/Swagger |
| **DX** | Excellent | Good |
| **Public APIs** | Not ideal | Perfect |
| **Standards** | Custom | HTTP standards |

**Choose tRPC when**: Building internal APIs with TypeScript.  
**Choose REST when**: Building public APIs or need HTTP standards.

### tRPC vs GraphQL

| Feature | tRPC | GraphQL |
|---------|------|---------|
| **Type Safety** | Automatic | Code generation |
| **Learning Curve** | Low | Moderate |
| **Over-fetching** | N/A | Solved |
| **Public APIs** | Not ideal | Perfect |
| **Tooling** | Minimal | Extensive |

**Choose tRPC when**: You want type safety without GraphQL complexity.  
**Choose GraphQL when**: You need flexible queries or public APIs.

### tRPC vs gRPC

| Feature | tRPC | gRPC |
|---------|------|------|
| **Protocol** | HTTP/JSON | HTTP/2 + Protobuf |
| **Type Safety** | TypeScript | Protobuf |
| **Language** | TypeScript/JS | Multi-language |
| **Use Case** | Web apps | Microservices |

**Choose tRPC when**: Building web applications.  
**Choose gRPC when**: Building microservices or need multi-language.

---

## Integration with SaaS Products

### Next.js Integration

```typescript
// pages/api/trpc/[trpc].ts
import { createNextApiHandler } from '@trpc/server/adapters/next';
import { appRouter } from '../../../server/router';

export default createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});
```

### Authentication

```typescript
// server/context.ts
import { initTRPC, TRPCError } from '@trpc/server';

export function createContext(opts: CreateNextContextOptions) {
  const token = opts.req.headers.authorization;
  const user = token ? getUserFromToken(token) : null;
  
  return { user };
}

const t = initTRPC.context<Context>().create();

const isAuthenticated = t.middleware(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({ ctx: { user: ctx.user } });
});

export const protectedProcedure = t.procedure.use(isAuthenticated);
```

### Error Handling

```typescript
const router = t.router({
  getUser: t.procedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const user = await db.user.findUnique({ where: { id: input.id } });
      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found',
        });
      }
      return user;
    }),
});
```

### Data Fetching with React

```typescript
// React Query integration
import { trpc } from './utils/trpc';

function UserList() {
  const { data, isLoading, error } = trpc.getUsers.useQuery();
  const utils = trpc.useUtils();
  
  const createUser = trpc.createUser.useMutation({
    onSuccess: () => {
      utils.getUsers.invalidate();
    },
  });
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      {data?.map(user => <div key={user.id}>{user.name}</div>)}
      <button onClick={() => createUser.mutate({ name: 'New User' })}>
        Create User
      </button>
    </div>
  );
}
```

---

## Getting Started

### Installation

```bash
# Server
npm install @trpc/server

# Client
npm install @trpc/client @trpc/react-query

# Next.js adapter
npm install @trpc/server @trpc/next

# Validation
npm install zod
```

### Basic Setup

**Server:**
```typescript
// server/router.ts
import { initTRPC } from '@trpc/server';
import { z } from 'zod';

const t = initTRPC.context().create();

export const appRouter = t.router({
  hello: t.procedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return { greeting: `Hello ${input.name}!` };
    }),
  
  createUser: t.procedure
    .input(z.object({ name: z.string(), email: z.string().email() }))
    .mutation(async ({ input }) => {
      const user = await db.user.create({ data: input });
      return user;
    }),
});

export type AppRouter = typeof appRouter;
```

**Client:**
```typescript
// utils/trpc.ts
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../server/router';

export const trpc = createTRPCReact<AppRouter>();
```

**Provider:**
```typescript
// _app.tsx
import { trpc } from '../utils/trpc';
import { httpBatchLink } from '@trpc/client';

function MyApp({ Component, pageProps }: AppProps) {
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:3000/api/trpc',
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <Component {...pageProps} />
    </trpc.Provider>
  );
}
```

---

## Performance Considerations

### Best Practices

1. **Batching**: Automatic request batching
2. **Caching**: Use React Query caching
3. **Pagination**: Implement pagination
4. **Selective Fields**: Return only needed data
5. **Middleware**: Optimize middleware

### Request Batching

```typescript
// Automatic batching
const trpc = createTRPCProxyClient({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
      maxBatchSize: 10,
    }),
  ],
});
```

---

## Security Features

1. **Input Validation**: Zod validation
2. **Authentication**: Middleware support
3. **Authorization**: Context-based
4. **Error Handling**: Type-safe errors

### Security Best Practices

```typescript
// Validate all inputs
.input(z.object({ id: z.string().uuid() }))

// Use authentication middleware
const protected = t.procedure.use(isAuthenticated);

// Sanitize outputs
.output(z.object({ id: z.string(), name: z.string() }))
```

---

## When to Choose tRPC

### ✅ Choose tRPC If:

- Building TypeScript full-stack apps
- Want end-to-end type safety
- Building internal APIs
- Using Next.js or React
- Want great developer experience
- Need fast iteration
- Working in monorepo

### ❌ Consider Alternatives If:

- Building public REST APIs
- Need multi-language clients
- Using non-TypeScript stack
- Need GraphQL flexibility
- Building microservices (consider gRPC)

---

## Resources

- **Documentation**: [trpc.io/docs](https://trpc.io/docs)
- **Examples**: [github.com/trpc/trpc/tree/main/examples](https://github.com/trpc/trpc/tree/main/examples)
- **GitHub**: [github.com/trpc/trpc](https://github.com/trpc/trpc)
- **Discord**: [trpc.io/discord](https://trpc.io/discord)

---

## Summary

tRPC is an excellent choice for TypeScript full-stack applications that need type-safe APIs without the complexity of GraphQL or code generation. Its seamless integration with React and Next.js makes it ideal for modern web applications.

**Best For**: TypeScript full-stack apps, internal APIs, Next.js/React apps, type-safe APIs  
**Not Ideal For**: Public REST APIs, multi-language clients, non-TypeScript projects

