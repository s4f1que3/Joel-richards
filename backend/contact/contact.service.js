"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactService = void 0;
const common_1 = require("@nestjs/common");
const sanity_service_1 = require("../sanity/sanity.service");
let contactService = class contactService {
    async createContact(dto) {
        try {
            await sanity_service_1.sanityService.createOrReplace({
                _type: 'contact',
                _id: '43888',
                phone: dto.phone,
                email: dto.email,
                instagram: dto.instagram,
                linkedin: dto.linkedin
            });
        }
        catch (error) {
            throw new Error("Error creating contact");
        }
    }
    async getContact() {
        const contact = await sanity_service_1.sanityService.fetch('*[_type == "contact"]');
        return contact;
    }
    async updateContact(dto) {
        await sanity_service_1.sanityService.patch('43888')
            .set({
            phone: dto.new_phone,
            email: dto.new_email,
            instagram: dto.new_instagram,
            linkedin: dto.new_linkedin
        }).commit();
    }
    async deleteContactField(option) {
        await sanity_service_1.sanityService.patch('43888')
            .unset([option])
            .commit();
    }
    async deleteContact() {
        await sanity_service_1.sanityService.delete('43888');
    }
};
exports.contactService = contactService;
exports.contactService = contactService = __decorate([
    (0, common_1.Injectable)()
], contactService);
//# sourceMappingURL=contact.service.js.map