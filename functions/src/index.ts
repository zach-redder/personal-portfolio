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
      subject: "You're officially aboard Builder’s Compass.",
      text: `Hey ${firstName},

Thanks for signing up for Builder's Compass, I'm pumped to have you aboard.

Here’s what you can expect:
    • Real stories from my experience of building products (the wins *and* fails)
    • Insightful tips and deep dives into software development
    • Frameworks for staying aligned while building businesses
  
You’re officially on the journey. Excited to build alongside you.

Talk soon,
    Zach`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.5; max-width: 600px; margin: auto;">
        <h2 style="color: #333;">Welcome to <em>Builder's Compass</em>!</h2>
        <p>Hey ${firstName},</p>
        <p>Thanks for signing up, I’m pumped to have you aboard.</p>
        <p>Here’s what you can expect:</p>
        <ul>
          <li><strong>Real stories</strong> from building products (the wins <em>and</em> fails)</li>
          <li>Actionable tips and frameworks for <strong>software development</strong></li>
          <li>Deep dives into staying <strong>aligned</strong> while building real businesses</li>
        </ul>
        <p>You’re officially on the journey.<br/>
        Excited to build alongside you.<br/><br/>
        Talk soon,<br/>
        Zach</p>
      </div>
      `,
    },
  });

  logger.info(`Queued welcome email for: ${email}`);
});
