import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "../graphql/schema";
import { resolvers } from "../graphql/resolvers";
import { createContext } from "../graphql/context";


// const apolloServer = new ApolloServer({typeDefs,resolvers});

const gqlServer = new ApolloServer({
    typeDefs,
    resolvers,
    context:createContext,
  });


  export default gqlServer;
