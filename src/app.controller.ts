import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiCookieAuth } from '@nestjs/swagger';
import { AppService } from './app.service';
import { GetCookieResponseDto } from './dto/cookie-response.dto';

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

  @ApiCookieAuth('secretToken')
  @ApiOperation({ summary: 'Get HTTP-only secure cookie' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns the value of the HTTP-only secure cookie',
    type: GetCookieResponseDto
  })
  @Get('get-cookie')
  getCookie(@Req() request: Request, @Res() response: Response) {
    // Access the cookie from the request
    const secretToken = request.cookies.secretToken;
    
    console.log('Received HTTP-only secure cookie from frontend:', secretToken);
    console.log('All cookies:', request.cookies);
    
    // Return the cookie value in the response
    return response.json({ 
      success: true, 
      cookieReceived: !!secretToken,
      cookieValue: secretToken || 'No cookie found'
    });
  }
}
