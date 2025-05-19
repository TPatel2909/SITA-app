import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CordysTestComponent } from './cordys-test.component';

describe('CordysTestComponent', () => {
  let component: CordysTestComponent;
  let fixture: ComponentFixture<CordysTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CordysTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CordysTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
