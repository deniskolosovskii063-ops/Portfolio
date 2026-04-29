import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';
import { PageLoader } from './page-loader';

const SERVER = `https://${projectId}.supabase.co/functions/v1/make-server-de62407f`;

// ── ScrollToTop — мгновенно прокручивает страницу в начало при каждом переходе ──
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

// ── NoIndex — запрещает индексацию поисковиками ───────────────────────────────
function NoIndex() {
  useEffect(() => {
    // Удаляем любые существующие meta robots
    document.querySelectorAll('meta[name="robots"]').forEach(el => el.remove());

    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow, noarchive, nosnippet';
    document.head.appendChild(meta);

    // Также запрещаем для Googlebot и других ботов отдельно
    const metaGoogle = document.createElement('meta');
    metaGoogle.name = 'googlebot';
    metaGoogle.content = 'noindex, nofollow';
    document.head.appendChild(metaGoogle);

    return () => {
      meta.remove();
      metaGoogle.remove();
    };
  }, []);
  return null;
}

// ── KeepAlive — пингует сервер при каждом посещении, если прошло > 12 ч ──────
function KeepAlive() {
  useEffect(() => {
    const INTERVAL = 12 * 60 * 60 * 1000; // 12 часов
    const key = 'portfolio_last_ping';
    try {
      const last = parseInt(localStorage.getItem(key) ?? '0', 10);
      if (Date.now() - last > INTERVAL) {
        fetch(`${SERVER}/ping`, {
          headers: { Authorization: `Bearer ${publicAnonKey}` },
        })
          .then(() => localStorage.setItem(key, String(Date.now())))
          .catch(() => {});
      }
    } catch {
      // localStorage недоступен — игнорируем
    }
  }, []);
  return null;
}

// ── Root layout ───────────────────────────────────────────────────────────────
export default function RootLayout() {
  const { pathname } = useLocation();

  // Skip loader on utility/service pages
  const showLoader = pathname !== '/migrate' && pathname !== '/novebatest';

  return (
    <>
      <ScrollToTop />
      <NoIndex />
      <KeepAlive />
      {/* key={pathname} re-mounts the loader on every navigation */}
      {showLoader && <PageLoader key={pathname} />}
      <Outlet />
    </>
  );
}