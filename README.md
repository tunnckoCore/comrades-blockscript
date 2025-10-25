# blockscript

## ethscribe

since fonts are already ethscribed on mainnet:

```
// === Mainnet (without esip6)
// highscript woff2 gzip = 0x5296ef8b8fb4168b57a09813622f7bc8198a9456b57886e47e1129475ef88d4a
// highscript otf gzip = 0xcbf0c8a0c61f8018f9ad186e4aaa300faad892c6cbfa398841814f02c3bdea30
// lowscript woff2 gzip = 0x6c588b716ba2c2eda5fc12acea9914a103f0bfeb0bb47ab2072cf523fa2339a8
// lowscript otf gzip = 0x665ba2d452904e03e1943e0800af42468e107b614ee4ec59d377a66ffbe5ea5d
```

you can ethscribe on your own:

1. Rename `.env.example` to `.env`
2. populate `PRIVATE_KEY` and set `MAINNET=true`, and `GZIPPED=true` or false for plain
3. update the `utils.ts` to have `;rule=esip6` - `data:${mime};base64,` to `data:${mime};rule=esip6;base64,`
4. run `bun run ethscribe`

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
        url("https://sepoplia.api.calldata.space/ethscriptions/0x0330e1fa0186056902a678ccacef184a8fb0312a653ae4e0efc78765226c2a60/content") format("woff2"),
        url("https://sepoplia.api.calldata.space/ethscriptions/0xc5a5347cb02f065ae48428249b6906da832325f00d89bd9cd15abdd277acbf65/content") format("opentype");
}

```

ethscribed

```
// === Sepolia
// highscript woff2 gzip = 0x2f8397abd2d4244c3c2196fcabae519ef625ac292eeeccbbf632b01252366702
// highscript otf gzip = 0x9dec27a0a69048775add0de1577cd80761a2d6e4dcbf49482e179bea12ab52c7
// lowscript woff2 gzip = 0x0330e1fa0186056902a678ccacef184a8fb0312a653ae4e0efc78765226c2a60
// lowscript otf gzip = 0xc5a5347cb02f065ae48428249b6906da832325f00d89bd9cd15abdd277acbf65

// highscript woff2 NO-GZIP = 0x827865efd69b9fe282b1a6dc7ae39ccd280712c2796631c416edf7181e7b1d73
// highscript otf NO-GZIP = 0xc61bbc261fd86915572c42ce1819dd9ebeaffac399071d0580c7aee8889d0ad2
// lowscript woff2 NO-GZIP = 0x977b486a8251cb3c1261b47a43504c5ddc2ca7146a106de2b476ff78beb90d53
// lowscript otf NO-GZIP = 0xba4a9f9df378b50651dd4cb2f1c812754f25e04c55baf729230a235899ea2be0

// === Mainnet
// highscript woff2 gzip = 0x5296ef8b8fb4168b57a09813622f7bc8198a9456b57886e47e1129475ef88d4a
// highscript otf gzip = 0xcbf0c8a0c61f8018f9ad186e4aaa300faad892c6cbfa398841814f02c3bdea30
// lowscript woff2 gzip = 0x665ba2d452904e03e1943e0800af42468e107b614ee4ec59d377a66ffbe5ea5d
// lowscript otf gzip = 0x50c42bd4696c50868b147396a707ede771abb4bd10acbfdd1af00ef186e6187f
```
