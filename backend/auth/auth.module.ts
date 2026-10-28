import { Module } from "@nestjs/common";
import { authController } from "./auth.controller";
import { authService } from "./auth.service";
import { SupabaseModule } from "supabase/supabase.module";

@Module({
    controllers: [authController],
    imports: [SupabaseModule],
    providers: [authService],
    exports: [authService]
})

export class AuthModule{}