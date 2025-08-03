import { Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/register/dto/register.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
    async getUsers() {
        return await User.findAll();
    }

    async addUser(soldier: RegisterDto) {
        return await User.create(soldier);
    }

    async findOne(name: string) {
        return await User.findOne({ where: { name } });
    }
}
