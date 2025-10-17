import { Component, effect, inject, OnInit, Signal, signal } from '@angular/core';
import { Cat } from '../models/cat';
import { CatService } from '../services/cat.service';
import { LoadingSpinnerComponent } from "../loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-battle',
  standalone: true,
  imports: [LoadingSpinnerComponent],
  templateUrl: './battle.component.html',
  styleUrl: './battle.component.scss'
})
export class BattleComponent implements OnInit {
  private catService: CatService = inject(CatService);

  readonly isLoading = signal<boolean>(true);
  
  leftCat = this.catService.leftCat;
  rightCat = this.catService.rightCat;

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading.set(false);
    }, 1500)
  }
  
 

  vote(winner: 'left' | 'right') {
    const chosen = winner === 'left' ? this.leftCat() : this.rightCat();
    if (chosen) {
      this.catService.vote(chosen.id).subscribe({
        next: () => {
          this.catService.pickRandomCats();
          this.isLoading.set(true);
          setTimeout(() => {
            this.isLoading.set(false);
          }, 1500)
        },
        error: () => {
          console.log("API ERROR")
        }
      });
    }
  }

}
