import { NextRequest, NextResponse } from "next/server";

type MailType = {
  emails: string[];
  content: string;
};
export async function POST(req: NextRequest) {
  try {
    const payload: MailType = await req.json();
    const { emails, content } = payload;
    console.log(emails, content);
    const nodemailer = require("nodemailer");

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: "edwina.dach@ethereal.email",
        pass: "7mDbEzA4sBpjge7jxM",
      },
    });
    const infoPromises = emails.map(async (email) => {
      const info = await transporter.sendMail({
        from: '"Edwina Dach 👻" <edwina.dach@ethereal.email>', // sender address
        to: `${email}`, // list of receivers
        subject: "Hello ✔", // Subject line
        text: `${content}`, // plain text body
        html: "<b>Hello world?</b>", // html body
      });
      console.log("Message sent: %s", info.messageId);
      return info;
    });

    const results = await Promise.all(infoPromises);

    return NextResponse.json({ status: 200, message: `Email sent successfully`, results });
  } catch (error) {
    throw new Error(`error: ${error}`);
  }
}
