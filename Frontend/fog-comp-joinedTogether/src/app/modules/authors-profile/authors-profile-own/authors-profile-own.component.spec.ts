import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorsProfileOwnComponent } from './authors-profile-own.component';

describe('AuthorsProfileOwnComponent', () => {
  let component: AuthorsProfileOwnComponent;
  let fixture: ComponentFixture<AuthorsProfileOwnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorsProfileOwnComponent]
    });
    fixture = TestBed.createComponent(AuthorsProfileOwnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
