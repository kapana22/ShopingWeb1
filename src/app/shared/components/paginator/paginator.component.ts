import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css',
})
export class PaginatorComponent {
  @Input({ required: true }) pageSize!: number;
  @Input({ required: true }) pageIndex!: number;
  @Input({ required: true }) total = 0;
  @Input() sizeOptions: number[] = [5, 10, 15];

  @Output() pageSizeChange = new EventEmitter<number>();
  @Output() pageIndexChange = new EventEmitter<number>();
}
