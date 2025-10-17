import { Component, effect, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { CatService } from '../services/cat.service';
import { CommonModule } from '@angular/common';
import { CatCardComponent } from "../cat-card/cat-card.component";
import { FloatingActionButtonComponent } from "../floating-action-button/floating-action-button.component";
import { Cat } from '../models/cat';
import { LoadingSpinnerComponent } from "../loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-cat-card-list',
  standalone: true,
  imports: [CommonModule, CatCardComponent, FloatingActionButtonComponent, LoadingSpinnerComponent],
  templateUrl: './cat-card-list.component.html',
  styleUrl: './cat-card-list.component.scss'
})
export class CatCardListComponent implements OnInit{

  private readonly catService: CatService = inject(CatService);
  readonly isLoading: WritableSignal<boolean> = signal<boolean>(true);
  cats: Signal<Cat[]> = this.catService.cats;

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading.set(false);
    }, 1000);
  }
  
}
