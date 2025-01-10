class LoginError extends Error {
    constructor(message: string) {
      super(message); 
      Error.captureStackTrace(this, this.constructor); 
  
      this.name = this.constructor.name; 
      this.message = message;
    }
  
    statusCode(): number {
      return 400; 
    }
  }
  
  export default LoginError; 
  