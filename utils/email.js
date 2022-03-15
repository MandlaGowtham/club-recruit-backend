import nodemailer from "nodemailer";

export function otpGenerator() {
  let otp = "";
  for (let i = 0; i < 4; i++) {
    otp += Math.round(Math.random() * 9);
  }
  return otp;
}

export function MailService(email, OTP) {
  try {
    mailTransport().sendMail(
      {
        from: {
          name: "Club Recruit",
          email: process.env.GMAIL_USERNAME,
        },
        to: email,
        subject: "OTP to verify email on Club-Recruit",
        html: mailTemplate(OTP),
      },
      function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
}

const mailTransport = () => {
  // console.log(process.env.GMAIL_USERNAME, process.env.GMAIL_PASSWORD)
  return nodemailer.createTransport({
    server: "gmail",
    host: "smtp.gmail.com",
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD,
    },
  });
};

const mailTemplate = (OTP) => {
  return `<!doctype html>
  <html>
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <script src="https://kit.fontawesome.com/ae9303ad60.js" crossorigin="anonymous"></script>
    </head>
    <body style="font-family: sans-serif;">
      <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee"><a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">CLUB RECRUIT</a></div>
          <p style="font-size:1.1em">Hi there,</p>
          <p>Use the following OTP to complete your Sign Up procedures. OTP is valid for 3 minutes</p>
          <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
          <p style="font-size:0.9em;">Regards,<br />Club Recruit</p>
          <hr style="border:none;border-top:1px solid #eee" />
          <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
            <p>Club Recruit</p>
            <p>IIIT Gwalior</p>
          </div>
        </div>
      </div>
      <style>
        .main {
          background-color: grey;
          padding: 10%
        }
        a:hover {
          border-left-width: 1em;
          min-height: 2em;
        }
      </style>
    </body>
  </html>`;
};
