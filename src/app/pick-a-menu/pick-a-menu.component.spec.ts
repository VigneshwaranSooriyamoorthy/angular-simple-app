import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickAMenuComponent } from './pick-a-menu.component';

describe('PickAMenuComponent', () => {
  let component: PickAMenuComponent;
  let fixture: ComponentFixture<PickAMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickAMenuComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(PickAMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
