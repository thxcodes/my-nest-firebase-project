import { Module } from '@nestjs/common';
import { FirestoreService } from './firestore.service';
import { FirestoreController } from './firestore.controller';

@Module({
  providers: [FirestoreService],
  controllers: [FirestoreController],
})
export class FirestoreModule {}
