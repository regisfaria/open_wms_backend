import express from 'express';
import { container } from 'tsyringe';

import { ExpirationDateCronjob } from './ExpirationDateCronjob';
import { MinimumStockCronjob } from './MinimumStockCronjob';

const cronApp = express();

function startCrons(): void {
  const expirationDateCron = container.resolve(ExpirationDateCronjob);
  const minimumStockCron = container.resolve(MinimumStockCronjob);

  expirationDateCron.runJob();

  minimumStockCron.runJob();
}

export { cronApp, startCrons };
