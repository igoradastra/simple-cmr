import { createRoot } from 'react-dom/client';
import './index.css';
import { PagesRouter } from './pages/Routes.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthProvider';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <PagesRouter />
    </AuthProvider>
  </QueryClientProvider>
);
