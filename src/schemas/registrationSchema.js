import z from "zod";


const registrationSchema = z.object({
    
    firstName: z.string().nonempty("First name is required"),
    lastName: z.string().nonempty("Last name is required"),
    // coerce.date() to convert string input to Date object
    birthdate: z.coerce.date()
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