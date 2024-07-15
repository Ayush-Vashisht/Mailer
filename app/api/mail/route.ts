import { NextRequest, NextResponse } from "next/server";

type mailType = {
  mail: string;
  content: string;
};
export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const body = JSON.stringify(payload);
    console.log(body);
    const nodemailer = require("nodemailer");

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: "diana.sipes@ethereal.email",
        pass: "afPCHHmbmmvtBhRNgR",
      },
    });
    const info = await transporter.sendMail({
      from: '"Diana Sipes 👻" <diana.sipes@ethereal.email>', // sender address
      to: "ayushofficial8986@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
    

    console.log("Message sent: %s", info.messageId);
    
  return NextResponse.json({ status: 200, message: `${info.messageId}` });
  } catch (error) {
    throw new Error(`error: ${error}`);
  }
}
