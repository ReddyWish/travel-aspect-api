import { createServer } from 'node:http';
import { createSchema, createYoga } from 'graphql-yoga';
import { createContext } from './context';

function main() {
  const yoga = createYoga({
    context: createContext,
  });
  const server = createServer(yoga);
  server.listen(4000, () => {
    console.info('Server is running on http://localhost:4000/graphql');
  });
}

main();
