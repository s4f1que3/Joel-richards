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
exports.authService = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../supabase/supabase.service");
let authService = class authService {
    supabase;
    constructor(supabase) {
        this.supabase = supabase;
    }
    async signIn(dto) {
        const { data, error } = await this.supabase.db.auth.signInWithPassword({
            email: dto.email,
            password: dto.password
        });
        if (error) {
            throw new common_1.UnauthorizedException(error.message);
        }
        return data;
    }
    async signOut() {
        await this.supabase.db.auth.signOut();
    }
    async sendOtp(email) {
        const { error } = await this.supabase.db.auth.signInWithOtp({
            email: email,
            options: {
                shouldCreateUser: false
            }
        });
        if (error) {
            throw new Error("error sending OTP");
        }
    }
    async verifyOTP(email, token) {
        const { error } = await this.supabase.db.auth.verifyOtp({
            email: email,
            token: token,
            type: 'email'
        });
        if (error) {
            console.error('[verifyOTP] error:', error.message);
            return false;
        }
        return true;
    }
    async verfiyPassword(email, password) {
        const { error } = await this.supabase.db.auth.signInWithPassword({
            email: email,
            password: password
        });
        if (error) {
            return false;
        }
        return true;
    }
    async changeEmail(id, email, token, dto) {
        const verifiedOTP = await this.verifyOTP(email, token);
        if (!verifiedOTP)
            throw new Error('Invalid OTP');
        const { data, error } = await this.supabase.db.auth.admin.updateUserById(id, {
            email: dto.new_email
        });
        if (error) {
            console.error('[changeEmail] updateUser error:', error.message);
            throw new Error(error.message);
        }
        return data;
    }
    async refreshSession(refreshToken) {
        const { data, error } = await this.supabase.db.auth.refreshSession({ refresh_token: refreshToken });
        if (error || !data.session)
            throw new common_1.UnauthorizedException('Invalid refresh token');
        return data.session;
    }
    async changePassword(email, token, dto) {
        const verifiedOTP = await this.verifyOTP(email, token);
        if (!verifiedOTP)
            throw new Error('Invalid OTP');
        const { data, error } = await this.supabase.db.auth.updateUser({
            password: dto.new_password
        });
        if (error)
            throw new Error(error.message);
        return data;
    }
};
exports.authService = authService;
exports.authService = authService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.supabaseService])
], authService);
//# sourceMappingURL=auth.service.js.map