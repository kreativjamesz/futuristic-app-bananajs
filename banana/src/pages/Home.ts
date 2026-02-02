/**
 * Home Page
 */

import {
  createNavbar,
  createHero,
  createFeatures,
  createWhy,
  createCTA,
  createFooter,
} from '../components';

export function createHomePage(): HTMLElement {
  const container = document.createElement('div');
  container.className = 'min-h-screen';

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
  container.appendChild(navbar);
  container.appendChild(hero);
  container.appendChild(features);
  container.appendChild(why);
  container.appendChild(cta);
  container.appendChild(footer);

  return container;
}
