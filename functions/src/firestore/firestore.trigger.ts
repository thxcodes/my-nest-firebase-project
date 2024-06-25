import * as functions from 'firebase-functions';
import { db } from '../firebase';

export const onCreateRecord = functions.region('southamerica-east1').firestore
  .document('records/{recordId}')
  .onCreate(async (snap, context) => {
    const newValue = snap.data();

    if (!newValue.increment_id) {
      const lastRecordSnapshot = await db.collection('records').orderBy('increment_id', 'desc').limit(1).get();
      let incrementId = 0;
      if (!lastRecordSnapshot.empty) {
        const lastRecord = lastRecordSnapshot.docs[0].data();
        incrementId = lastRecord.increment_id;
      }

      incrementId += 1;

      await snap.ref.update({ increment_id: incrementId });
    }
  });
