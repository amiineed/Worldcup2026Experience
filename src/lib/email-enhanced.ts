import emailjs from '@emailjs/browser';

// EmailJS configuration
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';

export interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}

export const sendEmail = async (options: EmailOptions) => {
  try {
    console.log('=== EMAIL DEBUG INFO ===');
    console.log('To:', options.to);
    console.log('Subject:', options.subject);
    console.log('From:', options.from || 'noreply@worldcup2026.com');
    console.log('HTML length:', options.html.length);
    console.log('EmailJS Public Key:', EMAILJS_PUBLIC_KEY);
    console.log('EmailJS Service ID:', EMAILJS_SERVICE_ID);
    console.log('EmailJS Template ID:', EMAILJS_TEMPLATE_ID);
    console.log('========================');

    // Initialize EmailJS with your public key
    emailjs.init(EMAILJS_PUBLIC_KEY);

    // Convert HTML to plain text for EmailJS
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = options.html;
    const plainText = tempDiv.textContent || tempDiv.innerText || '';

    const templateParams = {
      to_email: Array.isArray(options.to) ? options.to[0] : options.to,
      subject: options.subject,
      message: plainText,
      html_content: options.html,
      from_name: 'World Cup 2026 Experience',
      reply_to: options.from || 'noreply@worldcup2026.com'
    };

    console.log('Template params:', templateParams);

    // Send email using EmailJS
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log('Email sent successfully:', response);
    return { success: true, data: response };
    
  } catch (error: any) {
    console.error('=== EMAILJS ERROR DETAILS ===');
    console.error('Error type:', typeof error);
    console.error('Error message:', error.message);
    console.error('Error status:', error.status);
    console.error('Error text:', error.text);
    console.error('Full error:', error);
    console.error('============================');
    
    // Provide user-friendly error messages
    let userMessage = 'Erreur lors de l\'envoi de l\'email';
    if (error.status === 412) {
      userMessage = 'Configuration EmailJS invalide. Vérifiez vos identifiants.';
    } else if (error.status === 451) {
      userMessage = 'Template EmailJS introuvable.';
    } else if (error.message) {
      userMessage = error.message;
    }
    
    return { success: false, error: userMessage };
  }
};

// Enhanced password reset email template
export const emailTemplates = {
  passwordReset: (resetLink: string) => ({
    subject: 'Réinitialisation de votre mot de passe - World Cup 2026',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
        <!-- Header -->
        <div style="text-align: center; padding: 20px 0; background: linear-gradient(135deg, #d72638, #1b3c88); color: white; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 28px; font-weight: bold;">🏆 World Cup 2026</h1>
          <p style="margin: 5px 0 0 0; opacity: 0.9;">Password Reset Request</p>
        </div>
        
        <!-- Content -->
        <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #1b3c88; margin-bottom: 20px;">Reset Your Password</h2>
          
          <p style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 25px;">
            Hello! You requested to reset your password for your World Cup 2026 Experience account. 
            Click the button below to securely reset your password:
          </p>
          
          <!-- Reset Button -->
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" 
               style="background: linear-gradient(135deg, #d72638, #1b3c88); 
                      color: white; 
                      padding: 15px 30px; 
                      text-decoration: none; 
                      border-radius: 8px; 
                      display: inline-block; 
                      font-size: 16px; 
                      font-weight: bold;
                      box-shadow: 0 4px 15px rgba(215, 38, 56, 0.3);
                      transition: all 0.3s ease;">
              🔐 Reset My Password
            </a>
          </div>
          
          <!-- Security Warning -->
          <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 25px 0; border-radius: 4px;">
            <p style="margin: 0; color: #856404; font-size: 14px;">
              <strong>⚠️ Security Notice:</strong> This link will expire in <strong>1 hour</strong> for your security. 
              If you didn't request this password reset, please ignore this email.
            </p>
          </div>
          
          <!-- Alternative Link -->
          <div style="text-align: center; margin: 20px 0;">
            <p style="color: #666; font-size: 14px; margin-bottom: 10px;">Or copy and paste this link:</p>
            <div style="background: #f8f9fa; padding: 10px; border-radius: 4px; word-break: break-all; font-family: monospace; font-size: 12px;">
              ${resetLink}
            </div>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="text-align: center; padding: 20px; color: #666; font-size: 14px;">
          <p style="margin: 0 0 10px 0;">
            If you have any questions, contact our support team.
          </p>
          <p style="margin: 0;">
            <strong>World Cup 2026 Experience Team</strong><br>
            🌍 Bringing the World Cup to Your Screen
          </p>
          <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #eee;">
            <p style="margin: 0; font-size: 12px; color: #999;">
              This is an automated message. Please do not reply to this email.
            </p>
          </div>
        </div>
      </div>
    `
  }),

  welcome: (userName: string) => ({
    subject: 'Welcome to World Cup 2026 Experience! 🏆',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #1b3c88; text-align: center;">Welcome ${userName}! 🏆</h1>
        <p style="font-size: 16px; line-height: 1.6;">
          Thank you for signing up to the World Cup 2026 Experience! We're excited to have you in our community of passionate fans.
        </p>
        <div style="background: linear-gradient(135deg, #d72638, #1b3c88); color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h2 style="margin: 0 0 10px 0;">What awaits you:</h2>
          <ul style="margin: 0; padding-left: 20px;">
            <li>Real-time match predictions</li>
            <li>Exclusive World Cup content</li>
            <li>A community of passionate fans</li>
            <li>Unique interactive experiences</li>
          </ul>
        </div>
        <p style="text-align: center; margin-top: 30px;">
          <a href="${window.location.origin}" style="background: #1b3c88; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Start the Experience
          </a>
        </p>
        <p style="text-align: center; color: #666; font-size: 14px; margin-top: 30px;">
          See you soon at World Cup 2026 Experience!<br>
          The WC2026 Team
        </p>
      </div>
    `
  })
};

// Send password reset email specifically
export const sendPasswordResetEmail = async (email: string, resetToken: string): Promise<{ success: boolean; error?: string }> => {
  const resetLink = `${window.location.origin}/reset-password?token=${resetToken}`;
  
  const result = await sendEmail({
    to: email,
    ...emailTemplates.passwordReset(resetLink)
  });

  return result;
};
