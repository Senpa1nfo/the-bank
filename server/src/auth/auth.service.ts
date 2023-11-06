import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {CreateUserDto} from "../user/dto/create.user.dto";
import * as bcrypt from 'bcryptjs';
import {LoginUserDto} from "../user/dto/loginUserDto";
import {TokenService} from "../token/token.service";

@Injectable()
export class AuthService {

    constructor(private userService: UserService,
                private tokenService: TokenService) {
    }

    async login(userDto: LoginUserDto) {
        const user = await this.userService.validateUser(userDto)
        const tokens = this.tokenService.generateTokens(user)
        await this.tokenService.saveToken(user.id, tokens.refreshToken)
        return {user, ...tokens}
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.getUserByEmail(userDto.email)

        if (candidate) {
            throw new HttpException('Користувач з таким email вже існує', HttpStatus.BAD_REQUEST)
        }

        const hashPassword = await bcrypt.hash(userDto.password, 5)
        const user = await this.userService.create({...userDto, password: hashPassword})
        const tokens = this.tokenService.generateTokens(user)
        await this.tokenService.saveToken(user.id, tokens.refreshToken)
        return {user, ...tokens}
    }

    async logout(refreshToken: string) {
        return await this.tokenService.removeToken(refreshToken)
    }

    async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
        }

        const userData = this.tokenService.validateRefreshToken(refreshToken)
        const tokenFromDB = this.tokenService.findToken(refreshToken)

        if (!tokenFromDB || !userData) {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
        }

        const user = await this.userService.getUserByEmail(userData.email)
        const tokens = this.tokenService.generateTokens(user)
        await this.tokenService.saveToken(user.id, tokens.refreshToken)
        return {user, ...tokens}
    }
}
