"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadArticleModule = void 0;
const common_1 = require("@nestjs/common");
const uploadArticle_service_1 = require("./uploadArticle.service");
const uploadedArticle_controller_1 = require("./uploadedArticle.controller");
let uploadArticleModule = class uploadArticleModule {
};
exports.uploadArticleModule = uploadArticleModule;
exports.uploadArticleModule = uploadArticleModule = __decorate([
    (0, common_1.Module)({
        controllers: [uploadedArticle_controller_1.uploadedArticleController],
        providers: [uploadArticle_service_1.uploadArticleService],
        exports: [uploadArticle_service_1.uploadArticleService]
    })
], uploadArticleModule);
//# sourceMappingURL=uploadArticle.module.js.map