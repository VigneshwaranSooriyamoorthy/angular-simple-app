import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningPokerComponent } from './planning-poker.component';

describe('PlanningPokerComponent', () => {
  let component: PlanningPokerComponent;
  let fixture: ComponentFixture<PlanningPokerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanningPokerComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(PlanningPokerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
