import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwt: JwtService, private reflector: Reflector) { }
    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        const req = context.switchToHttp().getRequest<Request>();
        const token = req.cookies?.token;
        if (!token) {
            throw new UnauthorizedException('Missing auth token');
        }
        try {
            const decoded = this.jwt.verify(token, { secret: process.env.JWT_SECRET });
            req['soldier'] = decoded;
            console.log("decoded: ", decoded);
            if (!decoded.role) {
                throw new ForbiddenException('User has no role');
            }
            if (roles && roles.length > 0) {
                if (!roles.includes(decoded.role)) {
                    throw new ForbiddenException('Insufficient permissions');
                }
            }
            return true;
        } catch (err) {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }
}
