import { ApiProperty } from '@nestjs/swagger';

export class SetCookieResponseDto {
  @ApiProperty({
    description: 'Indicates if the operation was successful',
    example: true
  })
  success: boolean;

  @ApiProperty({
    description: 'A message describing the result of the operation',
    example: 'Cookie set successfully'
  })
  message: string;
}

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
    example: 'very-secure-value'
  })
  cookieValue: string;
} 