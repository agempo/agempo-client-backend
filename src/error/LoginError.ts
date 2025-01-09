class LoginError extends Error {
  constructor(message: string) {
    super(message); 
    Error.captureStackTrace(this, this.constructor); 

    this.name = this.constructor.name; 
  }

  statusCode(): number {
    return 403; 
  }
}

export default LoginError; 
