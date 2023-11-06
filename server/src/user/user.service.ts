import {Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "./dto/create.user.dto";
import {User} from "./user.model";
import {InjectModel} from "@nestjs/sequelize";
import {LoginUserDto} from "./dto/loginUserDto";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {

    constructor(@InjectModel(User) private userRepository: typeof User) {
    }

    async create(userDto: CreateUserDto) {
        return await this.userRepository.create(userDto);
    }

    async getAll() {
        return await this.userRepository.findAll({include: {all: true}});
    }

    async getUserByEmail(email: string) {
        return await this.userRepository.findOne({where: {email}});
    }

    async validateUser(userDto: LoginUserDto) {
        const user = await this.getUserByEmail(userDto.email);
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if (user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({message: 'Некоректний email або пароль'})
    }
}
