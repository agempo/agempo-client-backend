class LoginError extends Error {  
    constructor (message: string) {
        super(message)
        Error.captureStackTrace(this, this.constructor);
    
        this.name = this.constructor.name
      }
    
      statusCode() {
        return this.message
    }
}

module.exports = LoginError
