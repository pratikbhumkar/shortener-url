import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { URLModule } from './urls/url.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLError, GraphQLFormattedError } from 'graphql';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
      formatError: (error: GraphQLError) => {        
        const graphQLFormattedError: GraphQLFormattedError = {
          message: error?.message,
        };
        return graphQLFormattedError;
      },
    }),
    URLModule,
  ],
})
export class AppModule {}
