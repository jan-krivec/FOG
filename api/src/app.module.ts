import { Module } from '@nestjs/common';
import {ArticleController} from "./controller/article/article.controller";
import {UserController} from "./controller/user/user.controller";
import {ArticleService} from "./controller/article/article.service";
import {UserService} from "./controller/user/user.service";

@Module({
  imports: [],
  controllers: [ArticleController, UserController],
  providers: [ArticleService, UserService],
})
export class AppModule {}
