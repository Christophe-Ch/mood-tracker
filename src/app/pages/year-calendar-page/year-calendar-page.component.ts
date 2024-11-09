import { Component, inject, OnInit, signal } from '@angular/core';
import { MoodService } from '../../mood/services/mood.service';
import MoodRecord from '../../mood/models/mood-record.model';
import { Mood } from '../../mood/models/mood.enum';

@Component({
  selector: 'app-year-calendar-page',
  standalone: true,
  imports: [],
  templateUrl: './year-calendar-page.component.html',
  styleUrl: './year-calendar-page.component.scss',
})
export class YearCalendarPageComponent implements OnInit {
  private _moodService = inject(MoodService);

  moods = signal<MoodRecord[]>([]);
  today = new Date(new Date().setHours(0, 0, 0, 0));

  ngOnInit(): void {
    this.moods.set(this._getMoodsForYear(2024));
  }

  private _getMoodsForYear(year: number): MoodRecord[] {
    const moodsForYear = this._moodService.findByYear(year);
    const moodsForYearSet = new Map<number, MoodRecord>();

    for (const mood of moodsForYear) {
      moodsForYearSet.set(mood.date.getTime(), mood);
    }

    const moods = [];

    let date = new Date(new Date(year.toString()).setHours(0, 0, 0, 0));
    const lastDate = new Date(
      new Date((year + 1).toString()).setHours(0, 0, 0, 0)
    );

    while (date < lastDate) {
      if (moodsForYearSet.has(date.getTime())) {
        moods.push(moodsForYearSet.get(date.getTime())!);
      } else {
        moods.push(new MoodRecord(Mood.Unset, date));
      }
      const nextDate = new Date(date);
      nextDate.setDate(date.getDate() + 1);
      date = nextDate;
    }

    return moods;
  }
}
