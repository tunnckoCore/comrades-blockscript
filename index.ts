import fs from 'node:fs/promises';
import { getDataURIs } from './utils';

export default {
  async fetch(req: Request) {
    const url = new URL(req.url);

    if (url.pathname === '/') {
      return new Response(await fs.readFile('./index.html'), {
        headers: {
          'Content-Type': 'text/html',
        },
      });
    }

    const fonts = await getDataURIs();
    // const fonts = [
    //   {
    //     name: 'high-blockscript.woff2',
    //     hash: '0x9cc449d9718a82a9a573d4d60af270798275d4e19555f62a68ddcb7edef816fc',
    //   },
    //   {
    //     name: 'high-blockscript.otf',
    //     hash: '0x46f94ecd0172c1bb60686a135d9b2510747bacc02631a61743153ef5203547e7',
    //   },
    //   {
    //     name: 'low-blockscript.woff2',
    //     hash: '0xe7d7e0a1f5224d19ca9f1331fefec71013b67992a979485dfa38454fd811eea4',
    //   },
    //   {
    //     name: 'low-blockscript.otf',
    //     hash: '0xfe191672acf7b38833ad08e7d42f27818135c7ab3908531fd95cd765a94ea879',
    //   },
    // ];

    if (url.pathname.startsWith('/fonts')) {
      const found = fonts.find(({ name }) => url.pathname.includes(name));

      if (found) {
        const ethscriptionUrl = `https://sepolia-api-v2.ethscriptions.com/ethscriptions/${found.name}`;

        const arrbuf = await fetch(found.data || ethscriptionUrl).then((x) =>
          x.arrayBuffer()
        );
        const response = new Response(new Uint8Array(arrbuf), {
          headers: {
            'Content-Encoding': 'gzip',
            'Content-Type': found.mime,
            'Content-Length': arrbuf.byteLength.toString(),
          },
        });
        return response;
      }
    }
  },
};
