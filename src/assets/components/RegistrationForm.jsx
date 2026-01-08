import './RegistrationForm.sass'
import z from 'zod';
import { useState } from 'react';
import registrationSchema from '../../schemas/registrationSchema';



export default function RegistrationForm() {
    
    const [errors, setErrors] = useState();

    const [successData, setSuccessData] = useState(null);
  
    const submitHandler = (event) => {
        event.preventDefault();

        // gather form data
        const formData = new FormData(event.target);
        // convert form data to object
        const data = Object.fromEntries(formData.entries());

        // validate data against schema
        const result = registrationSchema.safeParse(data);

        // handle validation result
        if (result.success) {
            // clear previous errors
            setErrors(null);
            // show success message
            setSuccessData(result.data);
            // show success section
            document.querySelector('.registration__success-message').style.display = 'block';
            // clear form
            event.target.reset();
            // log success data to console
            console.log("Validation succeeded:", result.data);
        }
        // if validation fails
        else {
            // convert Zod error to readable format
            const readableErrors = z.treeifyError(result.error);
            // log readable errors to console
            console.log("Validation failed:", readableErrors.properties);
            // update state with readable errors
            setErrors(readableErrors.properties);
        }
    };

    
    return (
        <section className="registration">
            
            <section className="registration__success-message">
                
                <h2>Thank you for registering!</h2>

                <p className='registration__note'>Your account has been created with the following details:</p>

                <div className='registration__success-data'>
                    <h3>First Name:</h3>
                    {successData && (
                        <p>{successData.firstName}</p>
                    )}
                    <h3>Last Name:</h3>
                    {successData && (
                        <p>{successData.lastName}</p>
                    )}
                    <h3>Birthdate <span>(DD/MM/YYYY)</span>:</h3>
                    {successData && (
                        <p>{new Date(successData.birthdate).toLocaleDateString("en-GB")}</p>
                    )}
                    <h3>Email:</h3>
                    {successData && (
                        <p>{successData.email}</p>
                    )}
                    <h3>Username:</h3>
                    {successData && (
                        <p>{successData.username}</p>
                    )}
                    <h3>Profile Description:</h3>
                    {successData && (
                        <p>{successData.profileDescription}</p>
                    )}
                </div>

                <button className='registration__success-ok' onClick={() =>
                    { document.querySelector('.registration__success-message').style.display = 'none'; 
                    // setSuccessData(null);
                }}>OK</button>
                <p className='registration__note'><strong>Note:</strong> For security reasons, your password is not displayed.</p>
            </section>

            <form onSubmit={submitHandler} className="registration__form">
                
                <label className="registration__label">
                    <span className="registration__text">First Name</span>
                    <input type="text" name='firstName' className="registration__input" autoComplete="given-name" />
                    <ul className='registration__error-list'>
                        {errors?.firstName?.errors.map((error, index) =>
                            <li key={index} className='registration__error-item'>{error}</li>
                        )}
                    </ul>
                </label>
                
                <label className="registration__label">
                    <span className="registration__text">Last Name</span>
                    <input type="text" name="lastName" className="registration__input" autoComplete="family-name" />
                    <ul className='registration__error-list'>
                        {errors?.lastName?.errors.map((error, index) =>
                            <li key={index} className='registration__error-item'>{error}</li>
                        )}
                    </ul>
                </label>

                <label className="registration__label">
                    <span className="registration__text">Birthdate</span>
                    <input type="date" name='birthdate' className="registration__input" autoComplete='bday' />
                    <ul className='registration__error-list'>
                        {errors?.birthdate?.errors?.map((error, index) => (
                            <li key={index} className="registration__error-item">{error}</li>
                        ))}
                    </ul>
                </label>

                <label className="registration__label">
                    <span className="registration__text">Email</span>
                    <input type="email" name='email' className="registration__input" autoComplete='email' />
                    <ul className='registration__error-list'>
                        {errors?.email?.errors?.map((error, index) => (
                            <li key={index} className="registration__error-item">{error}</li>
                        ))}
                    </ul>
                </label>
                
                <label className="registration__label">
                    <span className="registration__text">Username</span>
                    <input type="text" name='username' className="registration__input" />
                    <ul className='registration__error-list'>
                        {errors?.username?.errors?.map((error, index) => (
                            <li key={index} className="registration__error-item">{error}</li>
                        ))}
                    </ul>
                </label>

                <label className="registration__label">
                    <span className="registration__text">Profile Description</span>
                    <textarea name='profileDescription' 
                        className="registration__input registration__input--textarea" />
                    <ul className='registration__error-list'>
                        {errors?.profileDescription?.errors?.map((error, index) => (
                            <li key={index} className="registration__error-item">{error}</li>
                        ))}
                    </ul>
                </label>
                
                <label className="registration__label">
                    <span className="registration__text">Password</span>
                    <input type="password" name='password' 
                        className="registration__input" autoComplete='new-password' />
                    <ul className='registration__error-list'>
                        {errors?.password?.errors?.map((error, index) => (
                            <li key={index} className="registration__error-item">{error}</li>
                        ))}
                    </ul>
                </label>

                <label className="registration__label">
                    <span className="registration__text">Confirm Password</span>
                    <input type="password" name='confirmPassword'  className="registration__input" autoComplete='new-password' />
                    <ul className='registration__error-list'>
                        {errors && errors?.confirmPassword?.errors?.map((error, index) => (
                            <li key={index} className="registration__error-item">{error}</li>
                        ))}
                    </ul>
                </label>
                
                <button className="registration__submit" type="submit">Register</button>
            </form>
        </section>
    )
}