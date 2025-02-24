import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { FileModule } from './file/file.module';

@Module({
	imports: [UserModule, AuthModule, ConfigModule.forRoot(), FileModule],
	controllers: [AppController],
	providers: [AppService, PrismaService],
})
export class AppModule {}
