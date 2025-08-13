# blockscript

## ethscribe on mainnet

1. Rename `.env.example` to `.env`
2. populate `PRIVATE_KEY` and set `MAINNET=true`
3. run `bun run ethscribe`

```
bun run ethscribe
```

## usage

To use them in webpages, you just add them through `link` tags in the `<head>` section of your HTML document

```html
<link rel="preload" href="/ethscriptions/{id}/data" as="font" crossorigin="anonymous" />
```

or through CSS with `@font-face` (could be slow to low without prefetching and/or caching)

```css
@font-face {
    font-family: "High Blockscript";
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src:
        /*
            in case this css file is also ethscribed,
            the link _should_ strip the `https:` and hostname of the indexer,
            like so /ethscriptions/{id}/data or if it is ESIP-9 compliant /ethscriptions/{id}/content
        */
        url("link to high blockscript woff2 ethscription") format("woff2"),
        url("link to high blockscript otf ethscription") format("opentype");

        /*url("/fonts/high-blockscript.woff2") format("woff2"),
        url("/fonts/high-blockscript.otf") format("opentype");*/
}

@font-face {
    font-family: "Low Blockscript";
    src: /* same as above for low-blockscript */
        url("https://sepoplia.api.calldata.space/ethscriptions/0xe7d7e0a1f5224d19ca9f1331fefec71013b67992a979485dfa38454fd811eea4/content") format("woff2"),
        url("https://sepoplia.api.calldata.space/ethscriptions/0xfe191672acf7b38833ad08e7d42f27818135c7ab3908531fd95cd765a94ea879/content") format("opentype");
}

```

## sepolia

gzipped on sepolia:

```
Name: high-blockscript.woff2
MIME type: font/woff2
Size: 18043 bytes
Hash: 0x9cc449d9718a82a9a573d4d60af270798275d4e19555f62a68ddcb7edef816fc

Name: high-blockscript.otf
Mime: font/otf
Size: 20941 bytes
Hash: 0x46f94ecd0172c1bb60686a135d9b2510747bacc02631a61743153ef5203547e7

Name: low-blockscript.woff2
Mime: font/woff2
Size: 30295 bytes
Hash: 0xe7d7e0a1f5224d19ca9f1331fefec71013b67992a979485dfa38454fd811eea4

Name: low-blockscript.otf
MIME type: font/otf
Size: 35493 bytes
Hash: 0xfe191672acf7b38833ad08e7d42f27818135c7ab3908531fd95cd765a94ea879
```

not gzipped on sepolia:

```
Name: high-blockscript.woff2
MIME type: font/woff2
Size: 18015 bytes
Hash: 0xeb081698024c0462eb7aa1cbf5fd87b04c91b7a0e5423e0d2a4c7adde80fd24f

Name: low-blockscript.otf
MIME type: font/otf
Size: 68737 bytes
Hash: 0x29a04d55f1e1bdbb0a37d43ffee1027f6e954500a9c76032f3a06dc2dbaf0d35

Name: high-blockscript.otf
MIME type: font/otf
Size: 38385 bytes
Hash: 0x00c1826ad351c99c5e18741aacb524816b28e4cd70e5003d489a4f699b10ab11

Name: low-blockscript.woff2
MIME type: font/woff2
Size: 30259 bytes
Hash: 0xfad59de7f98c62f92933335e03e3cb876de7be0d532333b692feb5a0c6393146
```

##
