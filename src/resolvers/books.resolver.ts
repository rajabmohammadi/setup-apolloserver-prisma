import prisma from "../config/database";
import authMiddleware from "../middleware/auth.middleware";
const resolvers = {
    Query: {
        books: () => {
            return prisma.book.findMany();
        },
    },
    Mutation: {
        addBook: async (_, args, contextValue) => {
            let userData: any = await authMiddleware.validAccessToken(contextValue);
            if (!userData || !userData.roles.includes('admin')) return null;
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