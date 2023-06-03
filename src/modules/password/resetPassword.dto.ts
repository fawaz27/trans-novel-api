import { IsString, IsNotEmpty, IsEmail, MinLength, MaxLength } from 'class-validator';

export class resetPasswordDto {
    @IsString()
    @IsNotEmpty()
    token: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    password: string;
    

}

export default resetPasswordDto;