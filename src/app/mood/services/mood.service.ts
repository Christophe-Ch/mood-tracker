import { inject, Injectable } from '@angular/core';
import { MoodRepositoryService } from '../repositories/mood.repository';
import MoodRecord from '../models/mood-record.model';
import { Mood } from '../models/mood.enum';

@Injectable({
  providedIn: 'root',
})
export class MoodService {
  private _repository = inject(MoodRepositoryService);

  records = this._repository.records;

  create(mood: Mood, date: Date): MoodRecord {
    const record = new MoodRecord(mood, date);
    this._repository.save(record);
    return record;
  }

  update(record: MoodRecord): void {
    this._repository.save(record);
  }

  findByDate(date: Date): MoodRecord | undefined {
    return this._repository.find(
      (record) => record.date.getTime() === date.getTime()
    );
  }

  delete(record: MoodRecord): void {
    //this.repository.delete(record);
  }
}
