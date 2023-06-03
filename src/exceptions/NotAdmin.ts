import { HttpException } from "./HttpException";

class IsNotAdmin extends HttpException{
    constructor(id : string){
        super(403, `User with id ${id} is not Admin`);
    }
}

export default IsNotAdmin;
