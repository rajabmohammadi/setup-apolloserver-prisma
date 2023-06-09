import bcrypt from "bcrypt";
import { GraphQLError } from 'graphql';
import prisma from "../config/database";
import authMiddleware from "../middleware/auth.middleware";
import usersModel from "../models/users.model";
import Auth from "../services/jwt.service";
const resolvers = {
    Query: {
        users: async () => {
            // return usersModel.findMany("user")
            return await prisma.user.findMany();
        }
    },
    Mutation: {
        async register(_, { body: { email, password, firstName, lastName } }) {
            try {
                let oldUser = await usersModel.findOne({
                    where: {
                        email: email
                    }
                })
                if (oldUser) {
                    throw new GraphQLError('User Already Exist', {
                        extensions: {
                            code: 'BAD_REQUEST',
                        },
                    });
                }
                let encryptPassword = await bcrypt.hash(password, 10)
                const user = await prisma.user.create({
                    data: {
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        password: encryptPassword,
                        roles: "ADMIN"
                    }
                })
                let token = await Auth.createJWT(user)
                return { user, token }
            } catch (error) {
                throw new Error(error.message)
            }
        },

        async login(_, { body: { email, password } }, contextValue) {
            try {
                let userData: any = await authMiddleware.validAccessToken(contextValue);
                if (!userData || !userData.roles.includes('admin')) return null;
                const user = await prisma.user.findUnique({ where: { email: email } })
                if (user && (await bcrypt.compare(password, user.password))) {
                    let token = await Auth.createJWT(user)
                    return { token, user };
                } else {
                    throw new Error('User Not Found')
                }
            } catch (error) {
                throw new Error(error.message)
            }
        }
    }

}
export default resolvers;