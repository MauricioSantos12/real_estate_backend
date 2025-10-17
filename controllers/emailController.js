const { emailSchema } = require("../schemas/emailsSchema");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "maddison53@ethereal.email",
    pass: "jn7jnAPss4f63QBp6D",
  },
});

const EmailController = {
  async sendEmail(req, res) {
    console.log({ body: req.body });
    try {
      const parsedData = emailSchema.safeParse(req.body);
      console.log({ parsedData });
      await transporter.verify();
      const info = await transporter.sendMail({
        from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
        to: "mauricio.santosr12@gmail.com",
        subject: parsedData.data.subject,
        html: "<b>Hello world?</b>",
      });
      console.log("Message sent:", info.messageId);
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: error });
    }
  },
};

module.exports = EmailController;
