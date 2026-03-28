import { sendEmail, emailTemplates } from './email';

// Test function to verify email service
export const testEmailService = async () => {
  console.log('Testing email service...');
  
  try {
    const result = await sendEmail({
      to: 'test@example.com', // Replace with a real email for testing
      ...emailTemplates.passwordReset('https://example.com/reset?token=test')
    });
    
    console.log('Test result:', result);
    return result;
  } catch (error) {
    console.error('Test failed:', error);
    return { success: false, error };
  }
};
