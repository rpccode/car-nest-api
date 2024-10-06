import { IsNotEmpty, IsString } from 'class-validator';

export class SendNotificationDto {
  @IsNotEmpty()
  @IsString()
  token: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}
