import {User} from "../../user/user.model";
import {ApiProperty} from "@nestjs/swagger";

export class AuthDto {

    @ApiProperty({
        example: {
            "id": 1,
            "name": "Кушнір Єгор",
            "email": "user@email.com",
            "password": "12345678",
            "salary": 10000,
            "bankId": 1
        },
        description: 'Користувач'
    })
    readonly user: User;

    @ApiProperty({example: 'token', description: 'JWT token'})
    readonly token: string;
}