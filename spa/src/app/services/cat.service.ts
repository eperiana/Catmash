import { computed, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cat } from '../models/cat';

@Injectable({
  providedIn: 'root'
})
export class CatService {
  private apiUrl = 'http://localhost:8080/api/cats';
  private _cats = signal<Cat[]>([]);

  // Signal public accessible par les composants
  readonly cats = computed(() => this._cats());

  constructor(private http: HttpClient) {
        this.fetchCats();
  }
  
  fetchCats() {
    this.http.get<Cat[]>(this.apiUrl).subscribe({
      next: (data) => this._cats.set(data),
      error: (err) => console.error('Erreur API', err)
    });
  }
}
