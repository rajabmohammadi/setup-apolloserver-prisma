import prisma from "../config/database";
const resolvers = {
    Query: {
        books: () => {
            return prisma.book.findMany();
        },
    },
    Mutation: {
        addBook: (_, args, contextValue) => {
            console.log("token", contextValue)
            return prisma.book.create({
                data: {
                    title: args.title,
                    author: args.author
                }
            })

        }
    }
};
export default resolvers;