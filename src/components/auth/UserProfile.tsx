import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut } from 'lucide-react';
import { cn } from '../../lib/utils';

interface UserProfileProps {
  className?: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({ className }) => {
  const { user, signOut, loading } = useAuth();

  if (loading) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
        <div className="h-4 w-24 rounded bg-muted animate-pulse" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex items-center gap-2">
        <div className="relative">
          <div className="h-8 w-8 rounded-full overflow-hidden bg-muted flex items-center justify-center">
            {user.avatar_url ? (
              <img
                src={user.avatar_url}
                alt={user.name || user.email}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-xs font-medium text-muted-foreground">
                {getInitials(user.name || user.email)}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex flex-col">
          <span className="text-sm font-medium">
            {user.name || 'User'}
          </span>
          <span className="text-xs text-muted-foreground">
            {user.email}
          </span>
          {user.provider && (
            <span className="text-xs text-muted-foreground capitalize">
              via {user.provider}
            </span>
          )}
        </div>
      </div>

      <button
        onClick={handleSignOut}
        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0"
        title="Sign out"
      >
        <LogOut className="h-4 w-4" />
      </button>
    </div>
  );
};
