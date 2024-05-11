import twilio from "twilio";

const accountSid = "ACe26eb8d80d2fd1decf18bc6107b1f5b5";
const authToken = "e53e34b42a7579900fc1ad1cda189d10";
const sender = "+18482666691";

const client = twilio(accountSid, authToken);

const sendSMS = async (recipient, messageBody) => {
  try {
    const message = await client.messages.create({
      to: recipient,
      from: sender,
      body: messageBody,
    });
    console.log("SMS sent successfully with SID:", message.sid);
    return message;
  } catch (error) {
    console.error("Error sending SMS:", error);
    throw error;
  }
};

export default sendSMS;
