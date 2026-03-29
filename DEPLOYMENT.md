# 🚀 Vercel Deployment Guide

## 📋 Prerequisites
- GitHub repository with your code
- Vercel account (free)
- Supabase project credentials

## 🔧 Step 1: Connect to Vercel

### Option A: Through Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Select "Worldcup2026Experience" project

### Option B: Through Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from your project directory
vercel
```

## ⚙️ Step 2: Configure Project Settings

### Build Settings (Auto-detected by Vercel):
- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Environment Variables:
In Vercel Dashboard → Project Settings → Environment Variables, add:

```
VITE_SUPABASE_URL=https://umfmyaehpjsnyfqyiwsb.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtZm15YWVocGpzbnlmcXlpd3NiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2OTg3MjYsImV4cCI6MjA5MDI3NDcyNn0.t5nVT5HmX2rvtJ0cep9EclgcahcaSYfBEQAoRHxUgdY
```

## 🔄 Step 3: Deploy

### First Deployment:
1. Click "Deploy" in Vercel dashboard
2. Wait for build to complete (~2-3 minutes)
3. Your app will be live at `your-project-name.vercel.app`

### Automatic Deployments:
- Every push to `main` branch triggers automatic deployment
- Pull requests get preview URLs
- Zero-downtime deployments

## 🌐 Step 4: Custom Domain (Optional)

1. In Vercel Dashboard → Project Settings → Domains
2. Add your custom domain
3. Update DNS records (Vercel provides instructions)
4. SSL certificate automatically provisioned

## 🔒 Step 5: Supabase Configuration

Update your Supabase project settings:

1. Go to Supabase Dashboard → Authentication → Settings
2. Add your Vercel URL to "Site URL" and "Redirect URLs":
   ```
   https://your-project-name.vercel.app
   https://your-project-name.vercel.app/auth/callback
   ```

## 🧪 Step 6: Test Everything

1. **Visit your deployed site**
2. **Test Google OAuth authentication**
3. **Test email/password authentication**
4. **Check responsive design**
5. **Test all interactive features**

## 📊 Vercel Free Tier Limits:
- **100GB bandwidth/month**
- **Unlimited deployments**
- **Custom domains**
- **Automatic HTTPS**
- **Preview deployments**

## 🚨 Troubleshooting:

### Build Errors:
- Check all dependencies are in `package.json`
- Ensure environment variables are set correctly
- Verify build command works locally

### Authentication Issues:
- Verify Supabase redirect URLs
- Check environment variables in Vercel
- Ensure CORS is configured in Supabase

### Performance Issues:
- Enable Vercel Analytics (free)
- Check Vercel Speed Insights
- Optimize images and assets

## 🔄 CI/CD Workflow:

```
Git Push → Vercel Build → Auto Deploy → Live Site
     ↓
Preview URL (for PRs)
```

## 📱 Mobile Optimization:

Your app is already mobile-responsive thanks to Tailwind CSS. Vercel automatically:
- Optimizes asset delivery
- Enables HTTP/2
- Provides CDN globally

## 🎉 You're Live!

Your World Cup 2026 Experience is now:
- ✅ Deployed on Vercel
- ✅ Secure with HTTPS
- ✅ Fast global CDN
- ✅ Auto-deploying from Git
- ✅ Ready for users!

---

**Need help?** Check Vercel's docs or ask in their Discord community!
