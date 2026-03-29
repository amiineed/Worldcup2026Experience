import { useState, useEffect } from 'react'
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { resetPassword, getResetTokenFromUrl, isValidPassword } from '../../lib/auth'

export function ResetPassword() {
  const [token, setToken] = useState<string | null>(null)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [tokenValid, setTokenValid] = useState<boolean | null>(null)

  useEffect(() => {
    // Get token from URL
    const resetToken = getResetTokenFromUrl()
    
    if (!resetToken) {
      setStatus('error')
      setMessage('Invalid reset link. Please request a new password reset.')
      setTokenValid(false)
    } else {
      setToken(resetToken)
      setTokenValid(true)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!token) {
      setStatus('error')
      setMessage('Invalid reset token')
      return
    }

    if (!newPassword) {
      setStatus('error')
      setMessage('Please enter a new password')
      return
    }

    if (!isValidPassword(newPassword)) {
      setStatus('error')
      setMessage('Password must be at least 6 characters long')
      return
    }

    if (newPassword !== confirmPassword) {
      setStatus('error')
      setMessage('Passwords do not match')
      return
    }

    setStatus('loading')
    setMessage('')

    try {
      const result = await resetPassword(token, newPassword)
      
      if (result.error) {
        setStatus('error')
        setMessage(result.error)
      } else {
        setStatus('success')
        setMessage('Password reset successful! Redirecting to login...')
        setTimeout(() => {
          window.location.href = '/login'
        }, 3000)
      }
    } catch (error) {
      setStatus('error')
      setMessage('An unexpected error occurred. Please try again.')
    }
  }

  if (tokenValid === false) {
    return (
      <div className="w-full max-w-md mx-auto p-6 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Invalid Reset Link</h2>
        <p className="text-gray-600 mb-6">
          This password reset link is invalid or has expired. Please request a new one.
        </p>
        <a
          href="/forgot-password"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Request New Reset Link
        </a>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto p-6"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: 'spring' }}
          className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <Lock className="w-8 h-8 text-blue-600" />
        </motion.div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Reset Password</h2>
        <p className="text-gray-600">
          Enter your new password below.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* New Password */}
        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
            New Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              disabled={status === 'loading'}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
            Confirm New Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              disabled={status === 'loading'}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Password Requirements */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm font-medium text-gray-700 mb-2">Password Requirements:</p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full ${newPassword.length >= 6 ? 'bg-green-500' : 'bg-gray-300'}`} />
              At least 6 characters
            </li>
            <li className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full ${newPassword === confirmPassword && newPassword.length > 0 ? 'bg-green-500' : 'bg-gray-300'}`} />
              Passwords match
            </li>
          </ul>
        </div>

        {/* Status Messages */}
        <AnimatePresence mode="wait">
          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{message}</span>
            </motion.div>
          )}
          
          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700"
            >
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{message}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {status === 'loading' && <Loader2 className="w-5 h-5 animate-spin" />}
          {status === 'loading' ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
    </motion.div>
  )
}
