import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) { }
    async signIn(name: string, pass: string): Promise<string> {
        const soldier: any = this.usersService.findOne(name);

        if (soldier?.password !== pass) {
            throw new UnauthorizedException();
        }
        const payload = { id: soldier.id, name: soldier.name, role: soldier.role };
        // console.log("payload: ", payload, "user: ", user, "name: ", name, "pass: ", pass);
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
