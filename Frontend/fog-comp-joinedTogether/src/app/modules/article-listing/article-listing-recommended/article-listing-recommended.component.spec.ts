import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleListingRecommendedComponent } from './article-listing-recommended.component';

describe('ArticleListingRecommendedComponent', () => {
  let component: ArticleListingRecommendedComponent;
  let fixture: ComponentFixture<ArticleListingRecommendedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleListingRecommendedComponent]
    });
    fixture = TestBed.createComponent(ArticleListingRecommendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
