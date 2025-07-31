import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class RegisterService {
  constructor(private usersService: UsersService) { }

  async register(body: RegisterDto) {
    if (!body.name || !body.password) {
      return { error: 'You must enter a valid name and password.' }
    }
    const exists = await this.usersService.findOne(body.name);
    if (exists) {
      return { error: 'Username already exists.' };
    }
    // const newSoldier = { ...body, role: "soldier" }
    this.usersService.addUser(body);
    return { message: 'User registered', user: body.name };
  }
}
