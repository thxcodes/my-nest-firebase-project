import { Controller, Post, Body } from '@nestjs/common';
import { FirestoreService } from './firestore.service';

@Controller('firestore')
export class FirestoreController {
  constructor(private readonly firestoreService: FirestoreService) {}

  @Post('create')
  async create(@Body('name') name: string) {
    console.log('Received POST request to /firestore/create with name:', name);
    const result = await this.firestoreService.createRecord(name);
    console.log('Created record:', result);
    return result;
  }
}
 