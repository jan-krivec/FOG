import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishArticleComponent } from './publish-article.component';

describe('PublishArticleComponent', () => {
  let component: PublishArticleComponent;
  let fixture: ComponentFixture<PublishArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublishArticleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublishArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
