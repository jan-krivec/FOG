import {Controller, Get, Param} from '@nestjs/common';
import {UserDTO} from "./user.model";


@Controller('/user')
export class UserController {
    constructor() {}

    @Get('/getUser/:id')
    getUser(@Param('id') id: string): UserDTO {
        const user = new UserDTO();
        return user;
    }

    @Get('/getUserList')
    getUserList(): UserDTO[] {
        const user = new UserDTO();
        return [user];
    }
}
