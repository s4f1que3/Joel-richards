import { authDTO, newAuthDTO } from "./auth.dto";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { supabaseService } from "supabase/supabase.service";


@Injectable()
export class authService {
    constructor(private readonly supabase: supabaseService){}

    async signIn (dto: authDTO) {
        const {data, error} = await this.supabase.db.auth.signInWithPassword({
            email: dto.email,
            password: dto.password
        })

        if(error) {
            throw new UnauthorizedException (error.message)
        }

        return data
    }

    async signOut () {
        await this.supabase.db.auth.signOut()
    }

    /// send and verify otp

    async sendOtp (email: string) {
        const {error} = await this.supabase.db.auth.signInWithOtp({
            email: email, 
            options: {
                shouldCreateUser: false
            }
        })

        if(error) {
            throw new Error("error sending OTP")
        }
    }

    async verifyOTP (email: string, token: string): Promise<boolean> {
        const {error} = await this.supabase.db.auth.verifyOtp({
            email: email,
            token: token,
            type: 'email'
        })

        if(error) {
            console.error('[verifyOTP] error:', error.message)
            return false
        }

        return true
    }

    //// this is being used to change password. must verify current to change

    async verfiyPassword (email: string, password: string): Promise<boolean> {
        const {error} = await this.supabase.db.auth.signInWithPassword({
            email: email,
            password: password
        })

        if(error) {
            return false
        }

        return true
    }

    //// send otp will be used for this

    async changeEmail (id: string, email: string, token: string, dto: newAuthDTO) {
        const verifiedOTP = await this.verifyOTP(email, token)
        if(!verifiedOTP) throw new Error('Invalid OTP')

        const { data, error} = await this.supabase.db.auth.admin.updateUserById(id, {
            email: dto.new_email
        })

        if(error) {
            console.error('[changeEmail] updateUser error:', error.message)
            throw new Error(error.message)
        }
        return data

    }

    async refreshSession (refreshToken: string) {
        const { data, error } = await this.supabase.db.auth.refreshSession({ refresh_token: refreshToken })
        if (error || !data.session) throw new UnauthorizedException('Invalid refresh token')
        return data.session
    }

    async changePassword (email: string, token: string, dto: newAuthDTO) {
        const verifiedOTP = await this.verifyOTP(email, token)
        if(!verifiedOTP) throw new Error('Invalid OTP')

        const { data, error} = await this.supabase.db.auth.updateUser({
            password: dto.new_password
        })

        if(error) throw new Error(error.message)
        return data
    }

}
