import { Injectable, NotFoundException } from "@nestjs/common";
import { Task } from "./task.model";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      throw new NotFoundException(`task with id: ${id} not found`);
    }
    return task;
  }

  createTask(taskDraft: Task): Task {
    const task: Task = {
      ...taskDraft,
      id: taskDraft.id || crypto.randomUUID(),
    };
    this.tasks.push(task);
    return task;
  }

  updateTask(id: string, update: Task): Task {
    const taskIndex = this.getTaskIndexById(id);
    const updatedTask = { ...this.tasks[taskIndex], ...update };
    this.tasks[taskIndex] = updatedTask;
    return updatedTask;
  }

  deleteTask(id: string): Task {
    const taskIndex = this.getTaskIndexById(id);
    const [deletedTask] = this.tasks.splice(taskIndex, 1);
    return deletedTask;
  }

  private getTaskIndexById(id: string): number {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return index;
  }
}
