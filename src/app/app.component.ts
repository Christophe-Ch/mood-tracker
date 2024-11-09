import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RowCalendarComponent } from './pages/mood-page/row-calendar/row-calendar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [CommonModule, HeaderComponent, RowCalendarComponent, RouterModule],
})
export class AppComponent {}
