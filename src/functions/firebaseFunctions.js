import { db } from "../firebase.js";
import { collection, addDoc } from "firebase/firestore"; 

export async function storeFormData(name, email, message) {
    try {
        const docRef = await addDoc(collection(db, "formSubmissions"), {
            name: name,
            email: email,
            message: message,
            timestamp: new Date()
        });
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}