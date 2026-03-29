import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

const supabaseUrl = `https://${projectId}.supabase.co`;
const supabaseAnonKey = publicAnonKey;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export type AuthUser = {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  provider?: string;
};

export type AuthSession = {
  user: AuthUser;
  session: any;
};
