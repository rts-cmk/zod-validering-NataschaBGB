import './RegistrationSuccess.sass';

// data: object with user registration details 
//      - set data = successData in RegistrationForm.jsx
// onClose: function to close the success message
//      - set onClose={() => setSuccessData(null)} in RegistrationForm.jsx
export default function RegistrationSuccess({ data, onClose }) {

    // if no data, do not show component
    if (!data) return null;

    return (
        <section className="success-message">                    
            <h2>Thank you for registering!</h2>

            <p className='success-message__note'>Your account has been created with the following details:</p>

            <div className='success-message__success-data'>
                <h3>First Name:</h3>
                {data && (
                    <p>{data.firstName}</p>
                )}
                <h3>Last Name:</h3>
                {data && (
                    <p>{data.lastName}</p>
                )}
                <h3>Birthdate <span>(DD/MM/YYYY)</span>:</h3>
                {data && (
                    <p>{new Date(data.birthdate).toLocaleDateString("en-GB")}</p>
                )}
                <h3>Email:</h3>
                {data && (
                    <p>{data.email}</p>
                )}
                <h3>Username:</h3>
                {data && (
                    <p>{data.username}</p>
                )}
                <h3>Profile Description:</h3>
                {data && (
                    <p>{data.profileDescription}</p>
                )}
            </div>

            <button
                className="success-message__success-ok"
                onClick={onClose}
            >
                OK
            </button>
            
            <p className='success-message__note'><strong>Note:</strong> For security reasons, your password is not displayed.</p>
        </section>
    );

}