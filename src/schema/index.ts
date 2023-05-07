import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';

const typeDefs = loadSchemaSync('./**/*.graphql', {
    // load files and merge them into a single schema object
    loaders: [new GraphQLFileLoader()]
})
export default typeDefs;