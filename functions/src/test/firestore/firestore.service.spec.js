"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const firestore_service_1 = require("../../src/firestore/firestore.service");
const firebase_1 = require("../../src/firebase");
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
    let service;
    let mockCollection;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        const module = yield testing_1.Test.createTestingModule({
            providers: [firestore_service_1.FirestoreService],
        }).compile();
        service = module.get(firestore_service_1.FirestoreService);
        mockCollection = firebase_1.db.collection('records');
    }));
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    it('should create a record', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield service.createRecord('Test');
        expect(result).toEqual({ name: 'Test', increment_id: 2 });
        expect(firebase_1.db.collection).toHaveBeenCalledWith('records');
        expect(mockCollection.add).toHaveBeenCalledWith({ name: 'Test', increment_id: 2 });
    }));
});
