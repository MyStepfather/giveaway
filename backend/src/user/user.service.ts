import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}
	async update(id: number, dto: Partial<User>) {		
		return await this.prisma.user.update({ where: { id }, data: dto });
	}
}
