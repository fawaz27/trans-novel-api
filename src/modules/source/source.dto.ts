import { IsString,IsNotEmpty, MaxLength } from 'class-validator';

class CreateSourceDto
{
    @IsNotEmpty({message: ' please the name is required'})
    @IsString()
    @MaxLength(200)
    public name : string;

    @IsNotEmpty({message: ' please the link is required'})
    @IsString()
    @MaxLength(200)
    public link : string;

    @IsString()
    @MaxLength(50)
    public type : string;

    @IsNotEmpty({message: ' please the lang is required'})
    @IsString()
    @MaxLength(10)
    public lang : string;

}


export default CreateSourceDto;