import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchTreinoComponent } from './match-treino.component';

describe('MatchTreinoComponent', () => {
  let component: MatchTreinoComponent;
  let fixture: ComponentFixture<MatchTreinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchTreinoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatchTreinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
