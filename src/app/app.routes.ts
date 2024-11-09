import { Routes } from '@angular/router';
import { MoodPageComponent } from './pages/mood-page/mood-page.component';
import { YearCalendarPageComponent } from './pages/year-calendar-page/year-calendar-page.component';

export const routes: Routes = [
  { path: '', component: MoodPageComponent },
  { path: 'calendar', component: YearCalendarPageComponent },
];
