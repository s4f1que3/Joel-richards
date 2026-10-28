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
exports.articlesController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const articles_service_1 = require("./articles.service");
const article_dto_1 = require("./article.dto");
const article_dto_2 = require("./article.dto");
const article_pipes_1 = require("./article.pipes");
const auth_guard_1 = require("../auth/auth.guard");
let articlesController = class articlesController {
    article;
    constructor(article) {
        this.article = article;
    }
    async findAll() {
        return this.article.findAll();
    }
    async createArticle(dto, UploadedFiles) {
        return this.article.createArticle(dto, UploadedFiles);
    }
    async updateArticle(dto, UploadedFiles, id) {
        return this.article.updateArticle(id, dto, UploadedFiles);
    }
    async getPinned() {
        return this.article.getPinned();
    }
    async pinArticle(id) {
        return this.article.pinArticle(id);
    }
    async unpinArticle(id) {
        return this.article.unpinArticle(id);
    }
    async deleteArticle(id) {
        return this.article.deleteArticle(id);
    }
    async findById(id) {
        return this.article.findById(id);
    }
    async findBySlug(slug) {
        return this.article.findBySlug(slug);
    }
};
exports.articlesController = articlesController;
__decorate([
    (0, common_2.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], articlesController.prototype, "findAll", null);
__decorate([
    (0, common_2.Post)('create'),
    (0, common_2.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_2.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'thumbnail', maxCount: 1 },
        { name: 'images', maxCount: 5 },
        { name: 'files', maxCount: 5 }
    ])),
    __param(0, (0, common_2.Body)()),
    __param(1, (0, common_2.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [article_dto_1.createArticleDTO, Object]),
    __metadata("design:returntype", Promise)
], articlesController.prototype, "createArticle", null);
__decorate([
    (0, common_2.Patch)('update/:id'),
    (0, common_2.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_2.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'thumbnail', maxCount: 1 },
        { name: 'images', maxCount: 5 },
        { name: 'files', maxCount: 5 }
    ])),
    __param(0, (0, common_2.Body)()),
    __param(1, (0, common_2.UploadedFiles)()),
    __param(2, (0, common_2.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [article_dto_2.updateArticleDTO, Object, String]),
    __metadata("design:returntype", Promise)
], articlesController.prototype, "updateArticle", null);
__decorate([
    (0, common_2.Get)('pinned'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], articlesController.prototype, "getPinned", null);
__decorate([
    (0, common_2.Patch)('pin/:id'),
    (0, common_2.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_2.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], articlesController.prototype, "pinArticle", null);
__decorate([
    (0, common_2.Patch)('unpin/:id'),
    (0, common_2.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_2.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], articlesController.prototype, "unpinArticle", null);
__decorate([
    (0, common_2.Delete)('delete/:id'),
    (0, common_2.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_2.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], articlesController.prototype, "deleteArticle", null);
__decorate([
    (0, common_2.Get)('by-id/:id'),
    __param(0, (0, common_2.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], articlesController.prototype, "findById", null);
__decorate([
    (0, common_2.Get)(':slug'),
    __param(0, (0, common_2.Param)('slug', article_pipes_1.slugValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], articlesController.prototype, "findBySlug", null);
exports.articlesController = articlesController = __decorate([
    (0, common_1.Controller)('articles'),
    __metadata("design:paramtypes", [articles_service_1.articlesService])
], articlesController);
//# sourceMappingURL=articles.controller.js.map