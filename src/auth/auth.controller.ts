import { Controller, Get, Post, Header, Body, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterSchema, LoginSchema } from '@/schemas';
import { Auth } from '@app/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  login(@Body() data: LoginSchema) {
    return this.authService.login(data);
  }

  @Post('register')
  register(@Body() data: RegisterSchema) {
    return this.authService.register(data);
  }

  @Get('qrcode/:id/image')
  @Header('content-type', 'image/png')
  qrcodeImage() {
    return this.authService.getQrcodeImage();
  }
  @Get('qrcode')
  qrcode() {
    return this.authService.getQrcode();
  }

  @Get('qrcode/:id/scan_info')
  scan(@Param('token') token: string) {
    return this.authService.qrcodeScanInfo(token);
  }

  @Get('scan/:id')
  @Auth()
  verifyScan() {
    return {
      tets: 1,
    };
  }
}
