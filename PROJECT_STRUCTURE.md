Worldcup2026Experience/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   ├── ForgotPassword.tsx       # Forgot password form
│   │   │   │   ├── ResetPassword.tsx        # Reset password form
│   │   │   │   └── PasswordResetSuccess.tsx # Success message
│   │   │   └── LoginModal.tsx               # Updated login modal
│   │   ├── lib/
│   │   │   ├── auth.ts                      # Auth utilities
│   │   │   ├── email.ts                     # EmailJS integration
│   │   │   └── api.ts                       # API client
│   │   └── routes.tsx                       # App routes
│   └── main.tsx
├── database/
│   └── schema.sql                           # Database schema
├── server/                                  # Backend (if needed)
│   ├── routes/
│   │   ├── auth.js                          # Auth routes
│   │   └── password-reset.js               # Password reset routes
│   ├── middleware/
│   │   └── auth.js                          # Auth middleware
│   └── utils/
│       ├── jwt.js                           # JWT utilities
│       └── bcrypt.js                        # Password hashing
├── .env
├── package.json
└── vite.config.ts
