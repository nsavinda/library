import { objectType, extendType, nonNull, stringArg } from "nexus";
import { Author } from "./Author";

export const Book = objectType({
    name:'Book',
    definition(t){
        t.string('id');
        t.string('title');
        t.string('isbn');
        t.string('publisher');
        t.string('authorId');
        t.field('author',{
            type:Author,
            async resolve(_parent,_args,ctx){
                return await ctx.prisma.book
                    .findUnique({
                        where:{
                            id: _parent.id as string
                        },
                    })
                    .author()
            }
        })
    }
})

export const BookQuery = extendType({
    type:'Query',
    definition(t){
        t.nonNull.list.field('books',{
            type:Book,
            resolve(_parent,_args,ctx){
                return ctx.prisma.book.findMany();
            }
        })
    }
})

export const BookMutation = extendType({
    type:'Mutation',
    definition(t){
        t.nonNull.field('createBook',{
            type:Book,
            args:{
                title: nonNull(stringArg()),
                isbn: nonNull(stringArg()),
                publisher: nonNull(stringArg()),
                authorId: nonNull(stringArg())
            },
            async resolve(_parent, args, ctx){
                const {title, isbn, publisher, authorId} = args;
                return await ctx.prisma.book.create({
                    data:{
                        title,
                        isbn,
                        publisher,
                        authorId
                    }
                })
            }
        })
    }
})


export const BookDeleteMutation = extendType({
    type:'Mutation',
    definition(t) {
        t.nonNull.field('deleteBook',{
            type:Book,
            args:{
                id: nonNull(stringArg()),
            },
            async resolve(_parent, args, ctx){
                const {id} = args;
                return await ctx.prisma.book.delete({
                    where:{
                        id: id
                    }
                })
            }
        })
    },
})