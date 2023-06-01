import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleListingEditComponent } from './article-listing-edit.component';

describe('ArticleListingEditComponent', () => {
  let component: ArticleListingEditComponent;
  let fixture: ComponentFixture<ArticleListingEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleListingEditComponent]
    });
    fixture = TestBed.createComponent(ArticleListingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
