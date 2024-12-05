import { IsString } from 'class-validator';

export class AuthDto {
	@IsString({ message: 'не строка' })
	login: string;

	@IsString()
	password: string;
}
