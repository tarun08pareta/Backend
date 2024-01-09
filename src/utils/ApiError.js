// Define a class named ApiError that extends the Error class
class ApiError extends Error {
    // Constructor for the ApiError class with optional parameters
    constructor(
        StatusCode,         // HTTP status code associated with the error
        message = "something went wrong",  // Error message, defaults to a generic message
        errors = [],        // Array to hold specific error details, defaults to an empty array
        statck = ""         // Stack trace information, defaults to an empty string
    ) {
        // Call the constructor of the Error class and pass the message
        super(message);

        // Initialize properties specific to the ApiError class
        this.StatusCode = StatusCode;   // Set HTTP status code for the error
        this.data = null;               // Placeholder for additional error data
        this.message = message;         // Set error message
        this.success = false;           // Indicates if the operation was successful (set to false for errors)
        this.errors = errors;           // Store specific error details in an array

        // Check if a stack trace was provided
        if (statck) {
            this.stack = statck;        // If provided, set the stack trace for the error
        } else {
            // If no stack trace provided, capture the stack trace using Error.captureStackTrace()
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

// Export the ApiError class to make it available for use in other files/modules
export { ApiError };
