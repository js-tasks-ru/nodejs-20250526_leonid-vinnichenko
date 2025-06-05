import { Module } from "@nestjs/common";
import { TasksModule } from "./tasks/tasks.module";
import { APP_PIPE } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";

@Module({
  imports: [TasksModule],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
