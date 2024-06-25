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
const firestore_controller_1 = require("../../src/firestore/firestore.controller");
const firestore_service_1 = require("../../src/firestore/firestore.service");
describe('FirestoreController', () => {
    let controller;
    let service;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        const module = yield testing_1.Test.createTestingModule({
            controllers: [firestore_controller_1.FirestoreController],
            providers: [
                {
                    provide: firestore_service_1.FirestoreService,
                    useValue: {
                        createRecord: jest.fn().mockResolvedValue({ name: 'Test', increment_id: 1 }),
                    },
                },
            ],
        }).compile();
        controller = module.get(firestore_controller_1.FirestoreController);
        service = module.get(firestore_service_1.FirestoreService);
    }));
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
    it('should create a record', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield controller.create('Test');
        expect(result).toEqual({ name: 'Test', increment_id: 1 });
        expect(service.createRecord).toHaveBeenCalledWith('Test');
    }));
});
