export class ArticleDTO {
  articleId: number | undefined | null = null;
  title: string | undefined | null = null;
  description: string | undefined | null = null;
  keywords: string[] | undefined | null = null;
  ipfsLink: string | undefined | null = null;
  author: string | undefined | null = null;
  published: boolean | undefined | null = null;
  denied: boolean | undefined | null = null;
  editor: string | undefined | null = null;
  reviews: ReviewData[] | undefined | null = null
}

export class ReviewData {
  reviewer: string | undefined | null = null;
  score: number | undefined | null = null;
  comment: string | undefined | null = null;
}
