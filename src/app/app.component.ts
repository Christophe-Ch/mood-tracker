import { Component, inject } from '@angular/core';
import { MoodService } from './mood/services/mood.service';
import { Mood } from './mood/models/mood.enum';
import { CommonModule, DatePipe } from '@angular/common';
import { HeaderComponent } from "./header/header.component";
import { MoodDisplayComponent } from "./mood-display/mood-display.component";
import { RowCalendarComponent } from "./row-calendar/row-calendar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [CommonModule, HeaderComponent, MoodDisplayComponent, RowCalendarComponent],
})
export class AppComponent {
  moodService = inject(MoodService);

  addMood(): void {
    this.moodService.create(
      Math.random() > 0.5 ? Mood.Happy : Mood.Sad,
      new Date()
    );
  }
}
