import { Mood } from './mood.enum';

export default class MoodRecord {
  constructor(
    public mood: Mood,
    public date: Date,
    public id: string | null = null
  ) {}

  static fromStorage(record: {
    mood: string;
    date: string;
    id: string;
  }): MoodRecord {
    return new MoodRecord(
      Mood[record.mood as keyof typeof Mood],
      new Date(record.date),
      record.id
    );
  }
}
