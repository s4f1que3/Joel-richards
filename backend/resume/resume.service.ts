import { Injectable } from "@nestjs/common";
import { sanityService, sanityServiceWithoutPublished } from "sanity/sanity.service";

const RESUME_ID = 'singleton-resume';

@Injectable()
export class resumeService {

    async getResume () {
        return sanityService.fetch('*[_type == "resume"][0]{ ..., file { asset-> } }')
    }

    async uploadResume (file: Express.Multer.File) {
        const asset = await sanityServiceWithoutPublished.assets.upload(
            'file', file.buffer, { filename: file.originalname }
        );

        const existing = await sanityService.fetch('*[_type == "resume"][0]');

        if (existing) {
            return sanityServiceWithoutPublished
                .patch(existing._id)
                .set({ file: { _type: 'file', asset: { _type: 'reference', _ref: asset._id } } })
                .commit();
        }

        return sanityServiceWithoutPublished.createOrReplace({
            _type: 'resume',
            _id: RESUME_ID,
            file: { _type: 'file', asset: { _type: 'reference', _ref: asset._id } }
        });
    }

    async deleteResume () {
        const existing = await sanityService.fetch('*[_type == "resume"][0]');
        if (existing) {
            await sanityServiceWithoutPublished.delete(existing._id);
        }
    }
}
