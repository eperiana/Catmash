import { Component, Input } from '@angular/core';
import { Cat } from '../models/cat';

@Component({
  selector: 'app-cat-card',
  standalone: true,
  imports: [],
  templateUrl: './cat-card.component.html',
  styleUrl: './cat-card.component.scss'
})
export class CatCardComponent {
  @Input() cat!: Cat;
  @Input() position!: number;

}
