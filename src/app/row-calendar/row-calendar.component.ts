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

const TODAY = new Date(new Date().setHours(0, 0, 0, 0));

@Component({
  selector: 'app-row-calendar',
  standalone: true,
  imports: [],
  templateUrl: './row-calendar.component.html',
  styleUrl: './row-calendar.component.scss',
})
export class RowCalendarComponent {
  private _moodService = inject(MoodService);

  today = TODAY;
  records = computed(() => this.generateRecords(this.currentDate()));
  currentDate = signal(TODAY);
  currentDateHeading = computed(() =>
    this.currentDate().getTime() === TODAY.getTime()
      ? 'today'
      : this.currentDate().toLocaleDateString()
  );
  currentRecordUpdate = output<MoodRecord>();

  constructor() {
    effect(() => {
      this.currentRecordUpdate.emit(this.records()[4]);
    });
  }

  previousDay(): void {
    const previous = new Date(this.currentDate());
    previous.setDate(previous.getDate() - 1);
    this.currentDate.set(previous);
  }

  nextDay(): void {
    const next = new Date(this.currentDate());
    next.setDate(next.getDate() + 1);
    this.currentDate.set(next);
  }

  selectDay(day: Date): void {
    this.currentDate.set(day);
  }

  private generateRecords(from: Date): MoodRecord[] {
    const records = [];

    for (let i = -4; i < 5; i++) {
      const date = new Date(from);
      date.setDate(from.getDate() - i);
      records.unshift(
        this._moodService.findByDate(date) ?? new MoodRecord(Mood.Unset, date)
      );
    }

    return records;
  }
}
