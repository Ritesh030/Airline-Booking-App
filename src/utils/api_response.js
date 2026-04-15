class apiResponse {
      constructor(statuscode, data, message = "success") {
            this.data = data;
            this.message = message;
            this.statuscode = statuscode
      }
}

module.exports = apiResponse