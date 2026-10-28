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
exports.authController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_dto_1 = require("./auth.dto");
const auth_guard_1 = require("./auth.guard");
let authController = class authController {
    auth;
    constructor(auth) {
        this.auth = auth;
    }
    async signIn(dto) {
        return this.auth.signIn(dto);
    }
    async signOut() {
        return this.auth.signOut();
    }
    async refresh(refreshToken) {
        return this.auth.refreshSession(refreshToken);
    }
    async sendOTP(req, dto) {
        const user = req.user;
        return this.auth.sendOtp(user.email);
    }
    async verifyOTP(req, dto) {
        const user = req.user;
        return this.auth.verifyOTP(user.email, dto.token);
    }
    async verifyPassword(req, dto) {
        const user = req.user;
        return this.auth.verfiyPassword(user.email, dto.password);
    }
    async changeEmail(req, body) {
        const user = req.user;
        return this.auth.changeEmail(user.id, user.email, body.token, { new_email: body.new_email });
    }
    async changePassword(req, body) {
        const user = req.user;
        return this.auth.changePassword(user.email, body.token, { new_password: body.new_password });
    }
};
exports.authController = authController;
__decorate([
    (0, common_1.Post)('sign-in'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.authDTO]),
    __metadata("design:returntype", Promise)
], authController.prototype, "signIn", null);
__decorate([
    (0, common_1.Post)('sign-out'),
    (0, common_1.HttpCode)(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], authController.prototype, "signOut", null);
__decorate([
    (0, common_1.Post)('refresh'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)('refresh_token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], authController.prototype, "refresh", null);
__decorate([
    (0, common_1.Post)('send-otp'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, auth_dto_1.authDTO]),
    __metadata("design:returntype", Promise)
], authController.prototype, "sendOTP", null);
__decorate([
    (0, common_1.Post)('verify-otp'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, auth_dto_1.authDTO]),
    __metadata("design:returntype", Promise)
], authController.prototype, "verifyOTP", null);
__decorate([
    (0, common_1.Post)('verify-password'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, auth_dto_1.authDTO]),
    __metadata("design:returntype", Promise)
], authController.prototype, "verifyPassword", null);
__decorate([
    (0, common_1.Post)('change-email'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], authController.prototype, "changeEmail", null);
__decorate([
    (0, common_1.Post)('change-password'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], authController.prototype, "changePassword", null);
exports.authController = authController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.authService])
], authController);
//# sourceMappingURL=auth.controller.js.map