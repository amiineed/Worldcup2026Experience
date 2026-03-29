import { useState } from 'react'
import { Mail, ArrowLeft, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { forgotPassword, isValidEmail } from '../../lib/auth'

interface ForgotPasswordProps {
  onBack?: () => void
  onSuccess?: () => void
}

export function ForgotPassword({ onBack = () => {}, onSuccess = () => {} }: ForgotPasswordProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setStatus('error')
      setMessage('Please enter your email address')
      return
    }

    if (!isValidEmail(email)) {
      setStatus('error')
      setMessage('Please enter a valid email address')
      return
    }

    setStatus('loading')
    setMessage('')

    try {
      const result = await forgotPassword(email)
      
      if (result.error) {
        setStatus('error')
        setMessage(result.error)
      } else {
        setStatus('success')
        setMessage(result.message || 'If an account with this email exists, a password reset link has been sent.')
        setTimeout(() => {
          onSuccess()
        }, 3000)
      }
    } catch (error) {
      setStatus('error')
      setMessage('An unexpected error occurred. Please try again.')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
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
          <Mail className="w-8 h-8 text-blue-600" />
        </motion.div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Forgot Password?</h2>
        <p className="text-gray-600">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              disabled={status === 'loading'}
            />
          </div>
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
          {status === 'loading' ? 'Sending...' : 'Send Reset Link'}
        </button>

        {/* Back Button */}
        <button
          type="button"
          onClick={onBack}
          className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </button>
      </form>
    </motion.div>
  )
}
