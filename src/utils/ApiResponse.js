class ApiResponse {
    constructor(statusCode, data, message = "Success") {
        this.statusCode = statusCode; // Set the HTTP status code
        this.data = data;             // Set the data associated with the response
        this.message = message;       // Set a message for the response, defaults to "Success"
        this.success = statusCode < 400; // Determine success based on status code (<400 indicates success)
    }
}
