import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageMonthlyBalanceComponent } from './average-monthly-balance.component';

describe('AverageMonthlyBalanceComponent', () => {
  let component: AverageMonthlyBalanceComponent;
  let fixture: ComponentFixture<AverageMonthlyBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AverageMonthlyBalanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AverageMonthlyBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
