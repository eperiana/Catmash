import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private _matchesPlayed = signal(0);
  readonly matchesPlayed = this._matchesPlayed.asReadonly();

  incrementMatch() {
    this._matchesPlayed.update(v => v + 1);
  }

  reset() {
    this._matchesPlayed.set(0);
  }
}
