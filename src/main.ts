import { createServer } from 'node:http';
import { createSchema, createYoga } from 'graphql-yoga';
import { createContext } from './context';
import { resolvers } from './schema/resolvers.generated';
import { typeDefs } from './schema/typeDefs.generated';
import express from 'express';
import path from 'node:path';

function main() {
  const app = express();
  const fileScalar = `scalar File`;

  app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

  const yoga = createYoga({
    schema: createSchema({
      typeDefs: [fileScalar, typeDefs],
      resolvers,
    }),
    context: createContext,
  });
  app.use('/graphql', yoga);
  const server = createServer(app);
  server.listen(4000, () => {
    console.info('Server is running on http://localhost:4000/graphql');
  });
}

main();
