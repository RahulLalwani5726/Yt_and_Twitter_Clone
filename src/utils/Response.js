class Response{
    
    constructor(
        statusCode,
        messege = "Success",
        Data,
        success
    ){
        this.statusCode = statusCode;
        this.messege = messege;
        this.Data = Data;
        this.success = success < 400;
    }
}

export {Response}