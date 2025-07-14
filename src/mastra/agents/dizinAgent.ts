import { openai } from '@ai-sdk/openai';
import { Agent } from '@mastra/core/agent';
import { MCPClient } from "@mastra/mcp";

const apiKey = process.env.SMITHERY_API_KEY as string;
const profileKey = process.env.SMITHERY_PROFILE_KEY as string;

const mcps = new MCPClient({
  servers: {
    movie: {
      command: "npx",
      args: [
        "npx",
        "-y",
        "@smithery/cli@latest",
        "run",
        "@pandaow3r/tr_dizin_mcp",
        "--key",
        apiKey,
        "--profile",
        profileKey,
      ],
    },
  },
});

export const myAgent = new Agent({
  name: 'TR Dizin Agent',
  instructions: `
  Sen Kullanıcının istediği makaleleri getiren bir agentsın.

  Kullanıcının istediği makaleyi getirirken, makaleye ait detayları da getir.
`,
  model: openai('gpt-4o'),
  tools: await mcps.getTools(),
});
