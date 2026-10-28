import { Request } from "express";
import { authService } from "./auth.service";
import { authDTO } from "./auth.dto";
export declare class authController {
    private readonly auth;
    constructor(auth: authService);
    signIn(dto: authDTO): Promise<{
        user: import("@supabase/auth-js").User;
        session: import("@supabase/auth-js").Session;
        weakPassword?: import("@supabase/auth-js").WeakPassword;
    }>;
    signOut(): Promise<void>;
    refresh(refreshToken: string): Promise<import("@supabase/auth-js").Session>;
    sendOTP(req: Request & {
        user: any;
    }, dto: authDTO): Promise<void>;
    verifyOTP(req: Request & {
        user: any;
    }, dto: authDTO): Promise<boolean>;
    verifyPassword(req: Request & {
        user: any;
    }, dto: authDTO): Promise<boolean>;
    changeEmail(req: Request & {
        user: any;
    }, body: {
        id: string;
        email: string;
        token: string;
        new_email: string;
    }): Promise<{
        user: import("@supabase/auth-js").User;
    }>;
    changePassword(req: Request & {
        user: any;
    }, body: {
        email: string;
        token: string;
        new_password: string;
    }): Promise<{
        user: import("@supabase/auth-js").User;
    }>;
}
