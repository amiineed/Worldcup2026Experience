import { ForgotPassword } from './ForgotPassword'
import { useNavigate } from 'react-router'

export function ForgotPasswordPage() {
  const navigate = useNavigate()
  
  const handleBack = () => {
    navigate('/login')
  }
  
  const handleSuccess = () => {
    navigate('/login')
  }
  
  return (
    <ForgotPassword 
      onBack={handleBack}
      onSuccess={handleSuccess}
    />
  )
}
