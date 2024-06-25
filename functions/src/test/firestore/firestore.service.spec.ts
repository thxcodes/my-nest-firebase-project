import { Test, TestingModule } from '@nestjs/testing';
import { FirestoreService } from '../../firestore/firestore.service';
import { db } from '../../firebase';

jest.mock('../../src/firebase', () => {
  const mockCollection = {
    orderBy: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    get: jest.fn().mockResolvedValue({
      empty: false,
      docs: [{ data: () => ({ increment_id: 1 }) }],
    }),
    add: jest.fn().mockResolvedValue(undefined),
  };

  return {
    db: {
      collection: jest.fn().mockReturnValue(mockCollection),
    },
  };
});

describe('FirestoreService', () => {
  let service: FirestoreService;
  let mockCollection: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FirestoreService],
    }).compile();

    service = module.get<FirestoreService>(FirestoreService);
    mockCollection = db.collection('records');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a record', async () => {
    const result = await service.createRecord('Test');
    expect(result).toEqual({ name: 'Test', increment_id: 2 });
    expect(db.collection).toHaveBeenCalledWith('records');
    expect(mockCollection.add).toHaveBeenCalledWith({ name: 'Test', increment_id: 2 });
  });
});
