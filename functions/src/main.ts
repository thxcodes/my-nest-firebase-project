import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as functions from 'firebase-functions';

const createNestServer = async () => {
  const app = await NestFactory.create(AppModule);
  await app.init();
  return app.getHttpAdapter().getInstance();
};

export const api = functions.region('southamerica-east1').https.onRequest(async (req, res) => {
  const server = await createNestServer();
  server(req, res);
});

