import { computed, inject, Injectable, signal } from '@angular/core';
import { LocalStorageService } from '../../utils/local-storage.service';
import MoodRecord from '../models/mood-record.model';
import { MoodFilterCallback } from '../models/find-mood-record.callback';
import { uid } from 'uid';

@Injectable({
  providedIn: 'root',
})
export class MoodRepositoryService {
  private _localStorageService = inject(LocalStorageService);
  private _cache = signal<MoodRecord[]>([]);

  public records = computed(() => this._cache());

  constructor() {
    this.refresh();
  }

  refresh(): void {
    const records = this._localStorageService.getArray<MoodRecord>(
      'records',
      MoodRecord.fromStorage
    );
    this._cache.set(records ?? []);
  }

  filter(predicate: MoodFilterCallback): MoodRecord[] {
    return this._cache()?.filter(predicate);
  }

  find(predicate: MoodFilterCallback): MoodRecord | undefined {
    return this._cache()?.find(predicate);
  }

  findById(id: string): MoodRecord | undefined {
    return this.find((record) => record.id === id);
  }

  save(record: MoodRecord): void {
    const cache = this._cache();
    const index = cache.findIndex((other) => other.id === record.id);
    if (index === -1) {
      record.id = uid();
      cache.push(record);
    } else {
      cache[index] = record;
    }

    this._cache.set(cache);
    this._localStorageService.set('records', this._cache());
  }
}
