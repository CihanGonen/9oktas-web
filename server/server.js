const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const nodemailer = require("nodemailer");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.post("/sendVerifEmail", async (req, res) => {
  console.log(req.body);
  let { code, to } = req.body;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  let mailOptions = {
    from: "9oktas@gmail.com",
    to: to,
    subject: "Your 1 Time Confirmation Code",
    text: "Use this code to log in",
    html: `<h2>Use this code to log in</h2><p>${code}</p>`,
  };
  try {
    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        res.json({ status: "fail" });
      }
      res.json({ status: "success" });
    });
  } catch (err) {
    return err.message;
  }
});

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
