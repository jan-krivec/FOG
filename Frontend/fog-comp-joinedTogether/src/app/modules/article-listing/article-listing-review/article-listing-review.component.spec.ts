import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleListingReviewComponent } from './article-listing-review.component';

describe('ArticleListingReviewComponent', () => {
  let component: ArticleListingReviewComponent;
  let fixture: ComponentFixture<ArticleListingReviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleListingReviewComponent]
    });
    fixture = TestBed.createComponent(ArticleListingReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
