import React, { useCallback } from 'react';

import { useForm } from "react-hook-form";

import '../stylesheets/ContactBox.css';

export default function ContactBox() {

    const { 
        register, 
        handleSubmit, 
        getValues, 
        formState: { errors }, 
      } = useForm(); 
    
      const onSubmit = useCallback(() => { 
        console.log(getValues()); 
      }, [getValues]); 

    return (
        <div className='contact-container'>
            <h2>Get in Touch</h2> 
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
                <div className="error-message">{errors.firstname?.message || errors.email?.message}</div> 
                <button type="submit">Submit</button> 
            </form> 
        </div>
    );
}

