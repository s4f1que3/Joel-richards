import { articlesService } from "./articles.service";
import { createArticleDTO } from "./article.dto";
import { updateArticleDTO } from "./article.dto";
export declare class articlesController {
    private readonly article;
    constructor(article: articlesService);
    findAll(): Promise<any>;
    createArticle(dto: createArticleDTO, UploadedFiles: {
        images?: Express.Multer.File[];
        files?: Express.Multer.File[];
        thumbnail?: Express.Multer.File[];
    }): Promise<import("@sanity/client").SanityDocument<{
        _type: string;
        Title: string;
        content: string;
        pinned: boolean;
        slug: {
            _type: string;
            current: string;
        };
        publishedAt: string;
        images: {
            _key: `${string}-${string}-${string}-${string}-${string}`;
            _type: string;
            asset: {
                _type: string;
                _ref: string;
                _key: `${string}-${string}-${string}-${string}-${string}`;
            };
        }[];
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
    }>>;
    updateArticle(dto: updateArticleDTO, UploadedFiles: {
        images?: Express.Multer.File[];
        files?: Express.Multer.File[];
        thumbnail?: Express.Multer.File[];
    }, id: string): Promise<import("@sanity/client").SanityDocument<Record<string, any>>>;
    getPinned(): Promise<any>;
    pinArticle(id: string): Promise<void>;
    unpinArticle(id: string): Promise<void>;
    deleteArticle(id: string): Promise<void>;
    findById(id: string): Promise<any>;
    findBySlug(slug: string): Promise<any>;
}
