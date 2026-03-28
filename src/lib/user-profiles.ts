import { supabase } from './supabase'

export interface UserProfile {
  id?: string
  user_id: string
  email: string
  created_at?: string
  updated_at?: string
  is_active?: boolean
  first_name?: string
  last_name?: string
  display_name?: string
  avatar_url?: string
  phone?: string
  favorite_team?: string
  tickets_booked?: boolean
  notifications_enabled?: boolean
}

export const createUserProfile = async (userId: string, email: string): Promise<UserProfile | null> => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .insert([
        {
          user_id: userId,
          email: email,
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Error creating user profile:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error creating user profile:', error)
    return null
  }
}

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error) {
      console.error('Error fetching user profile:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return null
  }
}

export const updateUserProfile = async (userId: string, updates: Partial<UserProfile>): Promise<UserProfile | null> => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('user_id', userId)
      .select()
      .single()

    if (error) {
      console.error('Error updating user profile:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error updating user profile:', error)
    return null
  }
}

export const deleteUserProfile = async (userId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('user_profiles')
      .delete()
      .eq('user_id', userId)

    if (error) {
      console.error('Error deleting user profile:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error deleting user profile:', error)
    return false
  }
}
