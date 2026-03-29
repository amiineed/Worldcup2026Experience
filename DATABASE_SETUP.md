# Database Setup Instructions

## 🗄️ Manual Database Setup

Since the migration system is having issues, please execute these SQL commands manually in your Supabase Dashboard:

### 1. Go to Supabase Dashboard
1. Navigate to https://supabase.com/dashboard
2. Select your project: umfmyaehpjsnyfqyiwsb
3. Go to **SQL Editor** from the left sidebar

### 2. Execute SQL Commands

Copy and paste this entire SQL script into the SQL Editor:

```sql
-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create password reset tokens table
CREATE TABLE IF NOT EXISTS password_resets (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_password_resets_token ON password_resets(token);
CREATE INDEX IF NOT EXISTS idx_password_resets_email ON password_resets(email);

-- Grant permissions (if needed)
-- These commands ensure your Edge Functions can access the tables
GRANT ALL ON users TO authenticated;
GRANT ALL ON users TO service_role;
GRANT ALL ON password_resets TO authenticated;
GRANT ALL ON password_resets TO service_role;
```

### 3. Execute the Script
1. Click **Run** (or press Ctrl+Enter)
2. Wait for the script to complete
3. Verify you see "Success" message

### 4. Verify Tables
1. Go to **Table Editor** from the left sidebar
2. You should see both `users` and `password_resets` tables
3. Click on each table to verify the structure

## ✅ Next Steps

Once the database is set up:

1. **Test the password reset workflow:**
   - Navigate to `http://localhost:5173/forgot-password`
   - Enter an email address
   - Check browser console for token generation
   - Navigate to `http://localhost:5173/reset-password?token=YOUR_TOKEN`

2. **Configure EmailJS:**
   - Make sure your EmailJS template has these variables:
     - `{{to_email}}`
     - `{{subject}}`
     - `{{html_content}}`
     - `{{from_name}}`
     - `{{reply_to}}`

3. **Update FRONTEND_URL:**
   - Change `http://localhost:3000` to `http://localhost:5173` in your environment variables

## 🔧 Troubleshooting

If you encounter issues:

1. **Functions not working**: Check Supabase Dashboard → Edge Functions → Logs
2. **Email not sending**: Verify EmailJS configuration and template variables
3. **Database errors**: Ensure tables exist and have proper permissions
4. **Token invalid**: Check token generation and storage in password_resets table

Your password reset system is now ready for testing! 🚀
