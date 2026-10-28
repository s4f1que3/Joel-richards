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
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadNewArticleDTO = exports.uploadArticleDTO = void 0;
const class_validator_1 = require("class-validator");
const common_1 = require("@nestjs/common");
let uploadArticleDTO = class uploadArticleDTO {
    title;
    pinned;
};
exports.uploadArticleDTO = uploadArticleDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], uploadArticleDTO.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], uploadArticleDTO.prototype, "pinned", void 0);
exports.uploadArticleDTO = uploadArticleDTO = __decorate([
    (0, common_1.Injectable)()
], uploadArticleDTO);
let uploadNewArticleDTO = class uploadNewArticleDTO {
    new_title;
    new_pinned;
    remove_image_urls;
    remove_file_urls;
    remove_article;
    remove_thumbnail;
};
exports.uploadNewArticleDTO = uploadNewArticleDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], uploadNewArticleDTO.prototype, "new_title", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], uploadNewArticleDTO.prototype, "new_pinned", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], uploadNewArticleDTO.prototype, "remove_image_urls", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], uploadNewArticleDTO.prototype, "remove_file_urls", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], uploadNewArticleDTO.prototype, "remove_article", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], uploadNewArticleDTO.prototype, "remove_thumbnail", void 0);
exports.uploadNewArticleDTO = uploadNewArticleDTO = __decorate([
    (0, common_1.Injectable)()
], uploadNewArticleDTO);
//# sourceMappingURL=uploadArticle.dto.js.map