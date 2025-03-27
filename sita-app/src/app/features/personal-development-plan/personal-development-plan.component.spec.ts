import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalDevelopmentPlanComponent } from './personal-development-plan.component';

describe('PersonalDevelopmentPlanComponent', () => {
  let component: PersonalDevelopmentPlanComponent;
  let fixture: ComponentFixture<PersonalDevelopmentPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalDevelopmentPlanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalDevelopmentPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
