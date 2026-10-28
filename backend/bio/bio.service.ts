import { Injectable, UnauthorizedException } from "@nestjs/common";
import { createBioDTO } from "./create.bio.dto";
import { sanityService } from "sanity/sanity.service";
import { UpdateBioDTO } from "./createnewbio.dto";

@Injectable()
export class bioService {
    
    //// CREATE BIO
    async createBio (dto: createBioDTO) {
        try {
            await sanityService.create({
                _type: 'bio',
                _id: '23919',
                content: dto.content,
            })
        } catch (error) {
            throw new UnauthorizedException ()
        }
    }

    //// GET BIO
    async getBio () {
        const bio = await sanityService.fetch('*[_type == "bio"]')
        return bio
    }

    ////// UPDATE BIO
    async updateBio (newdto: UpdateBioDTO) {
        try {
            await sanityService
            .patch('23919')
            .set({
                content: newdto.content,
            }).commit()
        } catch (error) {
            throw new Error ("Error updating bio")
        }
    }

    ///// DELETE BIO
    async deleteBio () {
        try {
            await sanityService.delete('23919')
        } catch (error) {
            throw new Error ("Error deleting post")
        }
    }
}