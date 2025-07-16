
import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';
import { LibSQLStore } from '@mastra/libsql';
import { weatherWorkflow } from './workflows/weather-workflow';
import { myAgent } from './agents/dizinAgent';

export const mastra = new Mastra({
  workflows: { weatherWorkflow },
  agents: { myAgent },
  storage: new LibSQLStore({
    url: ":memory:",
  }),
  logger: new PinoLogger({
    name: 'Mastra',
    level: 'info',
  }),
  server: {
    // CORS ayarlarını kaldırdım
  },
});
