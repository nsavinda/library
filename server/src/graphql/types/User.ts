import { extendType, objectType } from "nexus";
import {Post} from './Post'

export const User = objectType({
    name: 'User',
    definition(t){
        t.string('id');
        t.string('name');
        t.string('username');
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