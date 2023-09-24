import { extendType, objectType, nonNull, stringArg, intArg } from "nexus";
import { Book } from "./Book";
import { Datetime } from "./_scalar/Datetime";

export const Author = objectType({
    name: "Author",
    definition(t) {
        t.int('id'); // Change to int
        t.string('name');
        t.field('dob', {
            type: Datetime,
        });
        t.list.field('books', {
            type: Book,
            async resolve(_parent, _args, ctx) {
                return await ctx.prisma.author
                    .findUnique({
                        where: {
                            id: _parent.id as number // Change to number
                        },
                    })
                    .books();
            }
        })
    }
})

export const AuthorQuery = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.list.field('authors', {
            type: Author,
            resolve(_parent, _args, ctx) {
                return ctx.prisma.author.findMany();
            }
        })
    }
})

export const AuthorCreate = extendType({
    type: 'Mutation',
    definition(t) {
        t.nonNull.field('createAuthor', {
            type: Author,
            args: {
                name: nonNull(stringArg()),
                dob: nonNull(stringArg()),
            },
            async resolve(_parent, _args, ctx) {
                const { name, dob } = _args;
                return await ctx.prisma.author.create({
                    data: {
                        name,
                        dob
                    }
                })
            }
        })
    }
})

export const AuthorDelete = extendType({
    type: 'Mutation',
    definition(t) {
        t.nonNull.field('deleteAuthor', {
            type: Author,
            args: {
                id: nonNull(intArg()) // Change to intArg
            },
            async resolve(_parent, _args, ctx) {
                const { id } = _args;
                return await ctx.prisma.author.delete({
                    where: {
                        id: id
                    }
                })
            }
        })
    }
})
