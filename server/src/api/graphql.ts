import { ApolloServer } from "apollo-server-express";
import { schema } from "../graphql/schema";
import { resolvers } from "../graphql/resolvers";
import { createContext } from "../graphql/context";


// const apolloServer = new ApolloServer({typeDefs,resolvers});

const gqlServer = new ApolloServer({
    schema,
    resolvers,
    context:createContext,
  });


  export default gqlServer;
