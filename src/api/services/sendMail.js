// This project uses the nodemailer library to send email
// However, it is recommended to switch over to dedicated email services
// like Mailgun, AWS SES, etc.
import nodemailer from 'nodemailer';

const nodemailerConfig = process.env.NODEMAILER_CONFIG ? JSON.parse(process.env.NODEMAILER_CONFIG) : {};
const transporter = nodemailer.createTransport(nodemailerConfig);

export async function sendMail({ from, to, subject, html }) {
  try {
    await transporter.sendMail({
      from: from || nodemailerConfig?.auth?.user,
      to,
      subject,
      html
    });
  } catch (e) {
    throw new Error(`Could not send email: ${e.message}`);
  }
}
