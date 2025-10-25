import 'dotenv/config';
import { createWalletClient, http, parseEther, stringToHex } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { mainnet, sepolia } from 'viem/chains';
import { getDataURIs } from './utils.ts';

// Get private key from environment
const privateKey = process.env.PRIVATE_KEY;
const isMainnet = process.env.MAINNET?.toLowerCase() === 'true';
const inscribeGzipped = process.env.GZIPPED?.toLowerCase() === 'true';
const receiver = process.env.RECEIVER_ADDRESS;
if (!privateKey) {
  throw new Error('PRIVATE_KEY not found in environment variables');
}

// Ensure private key has 0x prefix
const privKey = privateKey.replace(/^0x/, '');

// Create account and wallet client
const account = privateKeyToAccount(`0x${privKey}`);
const client = createWalletClient({
  account,
  chain: isMainnet ? mainnet : sepolia,
  transport: http('https://eth.drpc.org'),
});

async function createEthscriptions() {
  try {
    console.log('Loading font data...');
    const fonts = await getDataURIs();

    console.log(`Found ${fonts.length} fonts to ethscribe`);
    console.log(`Ethscribe gzipped: ${String(inscribeGzipped).toUpperCase()}`);
    console.log(`On MAINNET: ${String(isMainnet).toUpperCase()}`);

    for (const font of fonts.sort((a, b) => a.name.localeCompare(b.name))) {
      const isLowWoff = font.name.includes('low') && font.name.includes('woff');
      if (!isLowWoff) {
        continue;
      }
      console.log(`\nProcessing font: ${font.name}`);
      console.log(`MIME type: ${font.mime}`);

      // console.log('Data SHA256:', font.data_sha);
      console.log(`Data size: ${font.size} bytes`);
      if (inscribeGzipped) {
        console.log('Gzip SHA256:', font.gzipData_sha);
        console.log(`Data gzip: ${font.gzipSize} bytes`);
      }

      try {
        // Create the transaction
        const hash = await client.sendTransaction({
          to: (receiver as `0x${string}`) || account.address,
          value: parseEther('0'), // No ETH transfer
          data: inscribeGzipped
            ? stringToHex(font.gzipData)
            : stringToHex(font.data),
        });
        console.log(`✅ Transaction sent for ${font.name}`);
        console.log(`   Hash: ${hash}`);

        // Add a small delay between transactions to avoid nonce issues
        await new Promise((resolve) => setTimeout(resolve, 5000));
      } catch (_error: unknown) {
        console.error('❌ Failed to send transaction for', font.name);
      }
    }

    console.log('\n🎉 Ethscription process completed!');
  } catch (error) {
    console.error('Error in ethscription process:', error);
    process.exit(1);
  }
}

// Run if this file is executed directly
if (import.meta.main) {
  createEthscriptions();
}
