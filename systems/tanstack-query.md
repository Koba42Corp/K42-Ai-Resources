# TanStack Query (React Query)

## Overview

TanStack Query (formerly React Query) is a powerful data synchronization library for React applications. It makes fetching, caching, synchronizing, and updating server state easy.

**Type**: Data Fetching Library / State Management  
**License**: MIT (Open Source)  
**Primary Language**: TypeScript/JavaScript  
**Founded**: 2019  
**Website**: [tanstack.com/query](https://tanstack.com/query)

---

## What is TanStack Query?

TanStack Query is a data-fetching library that provides hooks for fetching, caching, and synchronizing server state in React applications. It eliminates the need for manual loading states, error handling, and caching logic.

### Key Characteristics

- **Automatic Caching**: Smart caching out of the box
- **Background Updates**: Automatic refetching
- **Optimistic Updates**: Update UI before server response
- **Infinite Queries**: Handle pagination easily
- **Mutations**: Handle data mutations
- **DevTools**: Built-in debugging tools
- **TypeScript**: Full TypeScript support

---

## Optimal Use Cases

### ✅ Best For

1. **React Applications**
   - Data fetching
   - Server state management
   - Caching
   - Synchronization

2. **SaaS Dashboards**
   - Real-time data
   - Background updates
   - Optimistic updates
   - Data synchronization

3. **Data-Heavy Apps**
   - Complex data fetching
   - Pagination
   - Infinite scroll
   - Real-time updates

### ❌ Not Ideal For

1. **Simple Data Fetching**
   - May be overkill
   - Use fetch/axios directly

2. **Non-React Apps**
   - React-focused
   - Consider alternatives

---

## Core Features

### Queries

```typescript
import { useQuery } from '@tanstack/react-query';

function UserProfile({ userId }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
  });
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  return <div>{data.name}</div>;
}
```

### Mutations

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';

function CreateUser() {
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
  
  return (
    <button onClick={() => mutation.mutate({ name: 'John' })}>
      Create User
    </button>
  );
}
```

---

## Getting Started

### Installation

```bash
npm install @tanstack/react-query
```

### Setup

```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <YourApp />
    </QueryClientProvider>
  );
}
```

---

## When to Choose TanStack Query

### ✅ Choose TanStack Query If:

- Building React applications
- Need server state management
- Want automatic caching
- Building data-heavy apps
- Need background updates

### ❌ Consider Alternatives If:

- Simple data fetching
- Non-React apps
- Very simple apps

---

## Resources

- **Documentation**: [tanstack.com/query/latest](https://tanstack.com/query/latest)
- **Examples**: [tanstack.com/query/latest/docs/react/examples/react/basic](https://tanstack.com/query/latest/docs/react/examples/react/basic)

---

## Summary

TanStack Query is essential for React applications that need robust data fetching, caching, and synchronization. It eliminates boilerplate and provides excellent developer experience.

**Best For**: React apps, server state management, data fetching, caching  
**Not Ideal For**: Simple apps, non-React apps

