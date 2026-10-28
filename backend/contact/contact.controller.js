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
exports.contactController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const contact_service_1 = require("./contact.service");
const contact_dto_1 = require("./contact.dto");
const contact_pipes_1 = require("./contact.pipes");
const auth_guard_1 = require("../auth/auth.guard");
let contactController = class contactController {
    contact;
    constructor(contact) {
        this.contact = contact;
    }
    async findAll() {
        return this.contact.getContact();
    }
    async createContact(dto) {
        return this.contact.createContact(dto);
    }
    async updateContact(dto) {
        return this.contact.updateContact(dto);
    }
    async deleteContactFields(option) {
        return this.contact.deleteContactField(option);
    }
    async deleteContact() {
        return this.contact.deleteContact();
    }
};
exports.contactController = contactController;
__decorate([
    (0, common_2.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], contactController.prototype, "findAll", null);
__decorate([
    (0, common_2.Post)('create'),
    (0, common_2.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contact_dto_1.createContactDTO]),
    __metadata("design:returntype", Promise)
], contactController.prototype, "createContact", null);
__decorate([
    (0, common_2.Patch)(),
    (0, common_2.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contact_dto_1.createNewContactDTO]),
    __metadata("design:returntype", Promise)
], contactController.prototype, "updateContact", null);
__decorate([
    (0, common_2.Delete)('fields'),
    (0, common_2.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_2.Query)('option', contact_pipes_1.optionValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], contactController.prototype, "deleteContactFields", null);
__decorate([
    (0, common_2.Delete)(),
    (0, common_2.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], contactController.prototype, "deleteContact", null);
exports.contactController = contactController = __decorate([
    (0, common_1.Controller)('contact'),
    __metadata("design:paramtypes", [contact_service_1.contactService])
], contactController);
//# sourceMappingURL=contact.controller.js.map