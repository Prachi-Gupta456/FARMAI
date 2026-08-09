class ApiError extends Error{
     
    constructor(status=500,message,user_warning=false){
        super(message)
        this.status = status
        this.user_warning = user_warning
    }
}

export default ApiError;