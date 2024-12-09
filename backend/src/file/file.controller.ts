import { Controller, Get, Header, UseGuards } from '@nestjs/common';
import { FileService } from './file.service';
import { JwtAuthGuard } from 'src/guards/jwt.guard';

@Controller('file')
export class FileController {
	constructor(private readonly fileService: FileService) {}

	@Get('download')
	@UseGuards(JwtAuthGuard)
	@Header('Content-Type', 'file/pdf')
	@Header('Content-Disposition', 'attachment; filename="certificate.pdf"')
	async downloadFile() {
		return await this.fileService.getFile();
	}
}
