import {IsString,IsNotEmpty, Validate, IsEmail, MinLength, MaxLength} from 'class-validator'
import { Role } from '../../utils/validator-role';


class CreateUserDto
{
    
    @IsString()
    public lastName: string;

    @IsString()
    public firstName: string;

    @IsNotEmpty({message: ' please the email is required'})
    @IsString()
    @IsEmail()
    public email: string;

    @IsNotEmpty({message: ' please the username is required'})
    @IsString()
    public username: string;

    @IsNotEmpty({message: ' please the password is required'})
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    public password: string;

    @IsString()
    public phone: string;

    @IsString()
    @Validate(Role,{message:' please role is either user or admin'})
    public role: string;

}

export default CreateUserDto;
