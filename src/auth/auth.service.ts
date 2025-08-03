import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) { }
    async signIn(name: string, pass: string): Promise<string> {
        const soldier: any = await this.usersService.findOne(name);
        if (!soldier.password) {
            throw new BadRequestException('Password is required');
        }
        const isMatch = await bcrypt.compare(pass, soldier.password);
        if (!isMatch) {
            throw new UnauthorizedException();
        }
        const payload = { id: soldier.id, name: soldier.name, role: soldier.role };
        let token: string = '';
        try {
            token = await this.jwtService.signAsync(payload);
        } catch (error) {
            console.log("err", error);
            throw new UnauthorizedException("Invalid token generation");
        }
        return token;
    }
}
