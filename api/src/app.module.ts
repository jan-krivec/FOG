import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import {UserController} from "./controller/user/user.controller";
import {UserService} from "./controller/user/user.service";
import {IpfsService} from "./ipfs.service";
import {JournalController} from "./controller/journal/journal.controller";
import {JournalService} from "./controller/journal/journal.service";

@Module({
  imports: [],
  controllers: [UserController, JournalController],
  providers: [AppService, UserService, JournalService, IpfsService],
})
export class AppModule {}
