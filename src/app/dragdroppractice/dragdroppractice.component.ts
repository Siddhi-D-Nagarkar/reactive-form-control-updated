import { Component } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-dragdroppractice',
  imports: [DragDropModule,NgFor],
  templateUrl: './dragdroppractice.component.html',
  styleUrl: './dragdroppractice.component.css',
})
export class DragdroppracticeComponent {

  items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
}
