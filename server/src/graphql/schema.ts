import { gql } from "apollo-server-core";

export const typeDefs = gql`
    type User{
        id: String
        name: String
        username: String
        
    }
    type Query {
        users: [User]!
    }
`;
