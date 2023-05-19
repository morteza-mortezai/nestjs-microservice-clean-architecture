import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDto {

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty()
    @MinLength(3)
    readonly first_name: string;

    @IsNotEmpty()
    @MinLength(3)
    readonly last_name: string;

    @IsNotEmpty()
    @MinLength(8)
    readonly avatar: string;
}