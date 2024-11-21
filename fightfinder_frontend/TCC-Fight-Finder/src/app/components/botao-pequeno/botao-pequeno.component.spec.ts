import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoPequenoComponent } from './botao-pequeno.component';

describe('BotaoPequenoComponent', () => {
  let component: BotaoPequenoComponent;
  let fixture: ComponentFixture<BotaoPequenoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotaoPequenoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BotaoPequenoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
