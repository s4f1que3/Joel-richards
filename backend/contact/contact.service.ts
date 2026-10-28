import { Injectable } from "@nestjs/common";
import { sanityService } from "sanity/sanity.service";
import { createContactDTO, createNewContactDTO } from "./contact.dto";

@Injectable()
export class contactService{

    async createContact (dto: createContactDTO) {
        try {
            await sanityService.createOrReplace({
                _type: 'contact',
                _id: '43888',
                phone: dto.phone,
                email: dto.email,
                instagram: dto.instagram,
                linkedin: dto.linkedin
            })
        } catch (error) {
            throw new Error ("Error creating contact")
        }
    }

    async getContact () {
        const contact = await sanityService.fetch('*[_type == "contact"]')
        return contact
    }

    async updateContact (dto: createNewContactDTO) {
        await sanityService.patch('43888')
        .set({
            phone: dto.new_phone,
            email: dto.new_email,
            instagram: dto.new_instagram,
            linkedin: dto.new_linkedin
        }).commit()
    }

    async deleteContactField (option: string) {
        await sanityService.patch('43888')
        .unset([option])
        .commit()
    }

    async deleteContact () {
        await sanityService.delete('43888')
    }

    
}