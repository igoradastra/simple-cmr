import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { UsersList } from './Users/UsersList';
import { UserDetailPage } from './UsersDetail';
import { NotFoundPage } from './NotFound';

export const PagesRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/users" />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/user/:id" element={<UserDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
