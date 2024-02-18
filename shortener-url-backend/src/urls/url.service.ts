import { Injectable } from '@nestjs/common';
import { URL } from '@prisma/client';
import { NewURL } from 'src/graphql.schema';
import { PrismaService } from '../prisma/prisma.service';
import { uniqueExtensionCreator } from 'src/services/uniqueExtensionCreator';

@Injectable()
export class URLService {
  constructor(private prisma: PrismaService) {}

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

    const dataObject:URL = {longURL: input.longURL, shortURL: shortURL};
    return this.prisma.uRL.create({
      data: dataObject,
    });
  }

  async delete(longURL: string): Promise<URL> {
    return this.prisma.uRL.delete({
      where: {
        longURL,
      },
    });
  }
}
