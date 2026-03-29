import emailjs from '@emailjs/browser';

// EmailJS configuration - you'll need to set up an EmailJS account
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

// Predefined email templates
export const emailTemplates = {
  welcome: (userName: string) => ({
    subject: 'Bienvenue sur World Cup 2026 Experience!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #1b3c88; text-align: center;">Bienvenue ${userName}! 🏆</h1>
        <p style="font-size: 16px; line-height: 1.6;">
          Merci de vous être inscrit à la World Cup 2026 Experience! Nous sommes ravis de vous accueillir dans notre communauté de fans passionnés.
        </p>
        <div style="background: linear-gradient(135deg, #d72638, #1b3c88); color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h2 style="margin: 0 0 10px 0;">Ce qui vous attend:</h2>
          <ul style="margin: 0; padding-left: 20px;">
            <li>Prédictions des matchs en temps réel</li>
            <li>Contenus exclusifs de la Coupe du Monde</li>
            <li>Une communauté de passionnés</li>
            <li>Des expériences interactives uniques</li>
          </ul>
        </div>
        <p style="text-align: center; margin-top: 30px;">
          <a href="${window.location.origin}" style="background: #1b3c88; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Commencer l'expérience
          </a>
        </p>
        <p style="text-align: center; color: #666; font-size: 14px; margin-top: 30px;">
          À bientôt sur World Cup 2026 Experience!<br>
          L'équipe WC2026
        </p>
      </div>
    `
  }),

  passwordReset: (resetLink: string) => ({
    subject: 'Réinitialisation de votre mot de passe',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #1b3c88; text-align: center;">Réinitialisation du mot de passe</h1>
        <p style="font-size: 16px; line-height: 1.6;">
          Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le lien ci-dessous pour continuer:
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}" style="background: #d72638; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-size: 16px;">
            Réinitialiser mon mot de passe
          </a>
        </div>
        <p style="color: #666; font-size: 14px; text-align: center;">
          Ce lien expirera dans 24 heures.<br>
          Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.
        </p>
      </div>
    `
  }),

  matchReminder: (matchInfo: { teams: string; date: string; stadium: string }) => ({
    subject: `Rappel: ${matchInfo.teams} - Ne manquez pas ce match!`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #d72638; text-align: center;">⚽ Match à venir!</h1>
        <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0; text-align: center;">
          <h2 style="color: #1b3c88; margin: 0 0 15px 0;">${matchInfo.teams}</h2>
          <p style="margin: 5px 0;"><strong>Date:</strong> ${matchInfo.date}</p>
          <p style="margin: 5px 0;"><strong>Stade:</strong> ${matchInfo.stadium}</p>
        </div>
        <p style="font-size: 16px; line-height: 1.6;">
          Préparez vos prédictions et rejoignez la communauté pour vivre cette expérience ensemble!
        </p>
        <p style="text-align: center; margin-top: 30px;">
          <a href="${window.location.origin}" style="background: #1b3c88; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Faire mes prédictions
          </a>
        </p>
      </div>
    `
  })
};
