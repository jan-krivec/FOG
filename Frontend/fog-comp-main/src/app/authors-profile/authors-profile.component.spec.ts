import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorsProfileComponent } from './authors-profile.component';

describe('AuthorsProfileComponent', () => {
  let component: AuthorsProfileComponent;
  let fixture: ComponentFixture<AuthorsProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorsProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorsProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
