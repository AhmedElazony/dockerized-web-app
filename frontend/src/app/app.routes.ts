import { Routes } from '@angular/router';
import { StartDataComponent } from './components/start-data.component';

export const routes: Routes = [
  { path: '', redirectTo: '/start-data', pathMatch: 'full' },
  { path: 'start-data', component: StartDataComponent },
  { path: '**', redirectTo: '/start-data' }
];
