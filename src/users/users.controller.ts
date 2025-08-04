import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }
    @UseGuards(AuthGuard)
    @Roles('commander')
    @Get()
    getUsers() {
        return this.usersService.getUsers();
    }

    @UseGuards(AuthGuard)
    @Roles('soldier')
    @Get('me')
    getMyProfile() {
        return { message: 'This is your profile private' };
    }

    @Get('public')
    getPublicInfo() {
        return { message: 'Public access' };
    }

}