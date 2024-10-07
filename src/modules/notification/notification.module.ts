import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';

import { TaskController } from '../task/task.controller';

@Module({
  imports: [],
  exports: [NotificationService],
  controllers: [NotificationController,TaskController],
  providers: [NotificationService],
})
export class NotificationModule {}
