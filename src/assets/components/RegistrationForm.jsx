import './RegistrationForm.sass'
import z from 'zod';
import { useState } from 'react';
import registrationSchema from '../../schemas/registrationSchema';



export default function RegistrationForm() {
    
    const [errors, setErrors] = useState();
  
    const submitHandler = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        // parse form data with zod schema
        const result = registrationSchema.safeParse(data);

        if (result.success) {
            setErrors(null);
            alert("Registration successful!");
            console.log("Validation succeeded:", result.data);
        }
        else {
            const readableErrors = z.treeifyError(result.error);
            console.log("Validation failed:", readableErrors.properties);
            
            setErrors(readableErrors.properties);
        }
    };

    
    return (
        <form onSubmit={submitHandler} className="registration-form">
            
            <label className="registration-form__label">
                <span className="registration-form__text">First Name</span>
                <input type="text" name='firstName' className="registration-form__input" autoComplete="given-name" />
                <ul className='registration-form__error-list'>
                    {errors?.firstName?.errors.map((error, index) =>
                        <li key={index} className='registration-form__error-item'>{error}</li>
                    )}
                </ul>
            </label>
            
            <label className="registration-form__label">
                <span className="registration-form__text">Last Name</span>
                <input type="text" name="lastName" className="registration-form__input" autoComplete="family-name" />
                <ul className='registration-form__error-list'>
                    {errors?.lastName?.errors.map((error, index) =>
                        <li key={index} className='registration-form__error-item'>{error}</li>
                    )}
                </ul>
            </label>

            <label className="registration-form__label">
                <span className="registration-form__text">Birthdate</span>
                <input type="date" name='birthdate' className="registration-form__input" autoComplete='bday' />
                <ul className='registration-form__error-list'>
                    {errors?.birthdate?.errors?.map((error, index) => (
                        <li key={index} className="registration-form__error">{error}</li>
                    ))}
                </ul>
            </label>

            <label className="registration-form__label">
                <span className="registration-form__text">Email</span>
                <input type="email" name='email' className="registration-form__input" autoComplete='email' />
                <ul className='registration-form__error-list'>
                    {errors?.email?.errors?.map((error, index) => (
                        <li key={index} className="registration-form__error">{error}</li>
                    ))}
                </ul>
            </label>
            
            <label className="registration-form__label">
                <span className="registration-form__text">Username</span>
                <input type="text" name='username' className="registration-form__input" autoComplete="username" />
                <ul className='registration-form__error-list'>
                    {errors?.username?.errors?.map((error, index) => (
                        <li key={index} className="registration-form__error">{error}</li>
                    ))}
                </ul>
            </label>

            <label className='registration-form__label'>
                <span className="registration-form__text">Profile Description</span>
                <textarea name='profileDescription' 
                    className="registration-form__input registration-form__input--textarea" />
                <ul className='registration-form__error-list'>
                    {errors?.profileDescription?.errors?.map((error, index) => (
                        <li key={index} className="registration-form__error">{error}</li>
                    ))}
                </ul>
            </label>
            
            <label className="registration-form__label">
                <span className="registration-form__text">Password</span>
                <input type="password" name='password' 
                    className="registration-form__input" autoComplete='new-password' />
                <ul className='registration-form__error-list'>
                    {errors?.password?.errors?.map((error, index) => (
                        <li key={index} className="registration-form__error">{error}</li>
                    ))}
                </ul>
            </label>

            <label className="registration-form__label">
                <span className="registration-form__text">Confirm Password</span>
                <input type="password" name='confirmPassword'  className="registration-form__input" autoComplete='new-password' />
                <ul className='registration-form__error-list'>
                    {errors && errors?.confirmPassword?.errors?.map((error, index) => (
                        <li key={index} className="registration-form__error">{error}</li>
                    ))}
                </ul>
            </label>
            
            <button className="registration-form__button" type="submit">Register</button>
        </form>
    )
}