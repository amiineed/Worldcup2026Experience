import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '../../lib/supabase';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        console.log('Handling auth callback...');
        
        // Check if there are fragments in the URL (OAuth callback)
        const urlParams = new URLSearchParams(window.location.search);
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        
        console.log('URL search params:', Object.fromEntries(urlParams.entries()));
        console.log('URL hash params:', Object.fromEntries(hashParams.entries()));
        
        // Let Supabase handle the OAuth exchange
        const { data, error } = await supabase.auth.getSession();
        
        console.log('Current session:', data.session);
        console.log('Session error:', error);
        
        // Try to exchange the code if present
        if (window.location.hash.includes('access_token')) {
          console.log('Found access token in hash, exchanging...');
          const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
          console.log('Session after exchange:', sessionData.session);
          console.log('Exchange error:', sessionError);
        }
        
        // Wait a moment for the auth state to propagate
        setTimeout(() => {
          navigate('/');
        }, 1500);
        
      } catch (error) {
        console.error('Error during auth callback:', error);
        navigate('/?error=auth_failed');
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Completing authentication...</p>
        <p className="text-xs text-muted-foreground mt-2">Please wait while we set up your session</p>
      </div>
    </div>
  );
}
