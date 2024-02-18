import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { URLModule } from './urls/url.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
    }),
    URLModule,
  ],
})
export class AppModule {}
