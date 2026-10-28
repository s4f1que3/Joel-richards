import { uploadArticleDTO, uploadNewArticleDTO } from "./uploadArticle.dto";
export declare class uploadArticleService {
    createArticle(dto: uploadArticleDTO, uploadedFiles: {
        article: Express.Multer.File[];
        images?: Express.Multer.File[];
        files?: Express.Multer.File[];
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
    updateArticle(id: string, newDTO: uploadNewArticleDTO, uploadedFiles: {
        article?: Express.Multer.File[];
        images?: Express.Multer.File[];
        files?: Express.Multer.File[];
        thumbnail?: Express.Multer.File[];
    }): Promise<import("@sanity/client").SanityDocument<Record<string, any>>>;
    findAll(): Promise<any>;
    findById(id: string): Promise<any>;
    pin(id: string): Promise<import("@sanity/client").SanityDocument<Record<string, any>>>;
    unpin(id: string): Promise<import("@sanity/client").SanityDocument<Record<string, any>>>;
    deleteArticle(id: string): Promise<void>;
}
