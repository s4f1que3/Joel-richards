"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bioController = void 0;
const common_1 = require("@nestjs/common");
const bio_service_1 = require("./bio.service");
const create_bio_dto_1 = require("./create.bio.dto");
const createnewbio_dto_1 = require("./createnewbio.dto");
const auth_guard_1 = require("../auth/auth.guard");
let bioController = class bioController {
    bio;
    constructor(bio) {
        this.bio = bio;
    }
    async findAll() {
        return this.bio.getBio();
    }
    async createBio(createBioDTO) {
        return this.bio.createBio(createBioDTO);
    }
    async updateBio(UpdateBioDTO, id) {
        return this.bio.updateBio(UpdateBioDTO);
    }
    async deleteBio(id) {
        return this.bio.deleteBio();
    }
};
exports.bioController = bioController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], bioController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_bio_dto_1.createBioDTO]),
    __metadata("design:returntype", Promise)
], bioController.prototype, "createBio", null);
__decorate([
    (0, common_1.Patch)('update/:id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createnewbio_dto_1.UpdateBioDTO, String]),
    __metadata("design:returntype", Promise)
], bioController.prototype, "updateBio", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], bioController.prototype, "deleteBio", null);
exports.bioController = bioController = __decorate([
    (0, common_1.Controller)('bio'),
    __metadata("design:paramtypes", [bio_service_1.bioService])
], bioController);
//# sourceMappingURL=bio.controller.js.map