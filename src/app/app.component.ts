import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MoodDisplayComponent } from './mood-display/mood-display.component';
import { RowCalendarComponent } from './row-calendar/row-calendar.component';
import MoodRecord from './mood/models/mood-record.model';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    CommonModule,
    HeaderComponent,
    MoodDisplayComponent,
    RowCalendarComponent,
  ],
})
export class AppComponent {
  currentRecord = signal<MoodRecord | null>(null);
}
