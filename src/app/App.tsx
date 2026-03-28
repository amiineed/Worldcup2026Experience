import { useState, useEffect, createContext, useContext } from 'react';
import { RouterProvider } from 'react-router';
import { router } from './routes';
import { FootballLoader } from './components/UIEnhancements';
import { Toaster } from 'sonner';

interface AppContextType {
  isDarkMode: boolean;
  setIsDarkMode: (v: boolean) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (v: boolean) => void;
}

export const AppContext = createContext<AppContextType>({
  isDarkMode: false,
  setIsDarkMode: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export const useAppContext = () => useContext(AppContext);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  if (isLoading) {
    return <FootballLoader />;
  }

  return (
    <AppContext.Provider value={{ isDarkMode, setIsDarkMode, isLoggedIn, setIsLoggedIn }}>
      <RouterProvider router={router} />
      <Toaster position="top-right" richColors />
    </AppContext.Provider>
  );
}
