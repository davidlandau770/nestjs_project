import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
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
    @Roles('soldier', 'commander')
    @Get('me')
    getMyProfile(@Req() req: Request) {
        return { message: 'This is your profile' };
    }

    @Get('public')
    getPublicInfo() {
        return { message: 'Public access' };
    }

    // @Post
    // addUser() {
    //     this.usersService.addUser(solider : RegisterDto);
    // }
}