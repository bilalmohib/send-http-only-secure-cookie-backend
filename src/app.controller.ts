import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('set-cookie')
  setCookie(@Res() response: Response) {
    // Set an HTTP-only secure cookie that can't be accessed by JavaScript
    response.cookie('secretToken', 'very-secure-value', {
      httpOnly: true,
      secure: true, // Requires HTTPS in production
      sameSite: 'none', // Needed for cross-domain requests
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      signed: true, // Sign the cookie using the secret from cookieParser
    });

    return response.json({ success: true, message: 'Cookie set successfully' });
  }

  @Get('get-cookie')
  getCookie(@Req() request: Request) {
    // Access the signed cookie (request.signedCookies)
    const secretToken = request.signedCookies.secretToken;
    
    console.log('Received HTTP-only secure cookie:', secretToken);
    
    return { 
      success: true, 
      cookieReceived: !!secretToken,
      cookieValue: secretToken 
    };
  }
}
