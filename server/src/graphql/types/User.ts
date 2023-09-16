import { extendType, nonNull, objectType, stringArg } from "nexus";
import {Post} from './Post'

export const User = objectType({
    name: 'User',
    definition(t){
        t.string('id');
        t.string('name');
        t.string('username');
        t.string('email');
        t.list.field('posts',{
            type:Post,  
            async resolve(_parent,_args,ctx) {
                return await ctx.prisma.user
                    .findUnique({
                        where:{
                            id: _parent.id as string
                        },
                    })
                    .posts();
            }

        })
    }
})


export const UserQuery = extendType({
    type:'Query',
    definition(t){
        t.nonNull.list.field('users',{
            type:User,
            resolve(_parent,_args, ctx){
                return ctx.prisma.user.findMany();
            }
        })
    }
})

export const UserMutation = extendType({
    type:'Mutation',
    definition(t){
        t.nonNull.field('createUser',{
            type:User,
            args:{
                name: nonNull(stringArg()),
                username: nonNull(stringArg()),
                email: nonNull(stringArg()),
            },
            async resolve(_parent, _args, ctx){
                const {name, username, email} = _args;
                return await ctx.prisma.user.create({
                    data:{
                        name,
                        username,
                        email
                    }
                })
            }
        })
    }
})

//  delete user

export const UserDelete = extendType({
    type:'Mutation',
    definition(t){
        t.nonNull.field('deleteUser',{
            type:User,
            args:{
                id: nonNull(stringArg()),
            },
            async resolve(_parent, args, ctx){
                const {id} = args;
                return await ctx.prisma.user.delete({
                    where:{
                        id
                    },
                    include:{
                        posts:true
                    }
                })
            }
        })
    }
})


// delete user with posts

export const UserDeleteWithPosts = extendType({
    type:'Mutation',
    definition(t){
        t.nonNull.field('deleteUserWithPosts',{
            type:User,
            args:{
                id: nonNull(stringArg()),
            },
            async resolve(_parent, args, ctx){
                const {id} = args;
                return await ctx.prisma.user.delete({
                    where:{
                        id
                    },
                    include:{
                        posts:true
                    }
                })
            }
        })
    }
})


