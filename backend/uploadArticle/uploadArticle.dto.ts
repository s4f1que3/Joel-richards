import { IsString, IsBoolean, IsOptional } from "class-validator";
import { Injectable } from "@nestjs/common";

@Injectable()
export class uploadArticleDTO {

    @IsString()
    title: string

    @IsBoolean()
    pinned: boolean

}

@Injectable()
export class uploadNewArticleDTO {

    @IsString()
    new_title: string

    @IsBoolean()
    new_pinned: boolean

    @IsOptional()
    remove_image_urls?: string;
    
    @IsOptional()
    remove_file_urls?: string;
    
    @IsOptional()
    remove_article?: string;

    @IsOptional()
    remove_thumbnail?: string;

}