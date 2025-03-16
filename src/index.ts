import { config } from 'dotenv';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { OuraProvider } from './provider/oura_provider.js';

config();

async function main() {
  const personalAccessToken = process.env.OURA_PERSONAL_ACCESS_TOKEN;
  const clientId = process.env.OURA_CLIENT_ID;
  const clientSecret = process.env.OURA_CLIENT_SECRET;
  const redirectUri = process.env.OURA_REDIRECT_URI;

  // Check for either personal access token or OAuth credentials
  if (!personalAccessToken && (!clientId || !clientSecret)) {
    throw new Error('Either OURA_PERSONAL_ACCESS_TOKEN or both OURA_CLIENT_ID and OURA_CLIENT_SECRET must be provided');
  }

  // Create and initialize the provider
  const provider = new OuraProvider({
    personalAccessToken,
    clientId,
    clientSecret,
    redirectUri: redirectUri || 'http://localhost:3000/callback'
  });
  
  const transport = new StdioServerTransport();
  
  await provider.getServer().connect(transport);
}

main().catch(error => {
  console.error('Server error:', error);
  process.exit(1);
});
