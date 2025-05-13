import { ApiProperty } from '@nestjs/swagger';

export class GetCookieResponseDto {
  @ApiProperty({
    description: 'Indicates if the operation was successful',
    example: true
  })
  success: boolean;

  @ApiProperty({
    description: 'Indicates if the cookie was received from the client',
    example: true
  })
  cookieReceived: boolean;

  @ApiProperty({
    description: 'The value of the cookie',
    example: 'secure-value-2023-07-20T12:34:56.789Z'
  })
  cookieValue: string;
} 