import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/login/service/login.service';
import { LoginInputDto } from '../services/login/dto/loginInputDto';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() data: LoginInputDto) {
        console.log(data);
        return await this.authService.execute(data);
    }
}
