class apiError extends Error {
      constructor(statuscode, message = "Something went wrong", errors = [], stack = "") {
            super(message);

            this.data = null;
            this.statuscode = statuscode;
            this.statusCode = statuscode;
            this.message = message;
            this.success = false;
            this.error = Array.isArray(errors) ? errors : [errors];
            this.errors = this.error;

            if (stack) {
                  this.stack = stack
            } else {
                  Error.captureStackTrace(this, this.constructor)
            }
      }
}

module.exports = apiError
