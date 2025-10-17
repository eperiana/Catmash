import { Component, effect, inject, OnInit } from '@angular/core';
import { CatService } from '../services/cat.service';
import { CommonModule } from '@angular/common';
import { CatCardComponent } from "../cat-card/cat-card.component";

@Component({
  selector: 'app-cat-card-list',
  standalone: true,
  imports: [CommonModule, CatCardComponent],
  templateUrl: './cat-card-list.component.html',
  styleUrl: './cat-card-list.component.scss'
})
export class CatCardListComponent{
  private catService: CatService = inject(CatService);
  
  cats = this.catService.cats;
}
