/**
 * Simple Router Utility
 * Lightweight client-side routing for vanilla TypeScript
 */

export interface Route {
  path: string;
  component: () => HTMLElement;
  title?: string;
}

export interface RouterConfig {
  root?: string;
  notFound?: () => HTMLElement;
  onRouteChange?: (path: string) => void;
}

class Router {
  private routes: Route[] = [];
  private currentRoute: Route | null = null;
  private config: RouterConfig;
  private root: string;

  constructor(config: RouterConfig = {}) {
    this.config = config;
    this.root = config.root || '/';
    this.init();
  }

  private init(): void {
    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
      this.handleRoute();
    });
  }

  /**
   * Initialize route handling (call after routes are registered)
   */
  start(): void {
    this.handleRoute();
  }

  /**
   * Register a route
   */
  addRoute(route: Route): void {
    this.routes.push(route);
  }

  /**
   * Register multiple routes
   */
  addRoutes(routes: Route[]): void {
    routes.forEach((route) => this.addRoute(route));
  }

  /**
   * Navigate to a path
   */
  navigate(path: string, replace: boolean = false): void {
    const fullPath = path.startsWith('/') ? path : `/${path}`;
    
    if (replace) {
      window.history.replaceState({}, '', fullPath);
    } else {
      window.history.pushState({}, '', fullPath);
    }

    this.handleRoute();
  }

  /**
   * Get current path
   */
  getCurrentPath(): string {
    return window.location.pathname.replace(this.root, '') || '/';
  }

  /**
   * Get route parameters from path
   */
  getParams(routePath: string, currentPath: string): Record<string, string> {
    const params: Record<string, string> = {};
    const routeParts = routePath.split('/');
    const pathParts = currentPath.split('/');

    routeParts.forEach((part, index) => {
      if (part.startsWith(':')) {
        const paramName = part.slice(1);
        params[paramName] = pathParts[index] || '';
      }
    });

    return params;
  }

  /**
   * Check if a route matches the current path
   */
  private matchRoute(routePath: string, currentPath: string): boolean {
    const routeParts = routePath.split('/').filter(Boolean);
    const pathParts = currentPath.split('/').filter(Boolean);

    if (routeParts.length !== pathParts.length) {
      return false;
    }

    return routeParts.every((part, index) => {
      return part.startsWith(':') || part === pathParts[index];
    });
  }

  /**
   * Handle route changes
   */
  private handleRoute(): void {
    const currentPath = this.getCurrentPath();
    
    // Find matching route
    const route = this.routes.find((r) => this.matchRoute(r.path, currentPath));

    if (route) {
      this.currentRoute = route;
      
      // Update document title
      if (route.title) {
        document.title = route.title;
      }

      // Call route change callback
      if (this.config.onRouteChange) {
        this.config.onRouteChange(currentPath);
      }

      // Render component
      this.render(route.component());
    } else {
      // 404 - Not Found
      if (this.config.notFound) {
        this.render(this.config.notFound());
      } else {
        this.render(this.createNotFoundPage());
      }
    }
  }

  /**
   * Render component to app container
   */
  private render(component: HTMLElement): void {
    const app = document.querySelector<HTMLDivElement>('#app');
    if (app) {
      app.innerHTML = '';
      app.appendChild(component);
    }
  }

  /**
   * Default 404 page
   */
  private createNotFoundPage(): HTMLElement {
    const notFound = document.createElement('div');
    notFound.className = 'min-h-screen flex items-center justify-center bg-gray-50';
    notFound.innerHTML = `
      <div class="text-center">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <p class="text-gray-600 mb-6">Page not found</p>
        <button id="go-home" class="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors">
          Go Home
        </button>
      </div>
    `;

    const goHomeBtn = notFound.querySelector('#go-home');
    if (goHomeBtn) {
      goHomeBtn.addEventListener('click', () => {
        this.navigate('/');
      });
    }

    return notFound;
  }

  /**
   * Get current route
   */
  getCurrentRoute(): Route | null {
    return this.currentRoute;
  }
}

// Export singleton instance
let routerInstance: Router | null = null;

export function createRouter(config?: RouterConfig): Router {
  if (!routerInstance) {
    routerInstance = new Router(config);
  }
  return routerInstance;
}

export function getRouter(): Router {
  if (!routerInstance) {
    throw new Error('Router not initialized. Call createRouter() first.');
  }
  return routerInstance;
}
