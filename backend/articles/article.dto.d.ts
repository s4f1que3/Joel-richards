export declare class createArticleDTO {
    title: string;
    content: string;
    thumbnail?: Express.Multer.File[];
    images?: Express.Multer.File[];
    files?: Express.Multer.File[];
    pinned: boolean;
}
export declare class updateArticleDTO {
    new_title: string;
    new_content: string;
    new_thumbnail?: Express.Multer.File[];
    new_images?: Express.Multer.File[];
    new_files?: Express.Multer.File[];
    new_pinned: boolean;
    remove_image_urls?: string;
    remove_file_urls?: string;
    remove_thumbnail?: string;
}
