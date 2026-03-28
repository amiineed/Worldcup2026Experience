import { useState, useEffect } from 'react';
import { Lock, CheckCircle, AlertCircle, Loader2, Trophy, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router';

export function UpdatePassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [sessionReady, setSessionReady] = useState(false);
  const [sessionError, setSessionError] = useState(false);

  // Supabase auto-detects the recovery token from the URL hash fragment
  // and establishes a session. We listen for that event.
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setSessionReady(true);
      }
    });

    // Also check if a session already exists (e.g. user refreshed the page)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setSessionReady(true);
      } else {
        // Give Supabase a moment to process the hash
        const timeout = setTimeout(() => {
          if (!sessionReady) setSessionError(true);
        }, 5000);
        return () => clearTimeout(timeout);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setStatus('error');
      setErrorMsg('Veuillez remplir tous les champs');
      return;
    }

    if (password.length < 6) {
      setStatus('error');
      setErrorMsg('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    if (password !== confirmPassword) {
      setStatus('error');
      setErrorMsg('Les mots de passe ne correspondent pas');
      return;
    }

    setStatus('loading');
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        setStatus('error');
        setErrorMsg(`Erreur : ${error.message}`);
        console.error('Update password error:', error);
        return;
      }
      setStatus('success');
      // Sign out after password change so user re-logs with new password
      await supabase.auth.signOut();
      setTimeout(() => navigate('/'), 3000);
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(`Erreur inattendue : ${err.message}`);
      console.error('Update password exception:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f2ee] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, type: 'spring', damping: 25 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-[460px] overflow-hidden"
      >
        {/* Header */}
        <div className="relative bg-gradient-to-br from-[#d72638] to-[#1b3c88] text-white p-8 pb-10">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-32 h-32 border-4 border-white rounded-full -translate-y-8 translate-x-8" />
            <div className="absolute bottom-0 left-0 w-24 h-24 border-4 border-white rounded-full translate-y-8 -translate-x-8" />
          </div>
          <div className="relative flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6" />
            </div>
            <span className="text-sm text-white/70">World Cup 2026</span>
          </div>
          <h1 className="text-3xl mb-2 relative">Nouveau mot de passe</h1>
          <p className="text-white/80 relative">Choisissez un mot de passe sécurisé pour votre compte</p>
        </div>

        {/* Body */}
        <div className="p-8">
          {/* Session not ready yet */}
          {!sessionReady && !sessionError && (
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <Loader2 className="w-8 h-8 animate-spin text-[#1b3c88]" />
              <p className="text-gray-600 text-sm">Vérification de votre lien de réinitialisation...</p>
            </div>
          )}

          {/* Session error - invalid or expired link */}
          {sessionError && !sessionReady && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Lien invalide ou expiré</p>
                  <p className="text-xs mt-1">Veuillez demander un nouveau lien de réinitialisation.</p>
                </div>
              </div>
              <button
                onClick={() => navigate('/')}
                className="w-full flex items-center justify-center gap-2 text-[#1b3c88] hover:text-[#d72638] transition-colors text-sm py-3"
              >
                <ArrowLeft className="w-4 h-4" />
                Retour à l'accueil
              </button>
            </div>
          )}

          {/* Form */}
          {sessionReady && status !== 'success' && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="new-password" className="block text-sm text-gray-700 mb-2">
                  Nouveau mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="new-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setStatus('idle'); }}
                    placeholder="Minimum 6 caractères"
                    className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-lg focus:border-[#1b3c88] focus:outline-none focus:ring-2 focus:ring-[#1b3c88]/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {/* Strength indicator */}
                {password.length > 0 && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${
                          password.length < 6 ? 'bg-red-400' :
                          password.length < 10 ? 'bg-yellow-400' : 'bg-green-400'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(100, (password.length / 12) * 100)}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <span className={`text-xs ${
                      password.length < 6 ? 'text-red-500' :
                      password.length < 10 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {password.length < 6 ? 'Faible' : password.length < 10 ? 'Moyen' : 'Fort'}
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="confirm-password" className="block text-sm text-gray-700 mb-2">
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="confirm-password"
                    type={showConfirm ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => { setConfirmPassword(e.target.value); setStatus('idle'); }}
                    placeholder="Retapez le mot de passe"
                    className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-lg focus:border-[#1b3c88] focus:outline-none focus:ring-2 focus:ring-[#1b3c88]/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {/* Match indicator */}
                {confirmPassword.length > 0 && (
                  <p className={`text-xs mt-1.5 ${password === confirmPassword ? 'text-green-600' : 'text-red-500'}`}>
                    {password === confirmPassword ? '✓ Les mots de passe correspondent' : '✗ Les mots de passe ne correspondent pas'}
                  </p>
                )}
              </div>

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">{errorMsg}</span>
                </motion.div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-[#1b3c88] hover:bg-[#152e6b] text-white py-3 rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === 'loading' && <Loader2 className="w-5 h-5 animate-spin" />}
                {status === 'loading' ? 'Mise à jour...' : 'Mettre à jour le mot de passe'}
              </button>
            </form>
          )}

          {/* Success */}
          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-4 py-4"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl text-gray-900">Mot de passe mis à jour !</h3>
              <p className="text-sm text-gray-600">
                Votre mot de passe a été changé avec succès.<br />
                Redirection vers l'accueil...
              </p>
              <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#d72638] to-[#1b3c88] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 3, ease: 'linear' }}
                />
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
