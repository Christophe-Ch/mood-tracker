import { Injectable } from '@angular/core';
import { BuildModelCallback } from './build-model.callback';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  get<T>(key: string): T | null {
    const value = window.localStorage.getItem(key);
    if (value === null) {
      return null;
    }

    return JSON.parse(value) as T;
  }

  getArray<T>(key: string, builder: BuildModelCallback<T>): T[] | null {
    const array = this.get<T>(key);
    if (array === null || !Array.isArray(array)) {
      return null;
    }

    return array.map(builder);
  }

  set(key: string, value: object): void {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
}
