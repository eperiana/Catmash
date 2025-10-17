import { Component, effect, inject, OnInit, Signal, signal } from '@angular/core';
import { Cat } from '../models/cat';
import { CatService } from '../services/cat.service';

@Component({
  selector: 'app-battle',
  standalone: true,
  imports: [],
  templateUrl: './battle.component.html',
  styleUrl: './battle.component.scss'
})
export class BattleComponent {
  private catService: CatService = inject(CatService);
  
  leftCat = this.catService.leftCat;
  rightCat = this.catService.rightCat;
  isVoting = signal<boolean>(false);
 

  vote(winner: 'left' | 'right') {
    if (this.isVoting()) return;
    this.isVoting.set(true);

    const chosen = winner === 'left' ? this.leftCat() : this.rightCat();
    if (chosen) {
      this.catService.vote(chosen.id).subscribe({
        next: () => {
          this.isVoting.set(false);
          this.catService.pickRandomCats();
        },
        error: () => {
          this.isVoting.set(false);
        }
      });
    }
  }

}
