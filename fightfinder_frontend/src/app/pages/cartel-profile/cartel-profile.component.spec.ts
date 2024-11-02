import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartelProfileComponent } from './cartel-profile.component';

describe('CartelProfileComponent', () => {
  let component: CartelProfileComponent;
  let fixture: ComponentFixture<CartelProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartelProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CartelProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
