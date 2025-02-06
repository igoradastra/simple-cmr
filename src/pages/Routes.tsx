import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { UserDetailPage } from './UsersDetail';
import { NotFound } from './NotFound';
import { Users } from './Users';
import { NewUserPage } from './NewUser';

export const PagesRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/users" />} />
        <Route path="/users" element={<Users />} />
        <Route path="/user/:id" element={<UserDetailPage />} />
        <Route path="/new-user" element={<NewUserPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
