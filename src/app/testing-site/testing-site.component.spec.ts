import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingSiteComponent } from './testing-site.component';

describe('TestingSiteComponent', () => {
  let component: TestingSiteComponent;
  let fixture: ComponentFixture<TestingSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingSiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestingSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
