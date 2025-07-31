import { Body, Controller, Post, Res } from '@nestjs/common';
import { LoginService } from './login.service';
import { Response } from 'express';

@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginService) { }

    @Post()
    async login(@Res() res: Response, @Body() body: { name: string, password: string }) {
        const result: any = await this.loginService.login(body.name, body.password);
        if (result.error) {
            return res.status(401).send({ error: result.error });
        }
        res.cookie("token", result.token, { httpOnly: true, sameSite: true })
        // res.setHeader('x-token', result.token);
        return res.status(200).send({ message: 'Login successful' });
    }
}
