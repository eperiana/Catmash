import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { CatCardListComponent } from './cat-card-list/cat-card-list.component';
import { BattleComponent } from './battle/battle.component';

export const routes: Routes = [
  { path: '', redirectTo: 'hiscore', pathMatch: 'full' },
  { path: 'ranking', component: CatCardListComponent },
  { path: 'battle', component: BattleComponent},
  { path: '**', component: NotFoundComponent }
];