import { IsString, MinLength } from 'class-validator';

export class RegisterUserDTO {
    @IsString()
    email: string;

    @IsString()
    password: string;
}

export class LoginDTO {
    @IsString()
    email: string;

    @IsString()
    password: string;
}

export class ChangePasswordDTO {
    @IsString()
    email: string;

    @IsString()
    newPassword: string;
}
