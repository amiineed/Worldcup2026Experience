import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
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
    const { token, newPassword } = await req.json()
    
    if (!token || !newPassword) {
      return new Response(
        JSON.stringify({ error: 'Token and new password are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (newPassword.length < 6) {
      return new Response(
        JSON.stringify({ error: 'Password must be at least 6 characters long' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Validate token
    const { data: resetData, error: tokenError } = await supabase
      .from('password_resets')
      .select('*')
      .eq('token', token)
      .single()

    if (tokenError || !resetData) {
      return new Response(
        JSON.stringify({ error: 'Invalid or expired reset token' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Check if token is expired
    if (new Date() > new Date(resetData.expires_at)) {
      // Delete expired token
      await supabase
        .from('password_resets')
        .delete()
        .eq('token', token)
      
      return new Response(
        JSON.stringify({ error: 'Reset token has expired' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword)

    // Update user password
    const { error: updateError } = await supabase
      .from('users')
      .update({ 
        password_hash: hashedPassword,
        updated_at: new Date().toISOString()
      })
      .eq('email', resetData.email)

    if (updateError) {
      console.error('Password update error:', updateError)
      return new Response(
        JSON.stringify({ error: 'Failed to update password' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Delete the used token
    await supabase
      .from('password_resets')
      .delete()
      .eq('token', token)

    return new Response(
      JSON.stringify({ message: 'Password reset successful' }),
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

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password + 'pepper') // Add pepper for extra security
  const hash = await createHash('SHA-256').digest(data)
  return Array.from(hash)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}
