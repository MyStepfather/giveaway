import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { CurrentUserId } from 'src/decorators/current-user-id.decorator';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@UseGuards(JwtAuthGuard)
	@Patch()
	async update(@CurrentUserId() id: number, @Body() dto: Partial<User>) {
		return await this.userService.update(id, dto);
	}
}
