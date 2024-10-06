import { PartialType } from '@nestjs/mapped-types';
import { SendNotificationDto } from './create-notification.dto';


export class UpdateNotificationDto extends PartialType(SendNotificationDto) {}
