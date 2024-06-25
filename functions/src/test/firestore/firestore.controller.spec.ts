import { Test, TestingModule } from '@nestjs/testing';
import { FirestoreController } from '../../firestore/firestore.controller';
import { FirestoreService } from '../../firestore/firestore.service';

describe('FirestoreController', () => {
  let controller: FirestoreController;
  let service: FirestoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FirestoreController],
      providers: [
        {
          provide: FirestoreService,
          useValue: {
            createRecord: jest.fn().mockResolvedValue({ name: 'Test', increment_id: 1 }),
          },
        },
      ],
    }).compile();

    controller = module.get<FirestoreController>(FirestoreController);
    service = module.get<FirestoreService>(FirestoreService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a record', async () => {
    const result = await controller.create('Test');
    expect(result).toEqual({ name: 'Test', increment_id: 1 });
    expect(service.createRecord).toHaveBeenCalledWith('Test');
  });
});
