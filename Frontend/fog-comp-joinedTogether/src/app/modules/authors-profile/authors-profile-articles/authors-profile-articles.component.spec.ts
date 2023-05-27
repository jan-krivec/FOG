import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorsProfileArticlesComponent } from './authors-profile-articles.component';

describe('AuthorsProfileArticlesComponent', () => {
  let component: AuthorsProfileArticlesComponent;
  let fixture: ComponentFixture<AuthorsProfileArticlesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorsProfileArticlesComponent]
    });
    fixture = TestBed.createComponent(AuthorsProfileArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
