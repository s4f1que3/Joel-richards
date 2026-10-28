"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IpRateLimitGuard = void 0;
const common_1 = require("@nestjs/common");
const ratelimit_1 = require("@upstash/ratelimit");
const redis_client_1 = require("./redis.client");
class IpRateLimitGuard {
    ratelimit;
    constructor(prefix, limit, windowSeconds) {
        this.ratelimit = new ratelimit_1.Ratelimit({
            redis: redis_client_1.redis,
            limiter: ratelimit_1.Ratelimit.fixedWindow(limit, `${windowSeconds} s`),
            prefix: `ratelimit:${prefix}`,
        });
    }
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const ip = req.ips?.length ? req.ips[0] : req.ip;
        const { success } = await this.ratelimit.limit(ip ?? "unknown");
        if (!success) {
            throw new common_1.HttpException("Too many requests, please slow down.", common_1.HttpStatus.TOO_MANY_REQUESTS);
        }
        return true;
    }
}
exports.IpRateLimitGuard = IpRateLimitGuard;
//# sourceMappingURL=ip-rate-limit.guard.js.map