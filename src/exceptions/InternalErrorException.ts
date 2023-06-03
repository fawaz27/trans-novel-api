import { HttpException } from "./HttpException";


class InternalErrorException extends HttpException
{
    constructor()
    {
        super(500, 'Internal Server Error');
    }
}

export default InternalErrorException;