import { Controller, Post, HttpCode, Body, UseGuards, Req} from "@nestjs/common";
import { Request } from "express";
import { authService } from "./auth.service";
import { authDTO, newAuthDTO, tokenDTO } from "./auth.dto";
import { AuthGuard } from "./auth.guard";

@Controller('auth')
export class authController {
    constructor(private readonly auth: authService){}

    @Post('sign-in')
    @HttpCode(200)
    async signIn (@Body() dto: authDTO) {
        return this.auth.signIn(dto)
    }

    @Post('sign-out')
    @HttpCode(200)
    async signOut () {
        return this.auth.signOut()
    }

    @Post('refresh')
    @HttpCode(200)
    async refresh (@Body('refresh_token') refreshToken: string) {
        return this.auth.refreshSession(refreshToken)
    }

    @Post('send-otp')
    @UseGuards(AuthGuard)
    @HttpCode(200)
    async sendOTP (@Req() req: Request & {user : any}, @Body() dto: authDTO) {
        const user = req.user as any
        return this.auth.sendOtp(user.email)
    }

    @Post('verify-otp')
    @HttpCode(200)
    async verifyOTP (@Req() req: Request & {user: any}, @Body() dto: tokenDTO) {
        const user = req.user as any
        return this.auth.verifyOTP(user.email, dto.token)
    }

    @Post('verify-password')
    @HttpCode(200)
    async verifyPassword (@Req() req: Request & {user: any}, @Body() dto: authDTO) {
        const user = req.user as any
        return this.auth.verfiyPassword(user.email, dto.password)
    }

    @Post('change-email')
    @UseGuards(AuthGuard)
    @HttpCode(200)
    async changeEmail (@Req() req: Request & {user: any}, @Body() body: {id: string, email: string; token: string; new_email: string }) {
        const user = req.user as any
        return this.auth.changeEmail(user.id, user.email, body.token, { new_email: body.new_email } as newAuthDTO)
    }

    @Post('change-password')
    @UseGuards(AuthGuard)
    @HttpCode(200)
    async changePassword (@Req() req: Request & {user: any}, @Body() body: { email: string; token: string; new_password: string }) {
        const user = req.user as any
        return this.auth.changePassword(user.email, body.token, { new_password: body.new_password } as newAuthDTO)
    }
}