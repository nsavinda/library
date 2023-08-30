import { objectType, extendType } from "nexus";
import { User } from "./User";

export const Post = objectType({
    name: 'Post',
    definition(t){
        t.string('id');
        t.string('title');
        t.string('userId')
        t.field('user',{
            type:User,  
            async resolve(_parent,_args,ctx) {
                return await ctx.prisma.post
                    .findUnique({
                        where:{
                            id: _parent.id as string
                        },
                    })
                    .user();
            }

        })
    }
})


export const PostQuery = extendType({
    type:'Query',
    definition(t){
        t.nonNull.list.field('posts',{
            type:'Post',
            resolve(_parent,_args, ctx){
                return ctx.prisma.post.findMany();
            }
        })
    }
})

////////////////////////////////////////////////////



// import { objectType, extendType } from "nexus";
// import { User } from "./User";

// export const Post = objectType({
//     name: 'Post',
//     definition(t){
//         t.string('id');
//         t.string('title');
//         t.field('user', {
//             type: User,
//             async resolve(_parent, _args, ctx) {
//                 const post = await ctx.prisma.post.findUnique({
//                     where: {
//                         id: _parent.id as string,
//                     },
//                 });

//                 if (!post) {
//                     return null;
//                 }

//                 return ctx.prisma.user.findUnique({
//                     where: {
//                         id: post.userId, // Replace with the correct field to access the user ID in your Post model
//                     },
//                 });
//             },
//         });
//     }
// });

// export const PostQuery = extendType({
//     type: 'Query',
//     definition(t){
//         t.nonNull.list.field('posts',{
//             type: 'Post',
//             resolve(_parent, _args, ctx){
//                 return ctx.prisma.post.findMany();
//             }
//         });
//     }
// });

/////////////////////////////////////////////////////////////////////

// import { objectType, extendType } from "nexus";
// import { User } from "./User";

// export const Post = objectType({
//     name: 'Post',
//     definition(t) {
//         t.string('id');
//         t.string('title');
//         t.list.field('user', {
//             type: User,
//             async resolve(_parent, _args, ctx) {
//                 const post = await ctx.prisma.post.findUnique({
//                     where: {
//                         id: _parent.id as string,
//                     },
//                 });

//                 if (!post) {
//                     return null;
//                 }

//                 const user = await ctx.prisma.user.findUnique({
//                     where: {
//                         id: post.userId, // Replace with the correct field to access the user ID in your Post model
//                     },
//                 });

//                 return user;
//             },
//         });
//     }
// });

// export const PostQuery = extendType({
//     type: 'Query',
//     definition(t) {
//         t.nonNull.list.field('posts', {
//             type: Post,
//             resolve(_parent, _args, ctx) {
//                 return ctx.prisma.post.findMany();
//             }
//         });
//     }
// });
