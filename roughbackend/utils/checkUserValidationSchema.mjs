export const checkUserValidationSchema = {
    username: {
        isString: {
            errorMessage: "Username must be a string"
        },
        notEmpty: {
            errorMessage: "Username should not be empty"
        },
        isLength: {
            options: { min: 4, max: 32 },
            errorMessage: "Username should be between 4 and 32 characters"
        }
    },

    email: {
        isEmail: {
            errorMessage: "Must be a valid email address"
        },
        notEmpty: {
            errorMessage: "Email should not be empty"
        }
    },  
    password: {
        isString: {
            errorMessage: "Password must be a string"
        },
        notEmpty: {
            errorMessage: "Password should not be empty"
        },
        isLength: {
            options: { min: 6, max: 64 },
            errorMessage: "Password should be between 6 and 64 characters"
        }
    }

}