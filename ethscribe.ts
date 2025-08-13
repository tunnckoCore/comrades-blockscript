import 'dotenv/config';
import { createWalletClient, http, parseEther, stringToHex } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { mainnet, sepolia } from 'viem/chains';
import { getDataURIs } from './utils.ts';

// Get private key from environment
const privateKey = process.env.PRIVATE_KEY;
const isMainnet = process.env.MAINNET === 'true';
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
  transport: http(),
});

async function createEthscriptions() {
  try {
    console.log('Loading font data...');
    const fonts = await getDataURIs('fonts');

    console.log(`Found ${fonts.length} fonts to ethscribe`);

    for (const font of fonts) {
      console.log(`\nProcessing font: ${font.name}`);
      console.log(`MIME type: ${font.mime}`);

      // Convert base64 data to hex
      const hexData = stringToHex(font.data);
      console.log(`Data size: ${hexData.length / 2 - 1} bytes`);

      try {
        // Create the transaction
        const hash = await client.sendTransaction({
          to: (receiver as `0x${string}`) || account.address,
          value: parseEther('0'), // No ETH transfer
          data: hexData,
        });

        console.log(`✅ Transaction sent for ${font.name}`);
        console.log(`   Hash: ${hash}`);

        // Add a small delay between transactions to avoid nonce issues
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`❌ Failed to send transaction for ${font.name}:`, error);
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
