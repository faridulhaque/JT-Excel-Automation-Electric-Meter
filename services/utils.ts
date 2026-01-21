import { TUser } from "./types";

export const sendMail = async (email: string, code: string) => {
  console.log("email", email);
  const publicKey = process.env.MAILJET_PUBLIC_KEY;
  const privateKey = process.env.MAILJET_PRIVATE_KEY;
  const senderEmail = process.env.MAILJET_SENDER_EMAIL;
  const auth = Buffer.from(`${publicKey}:${privateKey}`).toString("base64");

  const response = await fetch("https://api.mailjet.com/v3.1/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${auth}`,
    },
    body: JSON.stringify({
      Messages: [
        {
          From: {
            Email: senderEmail,
            Name: "Excel Automation Pro E-Meter Support",
          },
          To: [{ Email: email, Name: "User" }],
          Subject: "Your verification code",
          TextPart: `Your verification code is ${code}`,
          HTMLPart: `<h3>Hello ${"User"},</h3>
                       <p>Your code is <b>${code}</b>.</p>
                       <p>This code will expire soon.</p>`,
        },
      ],
    }),
  });


  if (response.ok) return true;
  else return false;
};
