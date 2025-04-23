import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceRatingScaleComponent } from './performance-rating-scale.component';

describe('PerformanceRatingScaleComponent', () => {
  let component: PerformanceRatingScaleComponent;
  let fixture: ComponentFixture<PerformanceRatingScaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerformanceRatingScaleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerformanceRatingScaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
