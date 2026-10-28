"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resumeService = void 0;
const common_1 = require("@nestjs/common");
const sanity_service_1 = require("../sanity/sanity.service");
const RESUME_ID = 'singleton-resume';
let resumeService = class resumeService {
    async getResume() {
        return sanity_service_1.sanityService.fetch('*[_type == "resume"][0]{ ..., file { asset-> } }');
    }
    async uploadResume(file) {
        const asset = await sanity_service_1.sanityServiceWithoutPublished.assets.upload('file', file.buffer, { filename: file.originalname });
        const existing = await sanity_service_1.sanityService.fetch('*[_type == "resume"][0]');
        if (existing) {
            return sanity_service_1.sanityServiceWithoutPublished
                .patch(existing._id)
                .set({ file: { _type: 'file', asset: { _type: 'reference', _ref: asset._id } } })
                .commit();
        }
        return sanity_service_1.sanityServiceWithoutPublished.createOrReplace({
            _type: 'resume',
            _id: RESUME_ID,
            file: { _type: 'file', asset: { _type: 'reference', _ref: asset._id } }
        });
    }
    async deleteResume() {
        const existing = await sanity_service_1.sanityService.fetch('*[_type == "resume"][0]');
        if (existing) {
            await sanity_service_1.sanityServiceWithoutPublished.delete(existing._id);
        }
    }
};
exports.resumeService = resumeService;
exports.resumeService = resumeService = __decorate([
    (0, common_1.Injectable)()
], resumeService);
//# sourceMappingURL=resume.service.js.map