import { BadRequestException, Injectable } from '@nestjs/common';
import { URL } from '@prisma/client';
import { NewURL } from 'src/graphql.schema';
import { PrismaService } from '../prisma/prisma.service';
import { uniqueExtensionCreator } from '../services/uniqueExtensionCreator';

@Injectable()
export class URLService {
  constructor(private prisma: PrismaService) { }

  async findOne(shortURL: string): Promise<URL | null> {
    return this.prisma.uRL.findUnique({
      where: {
        shortURL,
      },
    });
  }

  async create(input: NewURL): Promise<URL> {
    const uniqueExtension = uniqueExtensionCreator();
    const shortURL = uniqueExtension;

    try {
      const dataObject = { longURL: input.longURL, shortURL: shortURL };
      return await this.prisma.uRL.create({ data: dataObject });
    } catch (error) {
      if (error.code === 'P2002' && error.meta && error.meta.target) {
        const targetField = error.meta.target.join(', ');
        throw new BadRequestException(`Duplicate entry for field(s): ${targetField}`);
      }
      throw error;
    }
  }

  async delete(longURL: string): Promise<URL> {
    return this.prisma.uRL.delete({
      where: {
        longURL,
      },
    });
  }
}
