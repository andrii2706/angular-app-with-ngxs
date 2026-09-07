import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftGamesBusketComponent } from './draft-games-busket.component';

describe('DraftGamesBusketComponent', () => {
  let component: DraftGamesBusketComponent;
  let fixture: ComponentFixture<DraftGamesBusketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraftGamesBusketComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DraftGamesBusketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
