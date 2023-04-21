import {Controller, Get, Param} from '@nestjs/common';
import {ArticleDTO} from "./article.model";
import {ArticleService} from "./article.service";


@Controller('/article')
export class ArticleController {
    constructor(private articleService: ArticleService) {}

    @Get('/getArticle/:id')
    getArticle(@Param('id') id: string): ArticleDTO {
        const article = new ArticleDTO();
        return article;
    }

    @Get('/getArticleList')
    getArticleList(): ArticleDTO[] {
        const article = new ArticleDTO();
        return [article];
    }
}
