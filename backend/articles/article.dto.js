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
exports.updateArticleDTO = exports.createArticleDTO = void 0;
const class_validator_1 = require("class-validator");
class createArticleDTO {
    title;
    content;
    thumbnail;
    images;
    files;
    pinned;
}
exports.createArticleDTO = createArticleDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], createArticleDTO.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], createArticleDTO.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], createArticleDTO.prototype, "thumbnail", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], createArticleDTO.prototype, "images", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], createArticleDTO.prototype, "files", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], createArticleDTO.prototype, "pinned", void 0);
class updateArticleDTO {
    new_title;
    new_content;
    new_thumbnail;
    new_images;
    new_files;
    new_pinned;
    remove_image_urls;
    remove_file_urls;
    remove_thumbnail;
}
exports.updateArticleDTO = updateArticleDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], updateArticleDTO.prototype, "new_title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], updateArticleDTO.prototype, "new_content", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], updateArticleDTO.prototype, "new_thumbnail", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], updateArticleDTO.prototype, "new_images", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], updateArticleDTO.prototype, "new_files", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], updateArticleDTO.prototype, "new_pinned", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], updateArticleDTO.prototype, "remove_image_urls", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], updateArticleDTO.prototype, "remove_file_urls", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], updateArticleDTO.prototype, "remove_thumbnail", void 0);
//# sourceMappingURL=article.dto.js.map