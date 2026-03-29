import { useState, useEffect, createContext, useContext } from 'react';
import { RouterProvider } from 'react-router';
import { router } from './routes';
import { FootballLoader } from './components/UIEnhancements';
import { Toaster } from 'sonner';
import { AuthProvider, useAuth } from '../contexts/AuthContext';

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

// Bridge component to sync auth state with app context
const AuthBridge: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const { isLoggedIn, setIsLoggedIn } = useAppContext();

  useEffect(() => {
    // Update app context login state based on Supabase auth
    const shouldBeLoggedIn = !!user;
    if (isLoggedIn !== shouldBeLoggedIn) {
      setIsLoggedIn(shouldBeLoggedIn);
    }
  }, [user, isLoggedIn, setIsLoggedIn]);

  return <>{children}</>;
};

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
    <AuthProvider>
      <AppContext.Provider value={{ isDarkMode, setIsDarkMode, isLoggedIn, setIsLoggedIn }}>
        <AuthBridge>
          <RouterProvider router={router} />
          <Toaster position="top-right" richColors />
        </AuthBridge>
      </AppContext.Provider>
    </AuthProvider>
  );
}
