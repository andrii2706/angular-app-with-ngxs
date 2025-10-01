import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevelopersCardsComponent } from './developers-cards.component';

describe('DevelopersCardsComponent', () => {
  let component: DevelopersCardsComponent;
  let fixture: ComponentFixture<DevelopersCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevelopersCardsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DevelopersCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
