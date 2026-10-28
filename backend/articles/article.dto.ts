import { Transform } from "class-transformer";
import { IsString, IsOptional, IsBoolean, MaxLength } from "class-validator";

const sanitize = ({ value }: { value: unknown }) => typeof value === 'string' ? value.replace(/<\/?[^>]+(>|$)/g, "") : value;

export class createArticleDTO {

    @IsString()
    @Transform(sanitize)
    @MaxLength(100)
    title!: string;

    @IsString()
    @Transform(sanitize)
    content!: string;

    @IsOptional()
    thumbnail?: Express.Multer.File[];

    @IsOptional()
    images?: Express.Multer.File[];

    @IsOptional()
    files?: Express.Multer.File[];

    @IsBoolean()
    @IsOptional()
    @Transform(sanitize)
    pinned?: boolean;
}

export class updateArticleDTO {

    @IsString()
    @Transform(sanitize)
    @IsOptional()
    @MaxLength(100)
    new_title?: string;

    @IsString()
    @Transform(sanitize)
    @IsOptional()
    new_content?: string;

    @IsOptional()
    new_thumbnail?: Express.Multer.File[];

    @IsOptional()
    new_images?: Express.Multer.File[];

    @IsOptional()
    new_files?: Express.Multer.File[];

    @IsBoolean()
    @Transform(sanitize)
    @IsOptional()
    @MaxLength(100)
    new_pinned?: boolean

    @IsOptional()
    remove_image_urls?: string;

    @IsOptional()
    remove_file_urls?: string;

    @IsOptional()
    remove_thumbnail?: string;
}