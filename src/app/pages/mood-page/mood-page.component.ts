import { Component, signal } from '@angular/core';
import { MoodDisplayComponent } from './mood-display/mood-display.component';
import { RowCalendarComponent } from './row-calendar/row-calendar.component';
import MoodRecord from '../../mood/models/mood-record.model';

@Component({
  selector: 'app-mood-page',
  standalone: true,
  imports: [MoodDisplayComponent, RowCalendarComponent],
  templateUrl: './mood-page.component.html',
  styleUrl: './mood-page.component.scss',
})
export class MoodPageComponent {
  currentRecord = signal<MoodRecord | null>(null);
}
