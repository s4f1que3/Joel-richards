import { Injectable } from "@nestjs/common";
import { sanityService, sanityServiceWithoutPublished } from "../sanity/sanity.service";
import { createArticleDTO, updateArticleDTO } from "./article.dto";

@Injectable()
export class articlesService {

    ///// CREATE ARTICLES

    async createArticle(dto: createArticleDTO, uploadedFiles: { images?: Express.Multer.File[], files?: Express.Multer.File[], thumbnail?: Express.Multer.File[] }) {
        const imageRefs = await Promise.all(
            (uploadedFiles.images ?? []).map(img =>
                sanityServiceWithoutPublished.assets.upload('image', img.buffer, { filename: img.originalname })
            )
        );

        const thumbnailRefs = await Promise.all(
            (uploadedFiles.thumbnail ?? []).map(img =>
                sanityServiceWithoutPublished.assets.upload('image', img.buffer, { filename: img.originalname })
            )
        );

        const fileRefs = await Promise.all(
            (uploadedFiles.files ?? []).map(file =>
                sanityServiceWithoutPublished.assets.upload('file', file.buffer, { filename: file.originalname })
            )
        );

        return sanityServiceWithoutPublished.create({
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

    //// UPDATE ARTICLE

    async updateArticle(id: string, dto: updateArticleDTO, uploadedFiles: { images?: Express.Multer.File[], files?: Express.Multer.File[], thumbnail?: Express.Multer.File[] }) {
        const imageRefs = await Promise.all(
            (uploadedFiles.images ?? []).map(img =>
                sanityServiceWithoutPublished.assets.upload('image', img.buffer, { filename: img.originalname })
            )
        );

        const thumbnailRefs = await Promise.all(
            (uploadedFiles.thumbnail ?? []).map(img =>
                sanityServiceWithoutPublished.assets.upload('image', img.buffer, { filename: img.originalname })
            )
        );

        const fileRefs = await Promise.all(
            (uploadedFiles.files ?? []).map(file =>
                sanityServiceWithoutPublished.assets.upload('file', file.buffer, { filename: file.originalname })
            )
        );

        const removeImageUrls: string[] = dto.remove_image_urls ? JSON.parse(dto.remove_image_urls) : [];
        const removeFileUrls: string[] = dto.remove_file_urls ? JSON.parse(dto.remove_file_urls) : [];

        // Pre-fetch current arrays so we can rebuild them after removals
        const current = await sanityServiceWithoutPublished.fetch(
            '*[_type == "article" && _id == $id][0] { "imgs": images[]{ _key, "assetId": asset->_id, "url": asset->url }, "fls": Files[]{ _key, "assetId": asset->_id, "url": asset->url } }',
            { id }
        );

        const keptImages = (current?.imgs ?? []).filter((img: { url: string }) => !removeImageUrls.includes(img.url));
        const keptFiles = (current?.fls ?? []).filter((f: { url: string }) => !removeFileUrls.includes(f.url));

        const newImages = [
            ...keptImages.map((img: { _key: string | null; assetId: string }) => ({
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
            ...keptFiles.map((f: { _key: string | null; assetId: string }) => ({
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

        let patchBuilder = sanityServiceWithoutPublished.patch(id)
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
        } else if (thumbnailRefs.length > 0) {
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

    ///// GET ARTICLES

    async findAll () {
        try {
            const articles = await sanityService.fetch(
                '*[_type in ["article", "uploaded_article"]] { ..., "thumbnailUrl": thumbnail[0].asset->url }'
            )
            return articles
        } catch (error) {
            throw new Error ("Error fetching articles")
        }
    }

    async findBySlug (slug : string) {
        try {
            const article = await sanityService.fetch(
                '*[_type in ["article", "uploaded_article"] && slug.current == $slug][0] { ..., "thumbnailUrl": thumbnail[0].asset->url }',
                {slug}
            )
            return article
        } catch (error) {
            throw new Error (`Error fetching article ${slug}`)
        }
    }

    async findById (id: string) {
        try {
            const article = await sanityService.fetch(
                '*[_type in ["article", "uploaded_article"] && _id == $id][0] { ..., "thumbnailUrl": thumbnail[0].asset->url, "imageItems": images[]{ "url": asset->url }, "fileItems": Files[]{ "url": asset->url, "originalFilename": asset->originalFilename } }',
                {id}
            )
            return article
        } catch (error) {
            throw new Error (`Error fetching article ${id}`)
        }
    }

    ///// PIN ARTICLE

    async pinArticle (id: string) {
        try {
            const existing = await sanityService.fetch('*[_type in ["article", "uploaded_article"] && pinned == true][0]')
            if (existing && existing._id !== id) {
                await sanityService.patch(existing._id).set({ pinned: false }).commit()
            }
            await sanityService.patch(id).set({ pinned: true }).commit()
        } catch (error) {
            throw new Error ("Error pinning article")
        }
    }

    ////// Remove pin

    async unpinArticle (id: string) {
        try {
            const existing = await sanityService.fetch('*[_type in ["article", "uploaded_article"] && pinned == true][0]')
            if(!existing) {
                throw new Error ("No existing pinned article under this ID")
            } else {
                sanityService.patch(id)
                .set({
                    pinned: false
                }).commit()
            }
        } catch (error) {
            throw new Error ("Error unpinning article")
        }
    }

    ///// GET PINNED ARTICLE

    async getPinned () {
        try {
            const pinnedArticle = await sanityService.fetch(
                '*[_type in ["article", "uploaded_article"] && pinned == true][0] { ..., "thumbnailUrl": thumbnail[0].asset->url }'
            )

            return pinnedArticle

        } catch(error) {
            throw new Error ("Error fetching pinned article")
        }

    }

    ///// DELETE ARTICLES
    async deleteArticle (id: string) {
        try {
            await sanityService.delete(id)
        } catch (error) {
            throw new Error ("Error deleting post")
        }
    }





}
