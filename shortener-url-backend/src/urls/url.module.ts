import { Module } from '@nestjs/common';
import { URLResolvers } from './url.resolvers';
import { URLService } from './url.service';
import { PrismaModule } from '../prisma/prisma.module';
import { URLController } from './url.controller';

@Module({
  controllers: [URLController],
  providers: [URLResolvers, URLService],
  imports: [PrismaModule],
})
export class URLModule {}
