# URL Shortener backend

This project gets the `longURLs`, saves on the database, shortens it. \
On receiving a request with the `short-url`, it redirects user to the `longURL`

### Installation

1. Install dependencies: `npm install`
2. Generate TypeScript type definitions for the GraphQL schema: `npm run generate:typings`
3. Create sqlite database and create tables: `npx prisma db push`
4. Start server: `npm run start:dev`

### Graphql Playground

When the application is running, you can go to [http://localhost:3000/graphql](http://localhost:3000/graphql) to access the GraphQL Playground.  See [here](https://docs.nestjs.com/graphql/quick-start#playground) for more.

### Endpoints

- This app has a regular graphql endpoint to communicate with the client so that the client can send requests with `longURLs` to be shortened
- This app has a regular endpoint `localhost:3000/url/<short-code>` that uses http redirect to redirect users to the original website or `longURL`.