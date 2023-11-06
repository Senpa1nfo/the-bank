import {Injectable} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {Token} from "./token.model";
import {InjectModel} from "@nestjs/sequelize";
import {User} from "../user/user.model";

@Injectable()
export class TokenService {

    constructor(@InjectModel(Token) private tokenRepository: typeof Token,
                private jwtService: JwtService) {
    }

    generateTokens(user: User) {
        const payload = {id: user.id, name: user.name, email: user.email}
        return {
            refreshToken: this.jwtService.sign(payload, {expiresIn: '30d'}),
            accessToken: this.jwtService.sign(payload, {expiresIn: '60m'})
        }
    }

    validateRefreshToken(token: string) {
        try {
            return this.jwtService.verify(token, {secret: 'SECRET'});
        } catch (error) {
            return null;
        }
    }

    async saveToken(userId: number, refreshToken: string) {
        const tokenData = await this.tokenRepository.findOne({where: {userId}, include: {all: true}});
        if (tokenData) {
            return await tokenData.update({
                refreshToken: refreshToken
            })
        }
        return await this.tokenRepository.create({userId: userId, refreshToken});
    }

    async removeToken(refreshToken: string) {
        return await this.tokenRepository.destroy({where: {refreshToken}})
    }

    async findToken(refreshToken: string) {
        return await this.tokenRepository.findOne({where: {refreshToken: refreshToken}, include: {all: true}})
    }
}
