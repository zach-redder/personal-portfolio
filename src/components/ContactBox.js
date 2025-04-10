import React, { useCallback, useState } from 'react';

import { useForm } from "react-hook-form";

import { storeFormData, addToNewsletter } from '../functions/firebaseFunctions';

export default function ContactBox() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

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
            await storeFormData(firstname, email, message);
            
            // If newsletter is checked, add to newsletter list
            if (newsletter) {
                await addToNewsletter(email);
            }
            
            // Show success message and reset form
            setIsSubmitted(true);
            reset();
            
            // Hide success message after 5 seconds
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

