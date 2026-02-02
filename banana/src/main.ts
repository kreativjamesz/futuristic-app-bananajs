import './style.css';
import { createRouter, type Route } from './utils/router';
import { createHomePage, createDocsPage } from './pages';
import { createEditorPage } from './pages/Editor';

// Add smooth scrolling
document.documentElement.style.scrollBehavior = 'smooth';

// Add scroll offset for fixed navbar
const style = document.createElement('style');
style.textContent = `
  html {
    scroll-padding-top: 4rem;
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  section {
    animation: fadeInUp 0.6s ease-out;
  }
`;
document.head.appendChild(style);

// Define routes
const routes: Route[] = [
  {
    path: '/',
    component: createHomePage,
    title: 'BananaJS - Visual Page Builder',
  },
  {
    path: '/docs',
    component: createDocsPage,
    title: 'Documentation - BananaJS',
  },
  {
    path: '/editor',
    component: createEditorPage,
    title: 'Editor - BananaJS',
  },
];

// Initialize router
const router = createRouter({
  onRouteChange: (path) => {
    console.log('Route changed to:', path);
  },
  notFound: () => {
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
        router.navigate('/');
      });
    }

    return notFound;
  },
});

// Register routes
router.addRoutes(routes);

// Start router (handle initial route)
router.start();

// Export router for use in components
export { router };
