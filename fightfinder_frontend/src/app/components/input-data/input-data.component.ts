import { Component, EventEmitter, Input, Output } from '@angular/core'; 
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-input-data',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatDatepickerModule, MatInputModule, MatNativeDateModule],
  templateUrl: './input-data.component.html',
  styleUrl: './input-data.component.css'
})

export class InputDataComponent {
  @Input() placeholder: string = 'dd/MM/yyyy';
  @Input() date: string = '';
  @Output() dateChange = new EventEmitter<string>();

  dateControl: FormControl = new FormControl('');
 
}
