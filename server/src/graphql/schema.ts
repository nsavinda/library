import { makeSchema } from "nexus";
import { join } from "path";
import * as types from "./types"

export const schema = makeSchema({
    types,
    outputs: {
        typegen: join(
            process.cwd(),
            'node_modules',
            '@types',
            'nexus-typegen',
            'index.d.ts'
        ),
        schema: join(process.cwd(), 'src','graphql', 'schema.graphql'),
    },
    contextType: {
        export: 'Context',
        module: join(process.cwd(), 'src','graphql', 'context.ts')
    }
})











// import { gql } from "apollo-server-core";

// export const typeDefs = gql`
//     type User{
//         id: String
//         name: String
//         username: String
        
//     }
//     type Query {
//         users: [User]!
//     }
// `;
