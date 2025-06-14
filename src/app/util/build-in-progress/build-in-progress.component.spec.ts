import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildInProgressComponent } from './build-in-progress.component';

describe('BuildInProgressComponent', () => {
  let component: BuildInProgressComponent;
  let fixture: ComponentFixture<BuildInProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuildInProgressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuildInProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
