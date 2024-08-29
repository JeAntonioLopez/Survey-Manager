import { User } from "../../entities/user.entity";



export const createUser = async (email: string, password: string) => {
    const user = new User();
    user.email = email;
    user.password = password;
    await user.save();
    return ({ user: user });
};