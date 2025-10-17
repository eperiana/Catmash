import { Component, effect, inject, OnInit, Signal, signal } from '@angular/core';
import { Cat } from '../models/cat';
import { CatService } from '../services/cat.service';
import { LoadingSpinnerComponent } from "../loading-spinner/loading-spinner.component";
import { FloatingActionButtonComponent } from "../floating-action-button/floating-action-button.component";
import { MatchService } from '../services/match.service';

@Component({
  selector: 'app-battle',
  standalone: true,
  imports: [LoadingSpinnerComponent, FloatingActionButtonComponent],
  templateUrl: './battle.component.html',
  styleUrl: './battle.component.scss'
})
export class BattleComponent implements OnInit {
  private readonly catService: CatService = inject(CatService);
  private readonly matchService: MatchService = inject(MatchService);

  readonly isLoading = signal<boolean>(true);
  
  leftCat = this.catService.leftCat;
  rightCat = this.catService.rightCat;

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading.set(false);
    }, 1000)
  }
  
  vote(winner: 'left' | 'right') {
    const chosen = winner === 'left' ? this.leftCat() : this.rightCat();
    if (chosen) {
      this.catService.vote(chosen.id).subscribe({
        next: () => {
          this.catService.pickRandomCats();
          this.isLoading.set(true);
          this.matchService.incrementMatch();
          setTimeout(() => {
            this.isLoading.set(false);
          }, 1000)
        },
        error: () => {
          console.log("API ERROR")
        }
      });
    }
  }

}
