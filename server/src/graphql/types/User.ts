import { extendType, nonNull, objectType, intArg, stringArg } from "nexus";
import { Post } from './Post'

export const User = objectType({
    name: 'User',
    definition(t){
        t.int('id'); // Change to int
        t.string('name');
        t.string('username');
        t.string('email');
        t.list.field('posts', {
            type: Post,
            async resolve(_parent, _args, ctx) {
                return await ctx.prisma.user
                    .findUnique({
                        where: {
                            id: _parent.id as number // Change to number
                        },
                    })
                    .posts();
            }
        })
    }
})

export const UserQuery = extendType({
    type: 'Query',
    definition(t){
        t.nonNull.list.field('users', {
            type: User,
            resolve(_parent, _args, ctx){
                return ctx.prisma.user.findMany();
            }
        })
    }
})

export const UserCreate = extendType({
    type: 'Mutation',
    definition(t){
        t.nonNull.field('createUser', {
            type: User,
            args: {
                name: nonNull(stringArg()),
                username: nonNull(stringArg()),
                email: nonNull(stringArg()),
            },
            async resolve(_parent, args, ctx){
                const { name, username, email } = args;
                return await ctx.prisma.user.create({
                    data: {
                        name,
                        username,
                        email
                    }
                })
            }
        })
    }
})

export const UserDelete = extendType({
    type: 'Mutation',
    definition(t){
        t.nonNull.field('deleteUser', {
            type: User,
            args: {
                id: nonNull(intArg()) // Change to intArg
            },
            async resolve(_parent, args, ctx){
                const { id } = args;
                return await ctx.prisma.user.delete({
                    where: {
                        id
                    },
                    include: {
                        posts: true
                    }
                })
            }
        })
    }
})
