import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { makeExecutableSchema } from "@graphql-tools/schema";
import resolvers from "./resolvers/index";
import typeDefs from "./schema/index";
import errorHandler from './services/error.handler';

const schema = makeExecutableSchema({ typeDefs, resolvers });
async function startServer() {
    const server = new ApolloServer({
        schema,
        formatError: errorHandler
    });
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
    });
    console.log(`🚀 Server ready at: ${url}`);
}
startServer();

