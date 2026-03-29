import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { GoogleSignInButton } from '../../components/auth/GoogleSignInButton';
import { UserProfile } from '../../components/auth/UserProfile';

export const AuthDemo: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="bg-card rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6">Authentication Demo</h1>
        
        {user ? (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-green-800 mb-2">
                ✅ Successfully Authenticated
              </h2>
              <p className="text-green-700">
                Welcome! You are logged in with your Google account.
              </p>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">User Profile</h3>
              <UserProfile />
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">User Data</h3>
              <pre className="bg-muted p-4 rounded text-sm overflow-auto">
                {JSON.stringify(user, null, 2)}
              </pre>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-yellow-800 mb-2">
                🔐 Not Authenticated
              </h2>
              <p className="text-yellow-700">
                Please sign in with your Google account to continue.
              </p>
            </div>
            
            <div className="flex justify-center">
              <GoogleSignInButton />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
