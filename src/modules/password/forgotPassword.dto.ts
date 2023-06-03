import { IsString,IsNotEmpty, IsEmail } from 'class-validator';

class ForgotPasswordDto
{
    // @IsNotEmpty({message: ' please the email is required'})
    // @IsString()
    @IsEmail()
    public email: string;
}


export default ForgotPasswordDto;