import { Suspense } from 'react';
import { RouterProvider } from 'react-router';
import { router } from './routes';

export default function App() {
  return (
    <Suspense fallback={<div className="bg-black min-h-screen" />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
