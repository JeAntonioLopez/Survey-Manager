import { RegisterUserDTO, LoginDTO, ChangePasswordDTO } from '../../dto/auth.module.dto';
import { User } from '../../entities/user.entity';
import { HttpError } from '../../utils/httpErrorHandler';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';


const JWT_KEY = 'assdasfsa';
const SALT_ROUNDS = 10;
export const registerUser = async (registerUserDTO: RegisterUserDTO) => {
    const user = new User();
    user.email = registerUserDTO.email;
    user.password = await bcrypt.hash(registerUserDTO.password,SALT_ROUNDS);
    await user.save();
    return ({ user: user });
};

export const login = async (loginDTO: LoginDTO) => {
    const { email, password } = loginDTO;
    console.log(email, password);
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
        throw new HttpError('User not found', 404);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new HttpError('Invalid password', 401);
    }
    
    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_KEY, { expiresIn: '1h' });
    
    return { token };
};

export const changuePassword = async (changuePasswordDTO: ChangePasswordDTO) => {
    const user = await User.findOne({ where: {email: changuePasswordDTO.email} });
    if (!user) {
        throw new HttpError('User not found', 404);
    }
    user.password = await bcrypt.hash(changuePasswordDTO.newPassword,SALT_ROUNDS);
    await user.save();
    return { user };
};
