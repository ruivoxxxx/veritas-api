import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { Request } from 'express';
import { UserPayload } from '../services/login/service/login.service';

export interface RequestUser extends Request {
    usuario: UserPayload;
}
@Injectable()
export class JwtGuards implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.headerToken(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(token);
            request.usuario = payload;
        } catch (error) {
            if (error instanceof TokenExpiredError)
                throw new UnauthorizedException();
            throw new UnauthorizedException();
        }
        return true;
    }
    private headerToken(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
