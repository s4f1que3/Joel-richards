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
exports.createNewContactDTO = exports.createContactDTO = void 0;
const class_validator_1 = require("class-validator");
class createContactDTO {
    phone;
    email;
    instagram;
    linkedin;
}
exports.createContactDTO = createContactDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], createContactDTO.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], createContactDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], createContactDTO.prototype, "instagram", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], createContactDTO.prototype, "linkedin", void 0);
class createNewContactDTO {
    new_phone;
    new_email;
    new_instagram;
    new_linkedin;
}
exports.createNewContactDTO = createNewContactDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], createNewContactDTO.prototype, "new_phone", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], createNewContactDTO.prototype, "new_email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], createNewContactDTO.prototype, "new_instagram", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], createNewContactDTO.prototype, "new_linkedin", void 0);
//# sourceMappingURL=contact.dto.js.map