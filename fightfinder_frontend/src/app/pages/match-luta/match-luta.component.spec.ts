import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchLutaComponent } from './match-luta.component';

describe('MatchLutaComponent', () => {
  let component: MatchLutaComponent;
  let fixture: ComponentFixture<MatchLutaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchLutaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatchLutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
