import { PrismaClient } from '@prisma/client';
import { genSalt, hash } from 'bcryptjs';
const prisma = new PrismaClient();

const mockPasswords = ['12345', 'zxcvbnm', '452956'];

async function generateHashPass(password: string): Promise<string> {
	const salt = await genSalt(10);
	return await hash(password, salt);
}

async function main() {
	const users = await prisma.user.createManyAndReturn({
		data: [
			{ login: 'Alice', passwordHash: await generateHashPass(mockPasswords[0]) },
			{ login: 'Ячсмить', passwordHash: await generateHashPass(mockPasswords[1]) },
			{ login: 'Boba', passwordHash: await generateHashPass(mockPasswords[2]) },
		],
	});
	console.log(users);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async e => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
