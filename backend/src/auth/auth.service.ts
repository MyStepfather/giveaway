import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly jwtService: JwtService,
	) {}

	async findUser(login: string): Promise<User | null> {
		return await this.prisma.user.findUnique({ where: { login } });
	}

	async validateUser({ login, password }: AuthDto) {
		const user = await this.findUser(login);
		if (!user) throw new NotFoundException('Пользователь не найден');

		const isCorrectPassword = await compare(password, user.passwordHash);
		if (!isCorrectPassword) throw new UnauthorizedException('Неправильный пароль');

		return { login: user.login };
	}

	async login(login: string) {
		const payload = { login };
		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}
}
