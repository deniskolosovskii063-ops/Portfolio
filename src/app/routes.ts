import { createBrowserRouter, redirect } from 'react-router';
import GazpromIDPage from './pages/GazpromIDPage';
import GIDPage from './pages/GIDPage';
import MigratePage from './pages/MigratePage';

// Vite replaces import.meta.env.BASE_URL at build time.
// In Figma Make's runtime environment import.meta.env is undefined,
// so we guard with try/catch to always fall back to '/'.
function getBasename(): string {
  try {
    return import.meta.env.BASE_URL ?? '/';
  } catch {
    return '/';
  }
}

export const router = createBrowserRouter(
  [
    {
      path: '/',
      loader: () => redirect('/GazpromID'),
    },
    {
      path: '/GazpromID',
      Component: GazpromIDPage,
    },
    {
      path: '/GID',
      Component: GIDPage,
    },
    {
      path: '/migrate',
      Component: MigratePage,
    },
  ],
  { basename: getBasename() }
);