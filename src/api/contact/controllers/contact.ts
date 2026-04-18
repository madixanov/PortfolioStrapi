import { factories } from '@strapi/strapi';
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default factories.createCoreController('api::contact.contact', ({ strapi }) => ({
  async send(ctx) {
    try {
      const { name, email, message } = ctx.request.body;

      if (!name || !email || !message) {
        return ctx.badRequest("Missing fields");
      }

      await resend.emails.send({
        from: "Portfolio <onboarding@resend.dev>",
        to: process.env.EMAIL_TO!,
        subject: `New message from ${name}`,
        html: `
          <h2>New Contact Message</h2>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Message:</b></p>
          <p>${message}</p>
        `,
      });

      return ctx.send({ success: true });

    } catch (err) {
      console.error("Email error:", err);
      return ctx.internalServerError("Email sending failed");
    }
  },
}));