import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    handleRequest(err: any, user: any, info: any) {
        if (err || !user) {
          throw err || new UnauthorizedException('Email hoặc mật khẩu không đúng');
        }
        return user;
    }
}