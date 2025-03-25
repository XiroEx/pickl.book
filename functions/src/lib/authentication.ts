import {onRequest} from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import {getFirestore} from "firebase-admin/firestore";
import cors from "cors";
import {v4 as uuidv4} from "uuid";
import * as nodemailer from "nodemailer";

const corsHandler = cors({origin: true});

admin.initializeApp();

export const generateSession = onRequest(async (request, response) => {
  corsHandler(request, response, async () => {
    const db = getFirestore("picklbook");
    const {email} = request.body;

    if (!email) {
      response.status(400).send("User is required");
      return;
    }

    let userRecord;
    try {
      userRecord = await admin.auth().getUserByEmail(email);
    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        userRecord = null;
      } else {
        console.error("Error fetching user:", error);
        response.status(500).send("Error fetching user");
        return;
      }
    }

    if (!userRecord) {
      try {
        userRecord = await admin.auth().createUser({email});
      } catch (error) {
        console.error("Error creating new user:", error);
        response.status(500).send("Error creating new user");
        return;
      }
    }

    const sessionId = uuidv4();
    const secret = Math.floor(100000 + Math.random() * 900000).toString();

    await db.doc(`sessionSecrets/${sessionId}`).set({
      secret,
      uid: userRecord.uid,
    });

    await db.doc(`sessions/${sessionId}`).set({
      createdAt: Date.now(),
    });

    // send email with secret to user, and link with sessionId and secret
    sendEmail(email, secret, sessionId);

    response.send({sessionId});
  });
});

export const authenticateSession = onRequest(async (request, response) => {
  corsHandler(request, response, async () => {
    const db = getFirestore("picklbook");
    const {sessionId, secret} = request.body;

    const sessionSecret = await db.doc(`sessionSecrets/${sessionId}`).get();
    if (!sessionSecret.exists) {
      response.status(404).send("Session not found");
      return;
    }

    const data = sessionSecret.data();
    if (!data) {
      response.status(500).send("Error retrieving session data");
      return;
    }

    if (data.secret !== secret) {
      response.status(401).send("Unauthorized");
      return;
    }

    if (data.expiresAt < Date.now()) {
      response.status(401).send("Session expired");
      return;
    }

    if (!data.uid) {
      response.status(500).send("Error retrieving user data");
      return;
    }

    console.log(data.uid);
    const token = await admin.auth().createCustomToken(data.uid);

    await db.doc(`sessions/${sessionId}`).update({
      authenticatedAt: Date.now(),
      token,
    });

    response.send({message: "Authenticated"});
  });
});

/**
 * Sends an email with a secret code and session ID to the specified recipient.
 *
 * @param {string} to - The recipient's email address.
 * @param {string} secret - The secret code to be sent.
 * @param {string} sessionId - The session ID associated with the secret code.
 */
function sendEmail(to: string, secret: string, sessionId: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "Your secret code",
    text: `Your secret code is ${secret}.\n\nClick here to authenticate: https://picklbook.web.app/authenticate?sessionId=${sessionId}&secret=${secret}`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
