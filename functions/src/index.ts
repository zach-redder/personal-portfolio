import {onDocumentCreated} from "firebase-functions/v2/firestore";
import * as logger from "firebase-functions/logger";
import * as admin from "firebase-admin";

admin.initializeApp();

export const onNewsletterSignup =
onDocumentCreated("newsletterList/{userId}", async (event) => {
  const snapshot = event.data;
  const data = snapshot?.data();
  const email = data?.email;

  if (!email) {
    logger.warn("No email found in new newsletter signup.");
    return;
  }

  await admin.firestore().collection("mail").add({
    to: [email],
    message: {
      subject: "Welcome to the newsletter!",
      text: "I'm excited to have you on my newsletter list.",
      html:
    "<p>I'm excited to have you on my <strong>newsletter list</strong>!</p>",
    },
  });

  logger.info(`Queued welcome email for: ${email}`);
});
