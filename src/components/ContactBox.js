import React, { useCallback, useState } from 'react';

import { useForm } from "react-hook-form";

import { storeFormData } from '../functions/firebaseFunctions';

export default function ContactBox() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const FORM_ID = "8056158";
    const API_KEY = "j7iI-lU6B88XzVqUC3ecXA";

    const { 
        register, 
        handleSubmit, 
        getValues,
        reset,
        formState: { errors }, 
    } = useForm({
        defaultValues: {
            newsletter: true
        }
    }); 
    
    const onSubmit = useCallback(async () => {
        setIsSubmitting(true);
        const { firstname, email, message, newsletter } = getValues();
        console.log(firstname, email, message, newsletter);
    
        try {
            // 1. Store form data in Firebase
            await storeFormData(firstname, email, message);
    
            // 2. If newsletter is checked, send to ConvertKit
            if (newsletter) {
                const res = await fetch(`https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        first_name: firstname,
                        api_key: API_KEY
                    })
                });
    
                if (!res.ok) {
                    throw new Error("Failed to subscribe to ConvertKit");
                }
            }
    
            // 3. Show success + reset form
            setIsSubmitted(true);
            reset();
    
            setTimeout(() => {
                setIsSubmitted(false);
            }, 5000);
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setIsSubmitting(false);
        }
    }, [getValues, reset]);

    return (
        <div className='contact-container'>
            {isSubmitted ? (
                <div className="success-message">
                    <h3>Thank you for your message!</h3>
                    <p>I'll get back to you as soon as possible.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)}> 
                    <div> 
                        <input 
                            placeholder="Your Name" 
                            {...register("firstname", { required: "Missing contact information." })} 
                        />
                    </div> 
                    <div> 
                        <input 
                            placeholder="Your Email" 
                            {...register("email", { required: "Missing contact information." })} 
                        /> 
                    </div> 
                    <div> 
                        <textarea 
                            placeholder="Write a Message" 
                            {...register("message")} 
                        /> 
                    </div> 
                    <div className="newsletter-checkbox">
                        <input 
                            type="checkbox" 
                            id="newsletter" 
                            {...register("newsletter")} 
                        />
                        <label htmlFor="newsletter">Sign up for my newsletter</label>
                    </div>
                    <div className="error-message">{errors.firstname?.message || errors.email?.message}</div> 
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </button> 
                </form>
            )}
        </div>
    );
}

