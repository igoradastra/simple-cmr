import { createRoot } from 'react-dom/client';
import './index.css';
import { PagesRouter } from './pages/Routes.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <PagesRouter />
  </QueryClientProvider>
);
