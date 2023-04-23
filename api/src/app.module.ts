import { Module } from '@nestjs/common';
import {JournalController} from "./controller/journal/journal.controller";
import {UserController} from "./controller/user/user.controller";
import {JournalService} from "./controller/journal/journal.service";
import {UserService} from "./controller/user/user.service";

@Module({
  imports: [],
  controllers: [JournalController, UserController],
  providers: [JournalService, UserService],
})
export class AppModule {}
