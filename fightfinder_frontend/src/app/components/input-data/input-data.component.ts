import { Component, EventEmitter, Input, Output } from '@angular/core';
import { formatDate } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-data',
  standalone: true,
  imports: [ FormsModule],
  templateUrl: './input-data.component.html',
  styleUrl: './input-data.component.css'
})
export class InputDataComponent {

  date: string = '';  // data em formato yyyy-MM-dd
  formattedDate: string = '';  // data em formato dd/MM/yyyy

  ngOnInit() {
    this.formattedDate = this.formatDateToBrazilian(this.date);
  }

  onDateChange(newDate: string) {
    this.date = newDate;
    this.formattedDate = this.formatDateToBrazilian(newDate);
  }

  formatDateToBrazilian(date: string): string {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  }
}
