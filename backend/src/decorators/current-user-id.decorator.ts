import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUserId = createParamDecorator(
	(data: unknown, ctx: ExecutionContext): { id: number } => {
		const request = ctx.switchToHttp().getRequest();
		const userId = request.user.id;
		return userId;
	},
);
