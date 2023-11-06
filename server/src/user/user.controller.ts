import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {CreateUserDto} from "./dto/create.user.dto";
import {UserService} from "./user.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./user.model";
import {JwtAuthGuard} from "../token/jwt-auth.guard";

@ApiTags('Користувач')
@Controller('user')
export class UserController {

    constructor(private userService: UserService) {
    }

    @ApiOperation({summary: 'Створення'})
    @ApiResponse({status: 200, type: [User]})
    @Post('/create')
    create(@Body() userDto: CreateUserDto) {
        return this.userService.create(userDto)
    }

    @ApiOperation({summary: 'Отримання усіх'})
    @ApiResponse({status: 200, type: [User]})
    @UseGuards(JwtAuthGuard)
    @Get('/get-all')
    getAll() {
        return this.userService.getAll();
    }
}
