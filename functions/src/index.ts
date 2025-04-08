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

  // Try to get the user's name from formSubmissions by matching the email
  let firstName = "there"; // default fallback
  try {
    const formSubmissionsRef = admin.firestore().collection("formSubmissions");
    const matchingSubmissions =
    await formSubmissionsRef.where("email", "==", email).limit(1).get();

    if (!matchingSubmissions.empty) {
      const name = matchingSubmissions.docs[0].data().name;
      if (name && typeof name === "string") {
        firstName = name.split(" ")[0]; // use first part before space
      }
    }
  } catch (error) {
    logger.warn("Error fetching name from formSubmissions:", error);
  }

  await admin.firestore().collection("mail").add({
    to: [email],
    message: {
      subject: "You're in.",
      text: `Hey ${firstName},

Thanks for signing up for The Z Philosophy, I'm pumped to have you aboard.

Here’s what you can expect:
    • Insightful tips and deep dives into software development
    • Smart strategies on marketing your work
    • A little philosophy to keep your mind sharp and your process meaningful

Talk soon,
    Zach`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.5;">
          <h2>Welcome to <em>The Z Philosophy</em>!</h2>
          <p>Hey ${firstName},</p>
          <p>Thanks for signing up to my newsletter, 
          I’m pumped to have you aboard.</p>
          <p>Here’s what you can expect:</p>
          <ul>
            <li>Insightful tips and deep dives into 
            <strong>software development</strong></li>
            <li>Smart strategies for 
            <strong>marketing</strong> your work</li>
            <li>A little <strong>philosophy</strong>
             to keep things meaningful</li>
          </ul>
          <p>Glad to have you on this journey.<br/>
          <br/>Talk soon,<br/>Zach</p>
        </div>
      `,
    },
  });

  logger.info(`Queued welcome email for: ${email}`);
});
