import { Injectable } from '@nestjs/common';
import { db } from '../firebase';

@Injectable()
export class FirestoreService {
  private incrementId = 0;

  async createRecord(name: string): Promise<any> {
    const lastRecordSnapshot = await db.collection('records').orderBy('increment_id', 'desc').limit(1).get();
    if (!lastRecordSnapshot.empty) {
      const lastRecord = lastRecordSnapshot.docs[0].data();
      this.incrementId = lastRecord.increment_id;
    }

    this.incrementId += 1;

    const record = {
      name,
      increment_id: this.incrementId,
    };

    await db.collection('records').add(record);
    return record;
  }
}
