import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import jwt from "https://deno.land/x/jose@v5.2.0/index.ts"
import { createHash } from "https://deno.land/std@0.168.0/crypto/mod.ts"

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

serve(async (req) => {
  // Add CORS headers to all responses
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE, PATCH',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, content-length',
    'Access-Control-Max-Age': '86400',
    'Content-Type': 'application/json',
  }

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { 
      status: 200,
      headers: corsHeaders 
    })
  }

  try {
    const { email } = await req.json()
    
    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Check if user exists (but don't reveal if they don't)
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('email')
      .eq('email', email)
      .single()

    // Always return success message (security: don't reveal if email exists)
    if (userError && userError.code !== 'PGRST116') {
      console.error('Database error:', userError)
      return new Response(
        JSON.stringify({ error: 'Internal server error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Only proceed if user exists
    if (user) {
      // Generate secure reset token
      const resetToken = await generateSecureToken()
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

      // Store token in database
      const { error: tokenError } = await supabase
        .from('password_resets')
        .upsert({
          email: email,
          token: resetToken,
          expires_at: expiresAt.toISOString()
        })

      if (tokenError) {
        console.error('Token storage error:', tokenError)
        return new Response(
          JSON.stringify({ error: 'Internal server error' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      // Send email (this would be handled by your EmailJS integration)
      console.log(`Reset token for ${email}: ${resetToken}`)
      console.log(`Reset link: ${Deno.env.get('FRONTEND_URL')}/reset-password?token=${resetToken}`)
    }

    return new Response(
      JSON.stringify({ 
        message: 'If an account with this email exists, a password reset link has been sent.' 
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Request error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

async function generateSecureToken(): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(Date.now().toString() + Math.random().toString())
  const hash = await createHash('SHA-256').digest(data)
  return Array.from(hash)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}
