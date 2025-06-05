import {
  Injectable,
  BadRequestException,
  Inject,
  OnModuleDestroy,
} from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";

export interface NotificationsConfig {
  senderEmail: string;
  smsGateway: string;
  logFilePath: string;
}

@Injectable()
export class NotificationsService implements OnModuleDestroy {
  private logStream: fs.WriteStream;

  constructor(
    @Inject("NOTIFICATIONS_CONFIG")
    private readonly config: NotificationsConfig,
  ) {
    const dir = path.dirname(this.config.logFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    this.logStream = fs.createWriteStream(this.config.logFilePath, {
      flags: "a",
    });
  }

  private log(message: string) {
    console.log(message);
    this.logStream.write(message + "\n");
  }

  sendEmail(to: string, subject: string, message: string): void {
    if (!to || to.trim() === "") {
      throw new BadRequestException("Invalid email address");
    }
    const logMsg = `Email sent to ${to}: [${subject}] ${message}`;
    this.log(logMsg);
  }

  sendSMS(to: string, message: string): void {
    if (!to || to.trim() === "") {
      throw new BadRequestException("Invalid phone number");
    }
    const logMsg = `SMS sent to ${to}: ${message}`;
    this.log(logMsg);
  }

  onModuleDestroy() {
    this.logStream.end();
  }
}
