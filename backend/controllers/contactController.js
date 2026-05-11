import { Resend } from 'resend';

export const handleContactForm = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Tous les champs sont requis.' });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: `Portfolio <onboarding@resend.dev>`,
      to: [process.env.MAIL_FROM_ADDRESS],
      replyTo: email,
      subject: `Portfolio - ${subject}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.5; color: #333;">
          <h2 style="color: #6366f1;">Nouveau message du Portfolio</h2>
          <p><strong>Nom :</strong> ${name}</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Sujet :</strong> ${subject}</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <p><strong>Message :</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      message: 'Votre message a été envoyé avec succès !',
    });

  } catch (error) {
    console.error(`[${new Date().toLocaleString()}] ❌ Erreur :`, error);
    return res.status(500).json({
      error: "Une erreur est survenue lors de l'envoi de l'email.",
      details: error.message,
    });
  }
};