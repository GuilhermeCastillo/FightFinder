import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core'; 
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-data',
  standalone: true,
  imports: [ FormsModule, ReactiveFormsModule],
  templateUrl: './input-data.component.html',
  styleUrl: './input-data.component.css'
})
export class InputDataComponent {
  @Input() placeholder: string = 'dd/MM/yyyy';
  @Input() date: string = '';
  @Output() dateChange = new EventEmitter<string>();

  dateControl: FormControl = new FormControl('');

  ngOnInit() {
    if (this.date) { 
      console.log('this.date[0]', this.date[0]);
     
      const parsedDate = this.parseDate(this.date);
      this.dateControl.setValue(parsedDate);
      console.log('AQUI');
    }

    this.dateControl.valueChanges.subscribe(value => {
      const formattedDate = this.formatDate(value);
      this.dateChange.emit(formattedDate);
    });
  }

  private formatDate(date: string): string {
    return formatDate(date, 'dd/MM/yyyy', 'en-GB');
  }

  private parseDate(date: string): string {
    const [day, month, year] = date.split('/');
    return `${day}-${month}-${year}`; // Formato ISO para o input
  }
}
