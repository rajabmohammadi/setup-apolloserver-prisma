import { prismaDriver } from "../config/prisma.driver";
let user = prismaDriver("user")
class UserModel {
    async findOne(query: any) {
        return await user.findOne(query);
    }
    async findMany() {
        return await user.findMany();
    }
}
export default new UserModel();