import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const handleContactForm = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Tous les champs sont requis.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, 
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.DEST_EMAIL,
      subject: `Vous avez un message de votre Portfolio : ${subject}`,
      html: `
        <h3>Message reçu via le formulaire</h3>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Sujet :</strong> ${subject}</p>
        <p><strong>Message :</strong><br/>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`[${new Date().toLocaleString()}] 📨 Message reçu de ${name} <${email}>`);


    res.status(200).json({ success: true, message: 'Message envoyé par email ✅' });
  } catch (error) {
    console.error('Erreur envoi email :', error);
    res.status(500).json({ error: 'Erreur lors de l’envoi du message.' });
  }
};
