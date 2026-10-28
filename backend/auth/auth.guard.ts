import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { supabaseService } from "supabase/supabase.service";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private readonly supabase: supabaseService){}
    async canActivate(
        context: ExecutionContext, 

    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const token = request.headers.authorization?.split(' ')[1]

        if (!token) throw new UnauthorizedException()
        const { data, error } = await this.supabase.db.auth.getUser(token)
        console.log('guard error', error)
        console.log('guard user:', data?.user)
        if (error || !data.user) throw new UnauthorizedException()
        if(data.user.id !== process.env.OWNER_ID) throw new UnauthorizedException()
        
        request.user = data.user
        return true
    }
}