import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthGuard } from '../../common/guards/local-auth.guard';
import { Public } from '../../common/decorators/public.decorator';
import { Auth } from '../../common/decorators/auth.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const data = await this.authService.register(registerDto);
    return {
        data,
        message: 'Đăng ký thành công',
    };
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any) {
    const data = await this.authService.login(req.user);
    return {
        data,
        message: 'Đăng nhập thành công',
    };
  }

  @Auth()
  @Get('me')
  getProfile(@CurrentUser() user: any) {
    return {
        data: user,
        message: 'Lấy thông tin người dùng thành công',
    };
  }
}