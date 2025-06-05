import { Module } from "@nestjs/common";
import {
  NotificationsService,
  NotificationsConfig,
} from "./notifications.service";

const notificationsConfig: NotificationsConfig = {
  senderEmail: "noreply@company.com",
  smsGateway: "sms.gateway.local",
  logFilePath: "logs/notifications.log",
};

@Module({
  providers: [
    {
      provide: "NOTIFICATIONS_CONFIG",
      useValue: notificationsConfig,
    },
    NotificationsService,
  ],
  exports: [NotificationsService],
})
export class NotificationsModule {}
