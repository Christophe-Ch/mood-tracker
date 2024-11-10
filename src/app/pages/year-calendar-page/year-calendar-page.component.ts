import { Component, computed, inject, signal } from '@angular/core';
import { MoodService } from '../../mood/services/mood.service';
import MoodRecord from '../../mood/models/mood-record.model';
import { Mood } from '../../mood/models/mood.enum';
import { addDaysToDate, dateTimeToDate, TODAY } from '../../utils/date';

@Component({
  selector: 'app-year-calendar-page',
  standalone: true,
  imports: [],
  templateUrl: './year-calendar-page.component.html',
  styleUrl: './year-calendar-page.component.scss',
})
export class YearCalendarPageComponent {
  private _moodService = inject(MoodService);

  moods = computed<MoodRecord[]>(() =>
    this._getMoodsForYear(this.currentYear())
  );
  today = TODAY;
  currentYear = signal(TODAY.getFullYear());

  previousYear(): void {
    this.currentYear.set(this.currentYear() - 1);
  }

  nextYear(): void {
    this.currentYear.set(this.currentYear() + 1);
  }

  private _getMoodsForYear(year: number): MoodRecord[] {
    const moodsForYear = this._moodService.findByYear(year);
    const moodsForYearSet = new Map<number, MoodRecord>();

    for (const mood of moodsForYear) {
      moodsForYearSet.set(mood.date.getTime(), mood);
    }

    const moods = [];

    let date = dateTimeToDate(new Date(year.toString()));
    const lastDate = dateTimeToDate(new Date((year + 1).toString()));

    while (date < lastDate) {
      if (moodsForYearSet.has(date.getTime())) {
        moods.push(moodsForYearSet.get(date.getTime())!);
      } else {
        moods.push(new MoodRecord(Mood.Unset, date));
      }

      date = addDaysToDate(date, 1);
    }

    return moods;
  }
}
