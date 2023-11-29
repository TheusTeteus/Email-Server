const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const credentials = require('./credentials');

const app = express();
const port = 3010;

app.use(bodyParser.json());

app.post('/send', async (req, res) => {
  try {
    const { to, subject, html } = req.body;

    const transporter = nodemailer.createTransport({
      host: credentials.credentials_google.host,
      port: credentials.credentials_google.port,
      secure: false,
      auth: {
        user: credentials.credentials_google.user,
        pass: credentials.credentials_google.pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: credentials.credentials_google.from,
      to,
      subject,
      html,
    });
    console.log("Enviando email...")
    res.status(200).json({
      success: true, 
      message: 'O E-mail foi enviado' 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'O e-mail não foi enviado' 
    });
  }
});

app.listen(port, () => {
  console.log("Servidor rodando na porta " + port);
});
