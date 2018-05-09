
module.exports = (data, res) => {
  const _auth = require('./_auth');
  const nodemailer = require('nodemailer');

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: _auth.user,
      pass: _auth.pass
    }
  });

  const styles = {
    div: 'padding: 50px; background-color: #F3F4F7; font-family: serif; margin: 0;',
    ul: 'color: rgba(0,0,0,0.5); font-size: 10px; list-style-type: none; text-transform: uppercase; margin: inherit; padding: 0;',
    li: 'margin: inherit; padding: 0;',
    h2: 'font-weight: normal;',
    p: 'border-left: 1px solid #C1C12B; padding-left: 25px; font-size: 15px;',
    a: 'color: inherit; text-decoration: none;'
  }

  const html = `
    <div style="${styles.div}">
      <ul style="${styles.ul}">
        <li style="${styles.li}">${data.name}</li>
        <li style="${styles.li}"><a style="${styles.a}" href="mailto:${data.email}">${data.email}</a></li>
        <li style="${styles.li}"><a style="${styles.a}" href="tel:${data.tel}">${data.tel}</a></li>
      </ul>
      <h2 style="${styles.h2}">Nachricht</h2>
      <p style="${styles.p}"> 
        ${data.nachricht}
      </p>
    </div>
  `;

  const mailOptions = {
    from: data.email,
    to: _auth.user,
    subject: '20° - Nachricht',
    text: data.nachricht,
    html
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Something went wrong.')
    }
    else {
      console.log(`Email sent: ${info.response}`);
      res.send('Done.');
    }

    transporter.close();
  });
};
