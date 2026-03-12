import { createBrowserRouter, redirect } from 'react-router';
import GazpromIDPage from './pages/GazpromIDPage';
import GIDPage from './pages/GIDPage';

export const router = createBrowserRouter([
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
]);
