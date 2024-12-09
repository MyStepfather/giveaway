import { Injectable, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FileService {
	constructor(private readonly prisma: PrismaService) {}
	async getFile(): Promise<StreamableFile> {
		const file = createReadStream(join(process.cwd(), 'src/file/certificates/certificate.pdf'));
		return new StreamableFile(file);
	}
}
