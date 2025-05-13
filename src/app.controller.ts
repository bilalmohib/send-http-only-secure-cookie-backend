import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiCookieAuth } from '@nestjs/swagger';
import { AppService } from './app.service';
import { SetCookieResponseDto, GetCookieResponseDto } from './dto/cookie-response.dto';

@ApiTags('Cookies')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Default endpoint' })
  @ApiResponse({ status: 200, description: 'Returns a hello message' })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiOperation({ summary: 'Set HTTP-only secure cookie' })
  @ApiResponse({ 
    status: 200, 
    description: 'Sets an HTTP-only secure cookie and returns success message',
    type: SetCookieResponseDto
  })
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

  @ApiCookieAuth('secretToken')
  @ApiOperation({ summary: 'Get HTTP-only secure cookie' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns the value of the HTTP-only secure cookie',
    type: GetCookieResponseDto
  })
  @Get('get-cookie')
  getCookie(@Req() request: Request): GetCookieResponseDto {
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
