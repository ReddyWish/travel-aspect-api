import { GraphQLScalarType } from 'graphql';
export const File = new GraphQLScalarType({
  name: 'File',
  description: 'File description',
  serialize: (value) => {
    return value;
  },
  parseValue: (value) => {
    return value;
  },
  parseLiteral: (ast) => {
    throw new Error('File scalar literal not implemented');
  },
});
