import './style.css';
import {
  createNavbar,
  createHero,
  createFeatures,
  createWhy,
  createCTA,
  createFooter,
} from './components';

// Initialize landing page
const app = document.querySelector<HTMLDivElement>('#app')!;
app.innerHTML = '';

// Add smooth scrolling
document.documentElement.style.scrollBehavior = 'smooth';

// Build page structure
const navbar = createNavbar();
const hero = createHero();
const features = createFeatures();
features.id = 'features';
const why = createWhy();
why.id = 'why';
const cta = createCTA();
const footer = createFooter();

// Append all sections
app.appendChild(navbar);
app.appendChild(hero);
app.appendChild(features);
app.appendChild(why);
app.appendChild(cta);
app.appendChild(footer);

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
