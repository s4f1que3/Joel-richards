import { Transform } from "class-transformer";
import {IsString, IsEmail, IsNumber, MaxLength, IsOptional } from "class-validator";

const sanitize = ({ value }: { value: unknown }) => typeof value === 'string' ? value.replace(/<\/?[^>]+(>|$)/g, "") : value;

export class authDTO {

    @IsEmail()
    @Transform(sanitize)
    @MaxLength(75)
    email!: string

    @IsString() 
    @Transform(sanitize)
    @MaxLength(70)
    password!: string

    @IsString()
    @Transform(sanitize)
    @MaxLength(6)
    @IsOptional()
    token?: string
}

export class newAuthDTO {

    @IsEmail()
    @Transform(sanitize)
    @MaxLength(75)
    @IsOptional()
    new_email?: string

    @IsString()
    @Transform(sanitize)
    @MaxLength(70)
    @IsOptional()
    new_password?: string

    @IsString()
    @Transform(sanitize)
    @MaxLength(6)
    @IsOptional()
    token?: string
}

export class tokenDTO {

    @IsString()
    @Transform(sanitize)
    @MaxLength(6)
    token!: string
}