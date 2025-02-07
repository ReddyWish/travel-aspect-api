import { createServer } from 'node:http';
import { createSchema, createYoga } from 'graphql-yoga';
import { createContext } from './context';
import { resolvers } from './schema/resolvers.generated';
import { typeDefs } from './schema/typeDefs.generated';

function main() {
  const yoga = createYoga({
    schema: createSchema({ typeDefs, resolvers }),
    context: createContext,
  });
  const server = createServer(yoga);
  server.listen(4000, () => {
    console.info('Server is running on http://localhost:4000/graphql');
  });
}

main();
