import { createParamDecorator, ExecutionContext } from '@nestjs/common';

interface AuthenticatedUser {
  userId: string;
  email: string;
}

export const UserId = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest<{ user: AuthenticatedUser }>();
    return request.user.userId;
  },
);
