import {Module} from '@nestjs/common';
import {TokenService} from "./token.service";
import {JwtModule} from "@nestjs/jwt";
import {SequelizeModule} from "@nestjs/sequelize";
import {Token} from "./token.model";

@Module({
    providers: [TokenService],
    imports: [
        SequelizeModule.forFeature([Token]),
        JwtModule.register({
            secret: 'SECRET',
            signOptions: {
                expiresIn: '24h'
            }
        })
    ],
    exports: [
        TokenService,
        JwtModule
    ],
})
export class TokenModule {
}
