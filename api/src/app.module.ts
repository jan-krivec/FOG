import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import {UserController} from "./controller/user/user.controller";
import {UserService} from "./controller/user/user.service";
import {IpfsService} from "./ipfs.service";
import {JournalController} from "./controller/journal/journal.controller";
import {JournalService} from "./controller/journal/journal.service";

@Module({
  imports: [ConfigModule.forRoot({
      envFilePath: '.development.env',
  })],
  controllers: [UserController, JournalController],
  providers: [AppService, UserService, JournalService, IpfsService],
})
export class AppModule {}
