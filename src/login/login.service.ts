import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LoginService {
    constructor(private usersService: UsersService, private authService: AuthService) { }
    async login(name: string, password: string): Promise<{ token?: string, error?: string }> {
        const checkIfExists = name && password;
        if (!checkIfExists) {
            return { error: 'You must enter a valid name and password.' }
        }
        const exists = await this.usersService.findOne(name);
        if (!exists) {
            return { error: 'Incorrect username or password.' };
        }
        
        let token: string;
        try {
            token = await this.authService.signIn(name, password);
        } catch (error) {
            return { error: error.message || error };
        }
        return { token };
    }
}

