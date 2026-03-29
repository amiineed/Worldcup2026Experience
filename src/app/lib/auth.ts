// Auth utilities and API client

const API_BASE_URL = import.meta.env.VITE_SUPABASE_URL

export interface ForgotPasswordRequest {
  email: string
}

export interface ResetPasswordRequest {
  token: string
  newPassword: string
}

export interface ApiResponse<T = any> {
  message?: string
  error?: string
  data?: T
}

// Forgot password API call
export const forgotPassword = async (email: string): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/functions/v1/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ email }),
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to send reset email')
    }

    return data
  } catch (error) {
    console.error('Forgot password error:', error)
    return {
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    }
  }
}

// Reset password API call
export const resetPassword = async (token: string, newPassword: string): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/functions/v1/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ token, newPassword }),
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to reset password')
    }

    return data
  } catch (error) {
    console.error('Reset password error:', error)
    return {
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    }
  }
}

// Get token from URL
export const getResetTokenFromUrl = (): string | null => {
  const params = new URLSearchParams(window.location.search)
  return params.get('token')
}

// Validate email format
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate password strength
export const isValidPassword = (password: string): boolean => {
  return password.length >= 6
}
