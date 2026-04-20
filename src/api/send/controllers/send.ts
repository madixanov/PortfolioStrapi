import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default {
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
          <h2>New Message</h2>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Message:</b> ${message}</p>
        `,
      });

      return { success: true };

    } catch (err) {
      console.error(err);
      return ctx.internalServerError("Email failed");
    }
  },
};