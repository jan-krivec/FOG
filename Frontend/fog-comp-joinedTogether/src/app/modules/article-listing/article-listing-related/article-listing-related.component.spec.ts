import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleListingRelatedComponent } from './article-listing-related.component';

describe('ArticleListingRelatedComponent', () => {
  let component: ArticleListingRelatedComponent;
  let fixture: ComponentFixture<ArticleListingRelatedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleListingRelatedComponent]
    });
    fixture = TestBed.createComponent(ArticleListingRelatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
