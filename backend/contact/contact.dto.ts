import { Transform } from "class-transformer";
import { IsOptional, IsString, isString, MaxLength } from "class-validator";


const sanitize = ({ value }: { value: unknown }) => typeof value === 'string' ? value.replace(/<\/?[^>]+(>|$)/g, "") : value;

export class createContactDTO {

    @IsString()
    @MaxLength(20)
    @Transform(sanitize)
    @IsOptional()
    phone?: string

    @IsString()
    @MaxLength(75)
    @Transform(sanitize)
    @IsOptional()
    email?: string

    @IsString()
    @Transform(sanitize)
    @IsOptional()
    instagram?: string

    @IsString()
    @MaxLength(20)
    @Transform(sanitize)
    @IsOptional()
    linkedin?: string
}

export class createNewContactDTO {

    @IsString()
    @MaxLength(20)
    @Transform(sanitize)
    @IsOptional()
    new_phone?: string

    @IsString()
    @MaxLength(75)
    @Transform(sanitize)
    @IsOptional()
    new_email?: string

    @IsString()
    @Transform(sanitize)
    @IsOptional()
    new_instagram?: string

    @IsString()
    @Transform(sanitize)
    @IsOptional()
    new_linkedin?: string
}