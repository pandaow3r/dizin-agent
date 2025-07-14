
import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';
import { LibSQLStore } from '@mastra/libsql';
import { weatherWorkflow } from './workflows/weather-workflow';
import { getMyAgent } from './agents/dizinAgent';


export const createMastra = async () => {
  const myAgent = await getMyAgent();
  return new Mastra({
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
      cors: {
        origin: ["*"],
        allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowHeaders: ["Content-Type", "Authorization"],
        credentials: false,
      },
    },
  });
};
