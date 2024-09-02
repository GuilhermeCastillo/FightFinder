import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

interface TableColumn {
  header: string;
  field: string;
}
  
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})

export class TableComponent implements OnInit {
  @Input() columns: TableColumn[] = []; 
  
  @Input() data:[] = [];

  constructor() {}

  ngOnInit(): void {}
}
