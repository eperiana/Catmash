import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatchService } from '../services/match.service';

@Component({
  selector: 'app-floating-action-button',
  standalone: true,
  imports: [],
  templateUrl: './floating-action-button.component.html',
  styleUrl: './floating-action-button.component.scss'
})
export class FloatingActionButtonComponent {
  private router = inject(Router);
  private matchService = inject(MatchService);

  @Input() mode: 'battle' | 'ranking' = 'battle';

  matchesPlayed = this.matchService.matchesPlayed; // signal

  onClick() {
    if (this.mode === 'battle') {
      this.router.navigate(['/ranking']);
    } else {
      this.router.navigate(['/battle']);
    }
  }
}
