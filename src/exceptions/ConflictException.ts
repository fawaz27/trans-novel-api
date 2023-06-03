
import { HttpException } from "./HttpException";

class ConflictException extends HttpException{
    constructor(message : string){
        super(409, message);
    }
}

export default ConflictException;