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
exports.uploadedArticleController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const auth_guard_1 = require("../auth/auth.guard");
const uploadArticle_dto_1 = require("./uploadArticle.dto");
const uploadArticle_service_1 = require("./uploadArticle.service");
let uploadedArticleController = class uploadedArticleController {
    article;
    constructor(article) {
        this.article = article;
    }
    async createArticle(dto, UploadedFiles) {
        return this.article.createArticle(dto, UploadedFiles);
    }
    async updateArticle(dto, UploadedFiles, id) {
        return this.article.updateArticle(id, dto, UploadedFiles);
    }
    async getAll() {
        return this.article.findAll();
    }
    async getById(id) {
        return this.article.findById(id);
    }
    async pin(id) {
        return this.article.pin(id);
    }
    async unpin(id) {
        return this.article.unpin(id);
    }
    async deleteArticle(id) {
        return this.article.deleteArticle(id);
    }
};
exports.uploadedArticleController = uploadedArticleController;
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'article', maxCount: 1 },
        { name: 'thumbnail', maxCount: 1 },
        { name: 'images', maxCount: 5 },
        { name: 'files', maxCount: 5 }
    ])),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [uploadArticle_dto_1.uploadArticleDTO, Object]),
    __metadata("design:returntype", Promise)
], uploadedArticleController.prototype, "createArticle", null);
__decorate([
    (0, common_1.Patch)('update/:id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'article', maxCount: 1 },
        { name: 'thumbnail', maxCount: 1 },
        { name: 'images', maxCount: 5 },
        { name: 'files', maxCount: 5 }
    ])),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [uploadArticle_dto_1.uploadNewArticleDTO, Object, String]),
    __metadata("design:returntype", Promise)
], uploadedArticleController.prototype, "updateArticle", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], uploadedArticleController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], uploadedArticleController.prototype, "getById", null);
__decorate([
    (0, common_1.Patch)('pin/:id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], uploadedArticleController.prototype, "pin", null);
__decorate([
    (0, common_1.Patch)('unpin/:id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], uploadedArticleController.prototype, "unpin", null);
__decorate([
    (0, common_1.Delete)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], uploadedArticleController.prototype, "deleteArticle", null);
exports.uploadedArticleController = uploadedArticleController = __decorate([
    (0, common_1.Controller)('upload-article'),
    __metadata("design:paramtypes", [uploadArticle_service_1.uploadArticleService])
], uploadedArticleController);
//# sourceMappingURL=uploadedArticle.controller.js.map