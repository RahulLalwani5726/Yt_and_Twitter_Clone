class Response{
    
    constructor(
        statusCode,
        messege = "Success",
        Data
    ){
        this.statusCode = statusCode;
        this.messege = messege;
        this.Data = Data;
        this.success = this.success < 400;
    }
}