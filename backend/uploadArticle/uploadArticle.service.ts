import { Injectable } from "@nestjs/common";
import { sanityServiceWithoutPublished, sanityService } from "sanity/sanity.service";
import { uploadArticleDTO, uploadNewArticleDTO } from "./uploadArticle.dto";

@Injectable()
export class uploadArticleService {

    async createArticle(dto: uploadArticleDTO, uploadedFiles: { article: Express.Multer.File[]; images?: Express.Multer.File[]; files?: Express.Multer.File[]; thumbnail?: Express.Multer.File[] }) {

        const articleRefs = await Promise.all(
            (uploadedFiles.article ?? []).map(file =>
                sanityServiceWithoutPublished.assets.upload('file', file.buffer, { filename: file.originalname })
            )
        );

        const imageRefs = await Promise.all(
            (uploadedFiles.images ?? []).map(img =>
                    sanityServiceWithoutPublished.assets.upload('image', img.buffer, { filename: img.originalname })
                )
            );
        
        const fileRefs = await Promise.all(
            (uploadedFiles.files ?? []).map(file =>
                sanityServiceWithoutPublished.assets.upload('file', file.buffer, { filename: file.originalname })
            )
        );

        const thumbnailRefs = await Promise.all(
            (uploadedFiles.thumbnail ?? []).map(img =>
                sanityServiceWithoutPublished.assets.upload('image', img.buffer, { filename: img.originalname })
            )
        );

        return sanityServiceWithoutPublished.create({
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
        })
    }

    async updateArticle(id: string, newDTO: uploadNewArticleDTO ,uploadedFiles: { article?: Express.Multer.File[], images?: Express.Multer.File[], files?: Express.Multer.File[], thumbnail?: Express.Multer.File[] }) {

        const thumbnailRefs = await Promise.all(
            (uploadedFiles.thumbnail ?? []).map(img =>
                sanityServiceWithoutPublished.assets.upload('image', img.buffer, { filename: img.originalname })
            )
        );
        
        const articleRefs = await Promise.all(
            (uploadedFiles.article ?? []).map(file =>
                sanityServiceWithoutPublished.assets.upload('file', file.buffer, { filename: file.originalname })
            )
        );

        const imageRefs = await Promise.all(
            (uploadedFiles.images ?? []).map(img =>
                sanityServiceWithoutPublished.assets.upload('image', img.buffer, { filename: img.originalname })
            )
        );

        const fileRefs = await Promise.all(
            (uploadedFiles.files ?? []).map(file =>
                sanityServiceWithoutPublished.assets.upload('file', file.buffer, { filename: file.originalname })
            )
        );

        const removeImageUrls: string[] = newDTO.remove_image_urls ? JSON.parse(newDTO.remove_image_urls) : [];
        const removeFileUrls: string[] = newDTO.remove_file_urls ? JSON.parse(newDTO.remove_file_urls) : [];

        const current = await sanityServiceWithoutPublished.fetch(
            '*[_type == "uploaded_article" && _id == $id][0] { "imgs": images[]{ _key, "assetId": asset->_id, "url": asset->url }, "fls": Files[]{ _key, "assetId": asset->_id, "url": asset->url } }',
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
                Title: newDTO.new_title,
                pinned: newDTO.new_pinned,
                slug: { _type: 'slug', current: newDTO.new_title },
                publishedAt: new Date().toLocaleDateString('en-US'),
                images: newImages,
                Files: newFiles
            });

        if (newDTO.remove_article === 'true') {
            patchBuilder = patchBuilder.unset(['article']);
        } else if (articleRefs.length > 0) {
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

    async findAll() {
        return sanityServiceWithoutPublished.fetch(
            '*[_type == "uploaded_article"] | order(publishedAt desc) { _id, Title, pinned, publishedAt, "thumbnailUrl": thumbnail[0].asset->url }'
        );
    }

    async findById(id: string) {
        return sanityServiceWithoutPublished.fetch(
            '*[_type == "uploaded_article" && _id == $id][0] { ..., "articleUrl": article[0].asset->url, "articleFilename": article[0].asset->originalFilename, "thumbnailUrl": thumbnail[0].asset->url, "imageItems": images[]{ "url": asset->url }, "fileItems": Files[]{ "url": asset->url, "originalFilename": asset->originalFilename } }',
            { id }
        );
    }

    async pin(id: string) {
        return sanityServiceWithoutPublished.patch(id).set({ pinned: true }).commit();
    }

    async unpin(id: string) {
        return sanityServiceWithoutPublished.patch(id).set({ pinned: false }).commit();
    }

    async deleteArticle (id: string) {
            try {
                await sanityService.delete(id)
            } catch (error) {
                throw new Error ("Error deleting post")
            }
        }
}