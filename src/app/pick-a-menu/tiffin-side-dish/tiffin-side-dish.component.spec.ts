import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiffinSideDishComponent } from './tiffin-side-dish.component';

describe('TiffinSideDishComponent', () => {
  let component: TiffinSideDishComponent;
  let fixture: ComponentFixture<TiffinSideDishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiffinSideDishComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(TiffinSideDishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
