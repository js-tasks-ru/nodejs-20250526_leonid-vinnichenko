import { Module } from "@nestjs/common";
import { TasksModule } from "./tasks/tasks.module";
import { UsersModule } from "./users/users.module";
import { NotificationsModule } from "./notifications/notifications.module";

@Module({
  imports: [TasksModule, UsersModule, NotificationsModule],
})
export class AppModule {}
