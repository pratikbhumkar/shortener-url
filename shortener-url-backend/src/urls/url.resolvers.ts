import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { URLService } from './url.service';
import { URL, NewURL } from 'src/graphql.schema';

@Resolver('URL')
export class URLResolvers {
  constructor(private readonly URLService: URLService) {}

  @Query('URL')
  async URL(@Args('shortURL') args: string): Promise<URL> {
    return this.URLService.findOne(args);
  }

  @Mutation('createURL')
  async create(@Args('input') args: NewURL): Promise<URL> {
    const createdURL = await this.URLService.create(args);
    return createdURL;
  }

  @Mutation('deleteURL')
  async delete(@Args('longURL') args: string): Promise<URL> {
    return this.URLService.delete(args);
  }
}
