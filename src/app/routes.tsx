import { createBrowserRouter } from 'react-router';
import { HomePage } from './components/HomePage';
import { UpdatePassword } from './components/UpdatePassword';
import { ForgotPasswordPage } from './components/auth/ForgotPasswordPage';
import { ResetPasswordPage } from './components/auth/ResetPasswordPage';
import AuthCallback from './auth/callback';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: HomePage,
  },
  {
    path: '/auth/callback',
    Component: AuthCallback,
  },
  {
    path: '/update-password',
    Component: UpdatePassword,
  },
  {
    path: '/forgot-password',
    Component: ForgotPasswordPage,
  },
  {
    path: '/reset-password',
    Component: ResetPasswordPage,
  },
]);
