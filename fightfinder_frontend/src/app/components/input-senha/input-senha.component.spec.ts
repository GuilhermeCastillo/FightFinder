import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSenhaComponent } from './inputSenha.component';

describe('InputComponent', () => {
  let component: InputSenhaComponent;
  let fixture: ComponentFixture<InputSenhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputSenhaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
