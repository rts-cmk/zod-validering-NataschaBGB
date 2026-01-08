import './RegistrationForm.sass'
import z from 'zod';
import { useState } from 'react';
import registrationSchema from '../../schemas/registrationSchema';
import RegistrationSuccess from './RegistrationSuccess';



export default function RegistrationForm() {

    // errors is undefined when no errors
    // setErrors to update errors state
    const [errors, setErrors] = useState();

    // successData is null when no success message is shown
    // setSuccessData to update successData state
    const [successData, setSuccessData] = useState(null);
  
    // form submit handler
    const submitHandler = (event) => {
        // prevent default form submission
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

            {/* Form sent - Success Message */}
            <RegistrationSuccess
                data={successData}
                // when OK button is clicked, update successData to null to close message (because component does not show if no data)
                onClose={() => setSuccessData(null)}
            />

            <form onSubmit={submitHandler} className="registration__form">
                
                {/* First Name */}
                <label className="registration__label">
                    <span className="registration__text">First Name</span>
                    <input type="text" name='firstName' className="registration__input" autoComplete="given-name" />
                    <ul className='registration__error-list'>
                        {errors?.firstName?.errors.map((error, index) =>
                            <li key={index} className='registration__error-item'>{error}</li>
                        )}
                    </ul>
                </label>
                
                {/* Last Name */}
                <label className="registration__label">
                    <span className="registration__text">Last Name</span>
                    <input type="text" name="lastName" className="registration__input" autoComplete="family-name" />
                    <ul className='registration__error-list'>
                        {errors?.lastName?.errors.map((error, index) =>
                            <li key={index} className='registration__error-item'>{error}</li>
                        )}
                    </ul>
                </label>

                {/* Birthdate */}
                <label className="registration__label">
                    <span className="registration__text">Birthdate</span>
                    <input type="date" name='birthdate' className="registration__input" autoComplete='bday' />
                    <ul className='registration__error-list'>
                        {errors?.birthdate?.errors?.map((error, index) => (
                            <li key={index} className="registration__error-item">{error}</li>
                        ))}
                    </ul>
                </label>

                {/* Email */}
                <label className="registration__label">
                    <span className="registration__text">Email</span>
                    <input type="email" name='email' className="registration__input" autoComplete='email' />
                    <ul className='registration__error-list'>
                        {errors?.email?.errors?.map((error, index) => (
                            <li key={index} className="registration__error-item">{error}</li>
                        ))}
                    </ul>
                </label>
                
                {/* Username */}
                <label className="registration__label">
                    <span className="registration__text">Username</span>
                    <input type="text" name='username' className="registration__input" />
                    <ul className='registration__error-list'>
                        {errors?.username?.errors?.map((error, index) => (
                            <li key={index} className="registration__error-item">{error}</li>
                        ))}
                    </ul>
                </label>

                {/* Profile Description */}
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
                
                {/* Password */}
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

                {/* Confirm Password */}
                <label className="registration__label">
                    <span className="registration__text">Confirm Password</span>
                    <input type="password" name='confirmPassword'  className="registration__input" autoComplete='new-password' />
                    <ul className='registration__error-list'>
                        {errors && errors?.confirmPassword?.errors?.map((error, index) => (
                            <li key={index} className="registration__error-item">{error}</li>
                        ))}
                    </ul>
                </label>
                
                {/* Register User */}
                <button className="registration__register" type="submit">Register</button>
            </form>
        </section>
    )
}