
export const resolvers = {
    Query:{
        users: async (_parent: any, _args: any, ctx: any) => await ctx.prisma.user.findMany(),
        posts: async (_parent: any, _args: any, ctx: any) => await ctx.prisma.post.findMany()
    },

}


// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export const resolvers = {
//     Query: {
//         users: async (_parent: any, _args: any, ctx: any) => {
//             return await ctx.prisma.user.findMany();
//         },
//         posts: async (_parent: any, _args: any, ctx: any) => {
//             return await ctx.prisma.post.findMany();
//         }
//     }
// };


// export const resolvers = {
//     Query:{
//         users:()=> [
//             {
//                 id: '64eeeea91a99576d9fc5514d',
//                 name: 'Nirmal Savinda',
//                 username: 'nsavinda' 
//             },
//             {
//                 id: '64eeeeerer91a99576d9fc5514d',
//                 name: 'Nirmal',
//                 username: 'ns'
//             }
//         ]
//     }
// }