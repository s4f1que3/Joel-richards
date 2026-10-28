"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadArticleService = void 0;
const common_1 = require("@nestjs/common");
const sanity_service_1 = require("../sanity/sanity.service");
let uploadArticleService = class uploadArticleService {
    async createArticle(dto, uploadedFiles) {
        const articleRefs = await Promise.all((uploadedFiles.article ?? []).map(file => sanity_service_1.sanityServiceWithoutPublished.assets.upload('file', file.buffer, { filename: file.originalname })));
        const imageRefs = await Promise.all((uploadedFiles.images ?? []).map(img => sanity_service_1.sanityServiceWithoutPublished.assets.upload('image', img.buffer, { filename: img.originalname })));
        const fileRefs = await Promise.all((uploadedFiles.files ?? []).map(file => sanity_service_1.sanityServiceWithoutPublished.assets.upload('file', file.buffer, { filename: file.originalname })));
        const thumbnailRefs = await Promise.all((uploadedFiles.thumbnail ?? []).map(img => sanity_service_1.sanityServiceWithoutPublished.assets.upload('image', img.buffer, { filename: img.originalname })));
        return sanity_service_1.sanityServiceWithoutPublished.create({
            _type: 'uploaded_article',
            Title: dto.title,
            pinned: dto.pinned,
            article: articleRefs.map(asset => ({
                _key: crypto.randomUUID(),
                _type: 'file',
                asset: { _type: 'reference', _ref: asset._id, _key: crypto.randomUUID() }
            })),
            slug: {
                _type: 'slug',
                current: dto.title
            },
            publishedAt: new Date().toLocaleDateString('en-US'),
            thumbnail: thumbnailRefs.map(asset => ({
                _key: crypto.randomUUID(),
                _type: 'image',
                asset: { _type: 'reference', _ref: asset._id, _key: crypto.randomUUID() }
            })),
            Files: fileRefs.map(asset => ({
                _key: crypto.randomUUID(),
                _type: 'file',
                asset: { _type: 'reference', _ref: asset._id, _key: crypto.randomUUID() }
            })),
            images: imageRefs.map(asset => ({
                _key: crypto.randomUUID(),
                _type: 'image',
                asset: { _type: 'reference', _ref: asset._id, _key: crypto.randomUUID() }
            })),
        });
    }
    async updateArticle(id, newDTO, uploadedFiles) {
        const thumbnailRefs = await Promise.all((uploadedFiles.thumbnail ?? []).map(img => sanity_service_1.sanityServiceWithoutPublished.assets.upload('image', img.buffer, { filename: img.originalname })));
        const articleRefs = await Promise.all((uploadedFiles.article ?? []).map(file => sanity_service_1.sanityServiceWithoutPublished.assets.upload('file', file.buffer, { filename: file.originalname })));
        const imageRefs = await Promise.all((uploadedFiles.images ?? []).map(img => sanity_service_1.sanityServiceWithoutPublished.assets.upload('image', img.buffer, { filename: img.originalname })));
        const fileRefs = await Promise.all((uploadedFiles.files ?? []).map(file => sanity_service_1.sanityServiceWithoutPublished.assets.upload('file', file.buffer, { filename: file.originalname })));
        const removeImageUrls = newDTO.remove_image_urls ? JSON.parse(newDTO.remove_image_urls) : [];
        const removeFileUrls = newDTO.remove_file_urls ? JSON.parse(newDTO.remove_file_urls) : [];
        const current = await sanity_service_1.sanityServiceWithoutPublished.fetch('*[_type == "uploaded_article" && _id == $id][0] { "imgs": images[]{ _key, "assetId": asset->_id, "url": asset->url }, "fls": Files[]{ _key, "assetId": asset->_id, "url": asset->url } }', { id });
        const keptImages = (current?.imgs ?? []).filter((img) => !removeImageUrls.includes(img.url));
        const keptFiles = (current?.fls ?? []).filter((f) => !removeFileUrls.includes(f.url));
        const newImages = [
            ...keptImages.map((img) => ({
                _key: img._key ?? crypto.randomUUID(),
                _type: 'image',
                asset: { _type: 'reference', _ref: img.assetId }
            })),
            ...imageRefs.map(asset => ({
                _key: crypto.randomUUID(),
                _type: 'image',
                asset: { _type: 'reference', _ref: asset._id }
            }))
        ];
        const newFiles = [
            ...keptFiles.map((f) => ({
                _key: f._key ?? crypto.randomUUID(),
                _type: 'file',
                asset: { _type: 'reference', _ref: f.assetId }
            })),
            ...fileRefs.map(asset => ({
                _key: crypto.randomUUID(),
                _type: 'file',
                asset: { _type: 'reference', _ref: asset._id }
            }))
        ];
        let patchBuilder = sanity_service_1.sanityServiceWithoutPublished.patch(id)
            .set({
            Title: newDTO.new_title,
            pinned: newDTO.new_pinned,
            slug: { _type: 'slug', current: newDTO.new_title },
            publishedAt: new Date().toLocaleDateString('en-US'),
            images: newImages,
            Files: newFiles
        });
        if (newDTO.remove_article === 'true') {
            patchBuilder = patchBuilder.unset(['article']);
        }
        else if (articleRefs.length > 0) {
            patchBuilder = patchBuilder.set({
                article: articleRefs.map(asset => ({
                    _key: crypto.randomUUID(),
                    _type: 'file',
                    asset: { _type: 'reference', _ref: asset._id }
                }))
            });
        }
        if (newDTO.remove_thumbnail === 'true') {
            patchBuilder = patchBuilder.unset(['thumbnail']);
        }
        else if (thumbnailRefs.length > 0) {
            patchBuilder = patchBuilder.set({
                thumbnail: thumbnailRefs.map(asset => ({
                    _key: crypto.randomUUID(),
                    _type: 'image',
                    asset: { _type: 'reference', _ref: asset._id }
                }))
            });
        }
        return patchBuilder.commit();
    }
    async findAll() {
        return sanity_service_1.sanityServiceWithoutPublished.fetch('*[_type == "uploaded_article"] | order(publishedAt desc) { _id, Title, pinned, publishedAt, "thumbnailUrl": thumbnail[0].asset->url }');
    }
    async findById(id) {
        return sanity_service_1.sanityServiceWithoutPublished.fetch('*[_type == "uploaded_article" && _id == $id][0] { ..., "articleUrl": article[0].asset->url, "articleFilename": article[0].asset->originalFilename, "thumbnailUrl": thumbnail[0].asset->url, "imageItems": images[]{ "url": asset->url }, "fileItems": Files[]{ "url": asset->url, "originalFilename": asset->originalFilename } }', { id });
    }
    async pin(id) {
        return sanity_service_1.sanityServiceWithoutPublished.patch(id).set({ pinned: true }).commit();
    }
    async unpin(id) {
        return sanity_service_1.sanityServiceWithoutPublished.patch(id).set({ pinned: false }).commit();
    }
    async deleteArticle(id) {
        try {
            await sanity_service_1.sanityService.delete(id);
        }
        catch (error) {
            throw new Error("Error deleting post");
        }
    }
};
exports.uploadArticleService = uploadArticleService;
exports.uploadArticleService = uploadArticleService = __decorate([
    (0, common_1.Injectable)()
], uploadArticleService);
//# sourceMappingURL=uploadArticle.service.js.map