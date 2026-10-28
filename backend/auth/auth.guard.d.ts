import { CanActivate, ExecutionContext } from "@nestjs/common";
import { supabaseService } from "../supabase/supabase.service";
export declare class AuthGuard implements CanActivate {
    private readonly supabase;
    constructor(supabase: supabaseService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
