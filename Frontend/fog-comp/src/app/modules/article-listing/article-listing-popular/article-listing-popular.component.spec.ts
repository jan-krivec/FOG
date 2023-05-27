import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleListingPopularComponent } from './article-listing-popular.component';

describe('ArticleListingPopularComponent', () => {
  let component: ArticleListingPopularComponent;
  let fixture: ComponentFixture<ArticleListingPopularComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleListingPopularComponent]
    });
    fixture = TestBed.createComponent(ArticleListingPopularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
