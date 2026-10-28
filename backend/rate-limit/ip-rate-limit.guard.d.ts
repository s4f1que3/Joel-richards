import { CanActivate, ExecutionContext } from "@nestjs/common";
export declare abstract class IpRateLimitGuard implements CanActivate {
    private readonly ratelimit;
    constructor(prefix: string, limit: number, windowSeconds: number);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
