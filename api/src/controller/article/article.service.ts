import { Injectable } from '@nestjs/common';

@Injectable()
export class ArticleService {
    getArticle(): string {
        return 'Hello World!';
    }
}
