import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalClockComponent } from './digital-clock.component';

describe('DigitalClockComponent', () => {
  let component: DigitalClockComponent;
  let fixture: ComponentFixture<DigitalClockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DigitalClockComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(DigitalClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
