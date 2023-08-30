
export const resolvers = {
    Query:{
        users: async (_parent: any, _args: any, ctx: any) => await ctx.prisma.user.findMany()
    }
}


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