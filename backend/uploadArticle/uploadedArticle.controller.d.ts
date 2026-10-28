import { uploadArticleDTO, uploadNewArticleDTO } from "./uploadArticle.dto";
import { uploadArticleService } from "./uploadArticle.service";
export declare class uploadedArticleController {
    private readonly article;
    constructor(article: uploadArticleService);
    createArticle(dto: uploadArticleDTO, UploadedFiles: {
        images?: Express.Multer.File[];
        files?: Express.Multer.File[];
        article: Express.Multer.File[];
        thumbnail?: Express.Multer.File[];
    }): Promise<import("@sanity/client").SanityDocument<{
        _type: string;
        Title: string;
        pinned: boolean;
        article: {
            _key: `${string}-${string}-${string}-${string}-${string}`;
            _type: string;
            asset: {
                _type: string;
                _ref: string;
                _key: `${string}-${string}-${string}-${string}-${string}`;
            };
        }[];
        slug: {
            _type: string;
            current: string;
        };
        publishedAt: string;
        thumbnail: {
            _key: `${string}-${string}-${string}-${string}-${string}`;
            _type: string;
            asset: {
                _type: string;
                _ref: string;
                _key: `${string}-${string}-${string}-${string}-${string}`;
            };
        }[];
        Files: {
            _key: `${string}-${string}-${string}-${string}-${string}`;
            _type: string;
            asset: {
                _type: string;
                _ref: string;
                _key: `${string}-${string}-${string}-${string}-${string}`;
            };
        }[];
        images: {
            _key: `${string}-${string}-${string}-${string}-${string}`;
            _type: string;
            asset: {
                _type: string;
                _ref: string;
                _key: `${string}-${string}-${string}-${string}-${string}`;
            };
        }[];
    }>>;
    updateArticle(dto: uploadNewArticleDTO, UploadedFiles: {
        images?: Express.Multer.File[];
        files?: Express.Multer.File[];
        article: Express.Multer.File[];
        thumbnail?: Express.Multer.File[];
    }, id: string): Promise<import("@sanity/client").SanityDocument<Record<string, any>>>;
    getAll(): Promise<any>;
    getById(id: string): Promise<any>;
    pin(id: string): Promise<import("@sanity/client").SanityDocument<Record<string, any>>>;
    unpin(id: string): Promise<import("@sanity/client").SanityDocument<Record<string, any>>>;
    deleteArticle(id: string): Promise<void>;
}
