"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.articlesService = void 0;
const common_1 = require("@nestjs/common");
const sanity_service_1 = require("../sanity/sanity.service");
let articlesService = class articlesService {
    async createArticle(dto, uploadedFiles) {
        const imageRefs = await Promise.all((uploadedFiles.images ?? []).map(img => sanity_service_1.sanityServiceWithoutPublished.assets.upload('image', img.buffer, { filename: img.originalname })));
        const thumbnailRefs = await Promise.all((uploadedFiles.thumbnail ?? []).map(img => sanity_service_1.sanityServiceWithoutPublished.assets.upload('image', img.buffer, { filename: img.originalname })));
        const fileRefs = await Promise.all((uploadedFiles.files ?? []).map(file => sanity_service_1.sanityServiceWithoutPublished.assets.upload('file', file.buffer, { filename: file.originalname })));
        return sanity_service_1.sanityServiceWithoutPublished.create({
            _type: 'article',
            Title: dto.title,
            content: dto.content,
            pinned: dto.pinned,
            slug: {
                _type: 'slug',
                current: dto.title
            },
            publishedAt: new Date().toLocaleDateString('en-US'),
            images: imageRefs.map(asset => ({
                _key: crypto.randomUUID(),
                _type: 'image',
                asset: { _type: 'reference', _ref: asset._id, _key: crypto.randomUUID() }
            })),
            thumbnail: thumbnailRefs.map(asset => ({
                _key: crypto.randomUUID(),
                _type: 'image',
                asset: { _type: 'reference', _ref: asset._id, _key: crypto.randomUUID() }
            })),
            Files: fileRefs.map(asset => ({
                _key: crypto.randomUUID(),
                _type: 'file',
                asset: { _type: 'reference', _ref: asset._id, _key: crypto.randomUUID() }
            }))
        });
    }
    async updateArticle(id, dto, uploadedFiles) {
        const imageRefs = await Promise.all((uploadedFiles.images ?? []).map(img => sanity_service_1.sanityServiceWithoutPublished.assets.upload('image', img.buffer, { filename: img.originalname })));
        const thumbnailRefs = await Promise.all((uploadedFiles.thumbnail ?? []).map(img => sanity_service_1.sanityServiceWithoutPublished.assets.upload('image', img.buffer, { filename: img.originalname })));
        const fileRefs = await Promise.all((uploadedFiles.files ?? []).map(file => sanity_service_1.sanityServiceWithoutPublished.assets.upload('file', file.buffer, { filename: file.originalname })));
        const removeImageUrls = dto.remove_image_urls ? JSON.parse(dto.remove_image_urls) : [];
        const removeFileUrls = dto.remove_file_urls ? JSON.parse(dto.remove_file_urls) : [];
        const current = await sanity_service_1.sanityServiceWithoutPublished.fetch('*[_type == "article" && _id == $id][0] { "imgs": images[]{ _key, "assetId": asset->_id, "url": asset->url }, "fls": Files[]{ _key, "assetId": asset->_id, "url": asset->url } }', { id });
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
            Title: dto.new_title,
            content: dto.new_content,
            pinned: dto.new_pinned,
            slug: { _type: 'slug', current: dto.new_title },
            publishedAt: new Date().toLocaleDateString('en-US'),
            images: newImages,
            Files: newFiles
        });
        if (dto.remove_thumbnail === 'true') {
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
        try {
            const articles = await sanity_service_1.sanityService.fetch('*[_type in ["article", "uploaded_article"]] { ..., "thumbnailUrl": thumbnail[0].asset->url }');
            return articles;
        }
        catch (error) {
            throw new Error("Error fetching articles");
        }
    }
    async findBySlug(slug) {
        try {
            const article = await sanity_service_1.sanityService.fetch('*[_type in ["article", "uploaded_article"] && slug.current == $slug][0] { ..., "thumbnailUrl": thumbnail[0].asset->url }', { slug });
            return article;
        }
        catch (error) {
            throw new Error(`Error fetching article ${slug}`);
        }
    }
    async findById(id) {
        try {
            const article = await sanity_service_1.sanityService.fetch('*[_type in ["article", "uploaded_article"] && _id == $id][0] { ..., "thumbnailUrl": thumbnail[0].asset->url, "imageItems": images[]{ "url": asset->url }, "fileItems": Files[]{ "url": asset->url, "originalFilename": asset->originalFilename } }', { id });
            return article;
        }
        catch (error) {
            throw new Error(`Error fetching article ${id}`);
        }
    }
    async pinArticle(id) {
        try {
            const existing = await sanity_service_1.sanityService.fetch('*[_type in ["article", "uploaded_article"] && pinned == true][0]');
            if (existing && existing._id !== id) {
                await sanity_service_1.sanityService.patch(existing._id).set({ pinned: false }).commit();
            }
            await sanity_service_1.sanityService.patch(id).set({ pinned: true }).commit();
        }
        catch (error) {
            throw new Error("Error pinning article");
        }
    }
    async unpinArticle(id) {
        try {
            const existing = await sanity_service_1.sanityService.fetch('*[_type in ["article", "uploaded_article"] && pinned == true][0]');
            if (!existing) {
                throw new Error("No existing pinned article under this ID");
            }
            else {
                sanity_service_1.sanityService.patch(id)
                    .set({
                    pinned: false
                }).commit();
            }
        }
        catch (error) {
            throw new Error("Error unpinning article");
        }
    }
    async getPinned() {
        try {
            const pinnedArticle = await sanity_service_1.sanityService.fetch('*[_type in ["article", "uploaded_article"] && pinned == true][0] { ..., "thumbnailUrl": thumbnail[0].asset->url }');
            return pinnedArticle;
        }
        catch (error) {
            throw new Error("Error fetching pinned article");
        }
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
exports.articlesService = articlesService;
exports.articlesService = articlesService = __decorate([
    (0, common_1.Injectable)()
], articlesService);
//# sourceMappingURL=articles.service.js.map