import { computed, effect, Injectable, Signal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cat } from '../models/cat';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatService {
  private apiUrl: string = 'http://localhost:8080/api/cats';
  private _cats = signal<Cat[]>([]);
  private _leftCat = signal<Cat>({} as Cat);
  private _rightCat = signal<Cat>({} as Cat);

  // Signaux public accessible par les composants
  readonly cats = computed(() => this._cats());
  readonly leftCat = computed(() => this._leftCat());
  readonly rightCat = computed(() => this._rightCat());

  constructor(private http: HttpClient) {
    this.fetchCats();
    effect(() => {
      const list = this._cats();
      if (list.length > 2) {
        this.pickRandomCats();
      }
    }, { allowSignalWrites: true });
  }
  
  fetchCats() {
    this.http.get<Cat[]>(this.apiUrl).subscribe({
      next: (data) => this._cats.set(data),
      error: (err) => console.error('Erreur API', err)
    });

  }

  vote(catId: number) {
    return this.http.post(`${this.apiUrl}/vote/${catId}`, {}).pipe(
      tap(() =>
        this._cats.update(oldCats =>
          oldCats.map(cat =>
            cat.id === catId
              ? { ...cat, voteCounter: cat.voteCounter + 1 }
              : cat
          )
        )
      )
    );
  }

  pickRandomCats() {
    const list: Cat[] = this._cats();
    
    const indexes = this.getTwoDistinctIndexes(list.length);
    this._leftCat.set(this._cats()[indexes[0]]);
    this._rightCat.set(this._cats()[indexes[1]]);
  }

  private getTwoDistinctIndexes(max: number): [number, number] {
    const first = Math.floor(Math.random() * max);
    let second = Math.floor(Math.random() * max);
    while (second === first) {
      second = Math.floor(Math.random() * max);
    }
    return [first, second];
  }
}
