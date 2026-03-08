---
title: Thoughts on React Server Components
slug: react-server-components
date: 2024-02-28
excerpt: Analyzing the shift in mental model required for adopting RSCs in production applications.
tags:
  - React
  - Engineering
readTime: 8 min read
---

# Thoughts on React Server Components

React Server Components (RSC) represent one of the biggest shifts in the React ecosystem since Hooks. They allow us to render components on the server that never hydrate on the client.

## The Mental Model Shift

Traditionally, we thought of React components as client-side entities that might get server-rendered for initial HTML. With RSC, we now have a clear separation:

-   **Server Components**: No interactivity, direct backend access, zero bundle size.
-   **Client Components**: Interactive, standard React behavior, adds to bundle size.

### Benefits

1.  **Zero Bundle Size**: Dependencies used in Server Components don't get sent to the client.
2.  **Direct Database Access**: You can query your DB directly inside your component.

```tsx
// This runs only on the server
import db from './db';

async function Post({ id }) {
  const post = await db.posts.findById(id);
  return <div>{post.title}</div>;
}
```

## Challenges

The ecosystem is still catching up. Many libraries assume they are running in a client environment. Caching strategies and data revalidation patterns are also more complex.

## Final Thoughts

RSC is the future, but the transition period will be bumpy. It requires unlearning some patterns we've relied on for years.
