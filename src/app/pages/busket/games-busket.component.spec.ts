import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesBusketComponent } from './games-busket.component';

describe('GamesBusketComponent', () => {
  let component: GamesBusketComponent;
  let fixture: ComponentFixture<GamesBusketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamesBusketComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GamesBusketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
