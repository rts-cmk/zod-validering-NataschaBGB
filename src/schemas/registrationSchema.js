import z from "zod";


const registrationSchema = z.object({
    
    firstName: z.string().nonempty("First name is required")
        .regex(/^[a-zA-ZæøåÆØÅ]+$/, "First name can only contain letters"),
    lastName: z.string().nonempty("Last name is required")
        .regex(/^[a-zA-ZæøåÆØÅ]+$/, "Last name can only contain letters"),
    // coerce.date() to convert string input to Date object
    birthdate: z.string()
        // checks if the user has entered anything at all
        // if the field is empty, show the error message:
        .min(1, { message: "Birthdate is required" })

        // user input comes as text (string) (e.g. "2002-02-02")
        // convert the text to a real date
        .transform((value) => new Date(value))

        // checks if the date is valid - not NaN, a non-date or the date string is not properly formatted
        // if invalid, show error message
        .refine((date) => !isNaN(date.getTime()), {
            message: "Invalid date",
        })
        // checks that the birthdate is not in the future
        //      i.e., the date must be today or earlier
        .refine((date) => date <= new Date(), {
            message: "Birthdate cannot be in the future",
        })
        // custom validation to check if user is at least 18 years old
        .refine((date) => {
            // date now
            const today = new Date();
            const eighteenYearsAgo = new Date(
                // subtract 18 years from current year
                today.getFullYear() - 18,
                // keep month and date the same
                today.getMonth(),
                today.getDate()
            );
            // check if the date is less than eighteen years ago
            return date < eighteenYearsAgo;
        }, {
            message: "You must be at least 18 years old",
        }),
    email: z.email("Invalid email address"),
    username: z.string()
        .nonempty("Username is required")
        .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
    profileDescription: z.string().max(200, "Profile description must be at most 200 characters long"),
    password: z.string().min(8, "Password must be at least 8 characters long")
        .regex(/[a-zøæå]/, "Password must contain at least one lowercase letter")
        .regex(/[A-ZØÆÅ]/, "Password must contain at least one uppercase letter")
        .regex(/[\d]/, "Password must contain at least one number")
        .regex(/[\W]/, "Password must contain at least one special character"),
    confirmPassword: z.string().nonempty("confirm Password is required"),

})
// refine to add custom validation for fields
.refine(
    // password field in our schema must match confirmPassword field in our schema
    schema => schema.password === schema.confirmPassword,
    {
        // path to tell Zod which field the error belongs to
        path: ["confirmPassword"],
        // message to show when validation fails
        message: "Passwords do not match",
    }
)


export default registrationSchema;