import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  CanActivate,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    // 1) Allow unauthenticated calls to all /api/auth/* routes:
    if (req.path.startsWith('/api/auth/')) {
      return true;
    }

    // 2) Still allow Swagger UI & JSON spec:
    if (
      req.path.startsWith('/api/docs') ||
      req.path.startsWith('/api/docs-json')
    ) {
      return true;
    }

    // 3) Everything else requires a valid JWT
    return super.canActivate(context) as boolean;
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
