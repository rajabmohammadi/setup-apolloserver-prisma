import prisma from "./database";
export function prismaDriver(schema: any) {
    return {
        findOne: async (query) => {
            return await prisma[schema].findUnique(query);
        },
        findMany: async () => {
            return await prisma[schema].findMany();
        }
    }

}


