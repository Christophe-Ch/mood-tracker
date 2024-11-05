import {
  Component,
  computed,
  effect,
  inject,
  output,
  signal,
} from '@angular/core';
import MoodRecord from '../mood/models/mood-record.model';
import { Mood } from '../mood/models/mood.enum';
import { MoodService } from '../mood/services/mood.service';

@Component({
  selector: 'app-row-calendar',
  standalone: true,
  imports: [],
  templateUrl: './row-calendar.component.html',
  styleUrl: './row-calendar.component.scss',
})
export class RowCalendarComponent {
  private _currentDate = signal(new Date(new Date().setHours(0, 0, 0, 0)));
  private _moodService = inject(MoodService);

  records = computed(() => this.generateRecords(this._currentDate()));
  currentRecordUpdate = output<MoodRecord>();

  constructor() {
    effect(() => {
      this.currentRecordUpdate.emit(this.records()[this.records().length - 1]);
    });
  }

  previousDay(): void {
    const previous = new Date(this._currentDate());
    previous.setDate(previous.getDate() - 1);
    this._currentDate.set(previous);
  }

  nextDay(): void {
    const next = new Date(this._currentDate());
    next.setDate(next.getDate() + 1);
    this._currentDate.set(next);
  }

  selectDay(day: Date): void {
    this._currentDate.set(day);
  }

  private generateRecords(from: Date): MoodRecord[] {
    const records = [];

    for (let i = 0; i < 5; i++) {
      const date = new Date(from);
      date.setDate(from.getDate() - i);
      records.unshift(
        this._moodService.findByDate(date) ?? new MoodRecord(Mood.Unset, date)
      );
    }

    return records;
  }
}
