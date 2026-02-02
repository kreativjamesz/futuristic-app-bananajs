# Router Utility

Lightweight client-side routing for vanilla TypeScript applications.

## Usage

### Basic Setup

```typescript
import { createRouter, type Route } from './utils/router';
import { createHomePage, createDocsPage } from './pages';

// Define routes
const routes: Route[] = [
  {
    path: '/',
    component: createHomePage,
    title: 'Home - BananaJS',
  },
  {
    path: '/docs',
    component: createDocsPage,
    title: 'Documentation - BananaJS',
  },
  {
    path: '/user/:id',
    component: () => createUserPage(),
    title: 'User Profile',
  },
];

// Initialize router
const router = createRouter({
  onRouteChange: (path) => {
    console.log('Route changed to:', path);
  },
  notFound: () => {
    // Custom 404 page
    return createNotFoundPage();
  },
});

// Register routes
router.addRoutes(routes);
```

### Navigation

```typescript
import { getRouter } from './utils/router';

// Navigate to a route
getRouter().navigate('/docs');

// Replace current history entry (no back button)
getRouter().navigate('/docs', true);

// Get current path
const currentPath = getRouter().getCurrentPath();

// Get current route
const currentRoute = getRouter().getCurrentRoute();
```

### Route Parameters

Routes can include parameters using `:paramName`:

```typescript
{
  path: '/user/:id',
  component: () => {
    const router = getRouter();
    const params = router.getParams('/user/:id', router.getCurrentPath());
    // params.id contains the value
    return createUserPage(params.id);
  },
}
```

### In HTML/Components

```html
<button data-route="/docs">Go to Docs</button>
```

The router automatically handles `data-route` attributes in the Navbar component.

## Features

- ✅ History API based (no hash routing)
- ✅ Type-safe with TypeScript
- ✅ Route parameters support
- ✅ Custom 404 handling
- ✅ Route change callbacks
- ✅ Document title updates
- ✅ Browser back/forward support
- ✅ Lightweight (~2KB)

## API

### `createRouter(config?: RouterConfig): Router`

Creates a new router instance.

### `getRouter(): Router`

Gets the current router instance.

### `router.navigate(path: string, replace?: boolean): void`

Navigate to a path.

### `router.getCurrentPath(): string`

Get the current path.

### `router.getCurrentRoute(): Route | null`

Get the current route object.

### `router.getParams(routePath: string, currentPath: string): Record<string, string>`

Extract parameters from a route path.
