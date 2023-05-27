export class JournalSubmitted {
  articleId: number | undefined | null = null;
  author: string | undefined | null = null;
  title: string | undefined | null = null;
}

export class JournalRevision {
  articleId: number | undefined | null = null;
  author: string | undefined | null = null;
  title: string | undefined | null = null;
}

export class JournalReviewed {
  articleId: number | undefined | null = null;
  reviewer: string | undefined | null = null;
  score: number | undefined | null = null;
  comment: string | undefined | null = null;
}

export class JournalPublished {
  articleId: number | undefined | null = null;
  editor: string | undefined | null = null;
  title: string | undefined | null = null;
}

export class JournalDenied {
  articleId: number | undefined | null = null;
  editor: string | undefined | null = null;
  title: string | undefined | null = null;
}
