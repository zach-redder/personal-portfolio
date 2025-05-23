import { db } from "../firebase.js";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore"; 

export async function storeFormData(name, email, message) {
    try {
        // Check if the email already exists in the formSubmissions collection
        const q = query(collection(db, "formSubmissions"), where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
           // console.log("Email already exists in the database.");
            return; // Exit the function if the email already exists
        }

        // If the email does not exist, add the new document
        const docRef = await addDoc(collection(db, "formSubmissions"), {
            name: name,
            email: email,
            message: message,
            timestamp: new Date()
        });

    } catch (e) {
      //  console.error("Error adding document: ", e);
    }
}