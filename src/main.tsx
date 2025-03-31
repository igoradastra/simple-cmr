import { createRoot } from 'react-dom/client';
import './index.css';
import { PagesRouter } from './pages/Routes.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthProvider';
import { worker } from './api/mocks/browser.ts';
import { GoogleOAuthProvider } from '@react-oauth/google';

if (process.env.NODE_ENV === 'development') {
  worker.start();
}

const queryClient = new QueryClient();
const CLIENT_ID = '641994235537-nc8n2sqbqg4qe6i38f7224oh6dae192a.apps.googleusercontent.com'
createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId={CLIENT_ID}>
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <PagesRouter />
    </AuthProvider>
  </QueryClientProvider>
  </GoogleOAuthProvider>
);
