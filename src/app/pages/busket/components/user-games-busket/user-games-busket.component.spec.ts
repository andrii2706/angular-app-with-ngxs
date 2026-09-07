import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGamesBusketComponent } from './user-games-busket.component';

describe('UserGamesBusketComponent', () => {
  let component: UserGamesBusketComponent;
  let fixture: ComponentFixture<UserGamesBusketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserGamesBusketComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserGamesBusketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
