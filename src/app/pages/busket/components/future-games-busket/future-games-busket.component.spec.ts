import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureGamesBusketComponent } from './future-games-busket.component';

describe('FutureGamesBusketComponent', () => {
  let component: FutureGamesBusketComponent;
  let fixture: ComponentFixture<FutureGamesBusketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FutureGamesBusketComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FutureGamesBusketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
