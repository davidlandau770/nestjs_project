import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

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
    const hash = await bcrypt.hash(body.password, 10);    
    const newSoldier = { name: body.name, password: hash }
    if (body.email) {
      newSoldier['email'] = body.email
    }
    this.usersService.addUser(newSoldier);
    return { message: 'User registered', user: body.name };
  }
}
