import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { Task, TaskStatus } from "./task.model";

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: "1",
      title: "Task 1",
      description: "First task",
      status: TaskStatus.PENDING,
    },
    {
      id: "2",
      title: "Task 2",
      description: "Second task",
      status: TaskStatus.IN_PROGRESS,
    },
    {
      id: "3",
      title: "Task 3",
      description: "Third task",
      status: TaskStatus.COMPLETED,
    },
    {
      id: "4",
      title: "Task 4",
      description: "Fourth task",
      status: TaskStatus.PENDING,
    },
    {
      id: "5",
      title: "Task 5",
      description: "Fifth task",
      status: TaskStatus.IN_PROGRESS,
    },
  ];

  getFilteredTasks(
    status?: TaskStatus,
    page?: number,
    limit?: number,
    sortBy?: string,
  ): Task[] {
    if (page !== undefined && (!Number.isInteger(page) || page <= 0)) {
      throw new BadRequestException("Page should be a positive integer");
    }

    if (limit !== undefined && (!Number.isInteger(limit) || limit <= 0)) {
      throw new BadRequestException("Limit should be a positive integer");
    }

    let filteredTasks = [...this.tasks];

    if (status) {
      filteredTasks = filteredTasks.filter((task) => task.status === status);
    }

    if (sortBy) {
      switch (sortBy.toLowerCase()) {
        case "title":
          filteredTasks.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case "status":
          filteredTasks.sort((a, b) => a.status.localeCompare(b.status));
          break;
        default:
          throw new BadRequestException(
            'Invalid sortBy parameter. Use "title" or "status"',
          );
      }
    }

    if (page !== undefined && limit !== undefined && page > 0 && limit > 0) {
      const startIndex = (page - 1) * limit;
      filteredTasks = filteredTasks.slice(startIndex, startIndex + limit);
      return filteredTasks;
    }

    if (filteredTasks.length === 0) {
      throw new NotFoundException("No tasks found matching the criteria");
    }

    return filteredTasks;
  }
}
