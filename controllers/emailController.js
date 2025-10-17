const { emailSchema } = require("../schemas/emailsSchema");
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
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
