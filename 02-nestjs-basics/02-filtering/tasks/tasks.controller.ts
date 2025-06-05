import {
  Controller,
  Get,
  Query,
  ParseIntPipe,
  ParseEnumPipe,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TaskStatus } from "./task.model";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks(
    @Query("status", new ParseEnumPipe(TaskStatus, { optional: true }))
    status?: TaskStatus,
    @Query("page", new ParseIntPipe({ optional: true })) page?: number,
    @Query("limit", new ParseIntPipe({ optional: true })) limit?: number,
    @Query("sortBy") sortBy?: string,
  ) {
    return this.tasksService.getFilteredTasks(status, page, limit, sortBy);
  }
}
