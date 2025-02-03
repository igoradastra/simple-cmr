import { createRoot } from 'react-dom/client';
import './index.css';
import { PagesRouter } from './pages/Routes.tsx';

createRoot(document.getElementById('root')!).render(<PagesRouter />);
