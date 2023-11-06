import {Body, Controller, Get, Post, Req, Res} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {CreateUserDto} from "../user/dto/create.user.dto";
import {Request, Response} from "express";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {AuthDto} from "./dto/auth.dto";
import {LoginUserDto} from "../user/dto/loginUserDto";

@ApiTags('Авторизація')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {
    }

    @ApiOperation({summary: 'Вхід'})
    @ApiResponse({status: 200, type: AuthDto})
    @Post('/login')
    async login(@Body() userDto: LoginUserDto, @Res({ passthrough: true }) response: Response) {
        const user = await this.authService.login(userDto)
        response.cookie('refreshToken', user.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        return user
    }

    @ApiOperation({summary: 'Реєстрація'})
    @ApiResponse({status: 200, type: AuthDto})
    @Post('/registration')
    async registration(@Body() userDto: CreateUserDto, @Res({ passthrough: true }) response: Response) {
        const user = await this.authService.registration(userDto)
        response.cookie('refreshToken', user.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        return user
    }

    @ApiOperation({summary: 'Оновлення'})
    // @ApiResponse({status: 200, type: AuthDto})
    @Get('/refresh')
    async refresh(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
        const user = await this.authService.refresh(request.cookies['refreshToken'])
        response.cookie('refreshToken', user.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        return user
    }

    @ApiOperation({summary: 'Вихід'})
    // @ApiResponse({status: 200, type: AuthDto})
    @Post('/logout')
    async logout(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
        const token = await this.authService.logout(request.cookies['refreshToken'])
        response.clearCookie('refreshToken')
        return token
    }
}
