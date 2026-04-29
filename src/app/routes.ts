import { createBrowserRouter } from 'react-router';
import RootLayout from './components/root-layout';
import GazpromIDPage from './pages/GazpromIDPage';
import GIDPage from './pages/GIDPage';
import NovebaPage from './pages/NovebaPage';
import MigratePage from './pages/MigratePage';
import ZenitPage from './pages/ZenitPage';
import MTSPage from './pages/MTSPage';
import HomePage from './pages/HomePage';
import GIDHubPage from './pages/GIDHubPage';

// Determine basename at runtime so one bundle works in all three environments:
//   • Figma Make preview  — pathname starts with /_components/v2/...
//   • Figma Make published site — root hostname (not github.io, not /_components/)
//   • GitHub Pages         — hostname ends with github.io
function getBasename(): string {
  try {
    const hostname = window.location.hostname;
    const pathname = window.location.pathname;

    // GitHub Pages: deniskolosovskii063-ops.github.io/Portfolio/
    if (hostname.endsWith('github.io')) {
      return '/Portfolio/';
    }

    // Figma Make internal preview — URL is /_components/v2/<hash>/
    // import.meta.env.BASE_URL is baked at build time to this exact path.
    if (pathname.startsWith('/_components/')) {
      return import.meta.env.BASE_URL ?? '/';
    }

    // Figma Make published site, localhost, any other host → root
    return '/';
  } catch {
    return '/';
  }
}

export const router = createBrowserRouter(
  [
    {
      // Root layout: ScrollToTop + NoIndex + KeepAlive
      Component: RootLayout,
      children: [
        { index: true,        path: '/',          Component: HomePage },
        { path: '/GazpromID', Component: GazpromIDPage },
        { path: '/GID',       Component: GIDPage },
        { path: '/gidhub',    Component: GIDHubPage },
        { path: '/noveba',    Component: NovebaPage },
        { path: '/zenit',     Component: ZenitPage },
        { path: '/MTS',       Component: MTSPage },
        { path: '/migrate',   Component: MigratePage },
      ],
    },
  ],
  { basename: getBasename() }
);