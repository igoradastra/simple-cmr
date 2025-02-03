import { createRoot } from 'react-dom/client';
import './index.css';
import { Users } from './pages/Users/index.tsx';

createRoot(document.getElementById('root')!).render(<Users />);
