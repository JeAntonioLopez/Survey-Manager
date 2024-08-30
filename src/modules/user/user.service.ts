import { CreateUserDTO } from "../../dto/user.module.dto";
import { User } from "../../entities/user.entity";

export const createUser = async (createUserDTO: CreateUserDTO) => {
    const user = new User();
    user.email = createUserDTO.email;
    user.password = createUserDTO.password;
    await user.save();
    return ({ user: user });
};