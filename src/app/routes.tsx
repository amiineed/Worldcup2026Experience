import { createBrowserRouter } from 'react-router';
import { HomePage } from './components/HomePage';
import { UpdatePassword } from './components/UpdatePassword';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: HomePage,
  },
  {
    path: '/update-password',
    Component: UpdatePassword,
  },
]);
