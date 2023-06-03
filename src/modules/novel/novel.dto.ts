import { IsString,IsNotEmpty, MaxLength } from 'class-validator';

class CreateNovelDto
{
    @IsNotEmpty({message: ' please the name is required'})
    @IsString()
    @MaxLength(200)
    public name : string;

    @IsNotEmpty({message: ' please the url is required'})
    @IsString()
    @MaxLength(200)
    public url : string;

    @IsNotEmpty({message: ' please the source is required'})
    @IsString()
    @MaxLength(50)
    public source : string;

    

}


export default CreateNovelDto;