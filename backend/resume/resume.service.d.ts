export declare class resumeService {
    getResume(): Promise<any>;
    uploadResume(file: Express.Multer.File): Promise<import("@sanity/client").SanityDocument<Record<string, any>> | import("@sanity/client").SanityDocument<{
        _type: string;
        _id: string;
        file: {
            _type: string;
            asset: {
                _type: string;
                _ref: string;
            };
        };
    }>>;
    deleteResume(): Promise<void>;
}
