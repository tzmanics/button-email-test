import { Handler } from "@netlify/functions";
import fetch from "node-fetch";

const handler: Handler = async function (event) {
  if (event.body === null) {
    return {
      statusCode: 400,
      body: JSON.stringify("Payload required"),
    };
  }

  const requestBody = JSON.parse(event.body) as {
    subscriberName: string;
    subscriberEmail: string;
    inviteeEmail: string;
  };


  await fetch(`${process.env.URL}/.netlify/functions/emails/confirm`, {
    headers: {
      "netlify-emails-secret": process.env.NETLIFY_EMAILS_SECRET as string,
    },
    method: "POST",
    body: JSON.stringify({
      from: requestBody.inviteeEmail,
      to: requestBody.subscriberEmail,
      subject: "You've been subscribed",
      parameters: {
        name: requestBody.subscriberName,
      },
    }),
  });

  return {
    statusCode: 200,
    body: JSON.stringify("Subscribe email sent!"),
  };
};

export { handler };
