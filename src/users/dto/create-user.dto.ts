import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
export class CreateUserDto {
    @IsString()
    name: string;
    @IsString()
    lastname: string;
    @IsEmail()
    email: string;
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    password: string;
    
}
