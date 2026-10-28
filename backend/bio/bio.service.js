"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bioService = void 0;
const common_1 = require("@nestjs/common");
const sanity_service_1 = require("../sanity/sanity.service");
let bioService = class bioService {
    async createBio(dto) {
        try {
            await sanity_service_1.sanityService.create({
                _type: 'bio',
                _id: '23919',
                content: dto.content,
            });
        }
        catch (error) {
            throw new common_1.UnauthorizedException();
        }
    }
    async getBio() {
        const bio = await sanity_service_1.sanityService.fetch('*[_type == "bio"]');
        return bio;
    }
    async updateBio(newdto) {
        try {
            await sanity_service_1.sanityService
                .patch('23919')
                .set({
                content: newdto.content,
            }).commit();
        }
        catch (error) {
            throw new Error("Error updating bio");
        }
    }
    async deleteBio() {
        try {
            await sanity_service_1.sanityService.delete('23919');
        }
        catch (error) {
            throw new Error("Error deleting post");
        }
    }
};
exports.bioService = bioService;
exports.bioService = bioService = __decorate([
    (0, common_1.Injectable)()
], bioService);
//# sourceMappingURL=bio.service.js.map