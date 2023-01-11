# Noun Market ⌐◨-◨

A Nouns marketplace for originals and derivatives projects.

## T.O.C.

- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Dependencies](#dependencies)
- [Codebase Structure](#codebase-structure)

### Why?

- Create a free marketplace for secondary sales of Nouns.
- Facilitate the derivatives ecosystem: make it easier to search and discover the Nouns ecosystem.
- Build distribution for the NounsDAO: build community and liquidity that NounsDAO can use to potentially curate in the future.

### Considerations:

- 0% fees
- No official endorsement of derivatives
- Linked to from nouns.wtf header
- Feels nounish in branding and aesthetic
- Entirely open source
- Low barrier to entry for derivatives to be added to the marketplace
  - This will be manually operated to start and managed by the marketplace pod.
  - We can work on an automated and more trustless way to recognize derivatives and get closer to permissionless listings.

# Getting started:

(note: This is a GitHub template - so all you need to do is click on the BIG GREEN "Use this template" Button to create a new repo under your GH account - we recommend using [▲ Vercel](https://vercel.com/) for deployment)

> Clone the repo

```
git clone https://github.com/ourzora/nouns-marketplace.git
```

> Install dependencies

```
cd nouns-marketplace
yarn
```

> Run locally on port 3000

```
yarn dev
```

# Environment Variables

### Public (Included in repo):

```
NEXT_PUBLIC_SITE_TITLE='Your App Name'
NEXT_PUBLIC_SITE_DESCRIPTION='Your app description'
NEXT_PUBLIC_TWITTER_HANDLE='Your twitter handle'
NEXT_PUBLIC_WEBSITE_URL='http://localhost:3000' (modify this VAR in your deployment to reflect the Public URL)
NEXT_PUBLIC_NETWORK_URL=1 (Mainnet - thats what we're working with here)
NEXT_PUBLIC_GA_TRACKING_ID= IF you want to add this sort of thing.
NEXT_PUBLIC_GALACTUS_BASE_URL=https://api.zora.co/graphql
```

### Private (Don't commit to repo, reference .env.local.example) - .env.local

```
NEXT_PUBLIC_ZORA_API_KEY=
NEXT_PUBLIC_INFURA_ID=
NEXT_PUBLIC_RPC_URL=
```

# Dependencies:

First and foremost this is a [Next.js](https://nextjs.org/) App. Additionally this project consumes a number of Zora dependencies along with some key tooling built by like-minded teams.

### Zora Ecosystem:

This project levereges the [zora-api](https://api.zora.co/) for most data fetching. We are actively integrating additional noun specific functionality into our endpoints. Integrations will be tracked in this project's changelog.

Direct message [@ZORAEngineering](https://twitter.com/ZORAEngineering) on Twitter for an API key if your needs require greater than 30 requests per minute. To access the API with a key, add a header in your requests with the key X-API-KEY.

#### Packages:

- ["@zoralabs/nft-hooks"](https://github.com/ourzora/nft-hooks)
- ["@zoralabs/zdk"](https://github.com/ourzora/zdk)
- ["@zoralabs/v3"](https://github.com/ourzora/v3)
- ["@zoralabs/core"](https://github.com/ourzora/core)
- ["@zoralabs/zord"](https://www.npmjs.com/package/@zoralabs/zord)

#### **_A note on Zord!_**

Zord is a general purpose UI library built on top of [Vanilla Extract](https://vanilla-extract.style/). Currently Zord is in alpha and used extensively through Zora's frontends. More robust documentation is in the works along with theming options. You will find that it is an extremely robust library, that does require knowledge of vanilla extract to extend... so check the [Vanilla Extract Docs](https://vanilla-extract.style/documentation/getting-started).

We have created this [playground](https://zord-playroom.vercel.app/#?code=N4Igxg9gJgpiBcIA8AxANjAHgAigSwCcYwAXPCAOwF4AdcCNAVwFsK7sBzAQwAdaRMAZjoA%2BGhWzYkAdRho02AM4kAnhirBgnAnigBhBiwrxsdAEwB6RTy4SAbOwC%2Bj7Gi4AjOfwNoIBRaLikpKoGDjcfHSYACyBEsEhAEIQOADu-JgAHOwAFhnZINjuXGAA1hwEEIwU%2Bgx%2B-Dw6zFwEKuwWYvEJSMlp%2Bbn9hcVlFVU1PvV0isSUUC1thR1BCVK92OlRBdh5m%2BzD5ZXVtb4E-CQwBGTz7Z0rqynrg9tP%2B6NHE6d0RABuF9M3y26aw2Ai2O1BexKBzGx0mIFgygIjFIeF%2BAK6wR6DxBWQGuyGULe4zqnxAimRYBgigCi1uKyxfXxzyZr0OxJO-FSLQoeAoHHR3Qs6CwdJCwvCvAysRAosxvUBKxxBQVCXBuJAKuC7j8sAI0l0JHBFD8zTQdE1km1BF1AGVVOopgxdOaMQkrbqPg0mtcNa7sEs-QyLY98cG1cq-ZadRd9VBDfxjQRTS67lHrRc7WoYPxFE6oCnU%2B6Lp6pjMaj7NQG7kHIyGIb7U8z68Gi3qDUaTVwzQ3C9GCJmHWS8wW7q2SyBzpc8BW-VX6fLa0qRytw8u3X3Y-G6Inkz3R32B9nHWhnXuVmOSfwESQkSi0WfJHOgSlg0uH8FV%2B%2B07rNx2k121y1A97SPIcT3zL8ij7cdyTASlqUAp85RfRdBjDNDa1bX8E07bsW2ArMc2HSCLw5OguQIHk%2BUQ2UkCFMJaPFThJSiaVZSSbEnk-bBIDIkBGjwZpWjiRtMBQ6sLF6dj7kZesm3VHjL1LSBy2EmVgzEzBNToqTtOBLinl4uFJyuNTpMkTTtMklJpIZOsFO4ozSWvW8yHvczsEswNrMwWz9KZRylLJCkqRpDyvIk3TA38uTAr4iiqP5dTawi%2BkfL8ziAsMoKfj%2BGARNTVLBSiwVxTpOjZHkcrKoUZRCM0bRdB8IwTHMKwbHsJwXDcTw0H4AAVFQeAgCpeByBZGLCXBCGIMhKH4XijAK7oAFEVBgdxKlSEQABE8GsNwVDotaNq22y9oOrgVCUPAAC9QLQJLdv2nhDtcDg6Iu16rvOl63sUO7QOYCDnsu67gc%2Bv6fu0r7-sBnNmFEWGrqUZhIbB36wZu%2B6MjCgAJGAuHwPlPMUdHvpUWj6JFcQFVCLBpqIFF5roRbWGWzETs2iBtoJoneQ4MmLC5s7tL54mOGx0DMG7ERxYFzy0Do%2BW%2BVslXJYBnG6Ee0R1fe5XCYltXDYVzWgZBvWIYsdXjf5kmzYR3WTfttHredjhbYlqXcadu3JcwIWbbp6nfLppj8CZubqFZwx2eS6sRZ5kQABkPDkIXE%2B27TU9673taenO5H1ixC7QWzS7zkBgdECurdL8u09q%2BGpkRmUK8UV36%2BzxvK4Dmue4Duiu4xOiyrDqaI9m8ho-oJg49szORAABRaLhRp4HIM-W7ms8DFeCDXg%2BN8rnWZX3w%2BxuL8-15yWzr6PnJK%2Brs-V5v7Arfvsa79fh-K470RP7Hw7nRQBt9tKgN7mFCBg8LCgKpmPEe4cZrMxnmzNg8d6SLwALIwAoIwfqWASDHW3qLQMOC8EEMwCQEQ5D8GELorQyh1Dg4IO6EgyO08Fqx3QQvEhSdM7ENOknFhDFx4M0nigrhc8eHaUXgAJSpMNCgANfjYCYYInetkmHBgAGaUBILIPAHAcgkCvFDBYuj9E2nhg1OgAABXkeArjdlaiAaImQeBaRAAAGlMCAOxABWAA7A4BAfi7ABM8V1TUHk9CMGUBAZgUt1g5DwGAR%2BHAYAkEUKjLsGACDYC4CQbAwS7CeKKEQLgpRhq8hIFZJh8DRHxAqnIMuywZCtKUCBDQWgKhNW4a4yw1hbDYAAIwAAYuquEbvwAAkhQHgjBskc3pjgLsRiZ64IgsxSIAgzAczFBPZBUcpFLUKOsjgmyagHMxPMxZJAUB4DkPmWskgKBcGYA9HmS9Kg6LwBgQCCRfCpB%2BRAP5ALXnYG%2BpSHIDBdT8GTt835-yYDYAANTYAAIJLIgCgCAYB4mAuCGANw1IAByHzQK8nuYikFyKAWQSQiEEOjSabNIsDVTo7SapdPqr0nQxwWp%2BMyO1EZ0psDOGmb1OZKkwpiIlLsmINyGQeSQIvG0polbCz4bvRsSBZkqT-q3bAuh%2BCJFaewRVwhaRWRKvOGywY1U6pTi0TJGjSF6oNZQE%2BSUTVQDNRawoVqBRpTtc%2BUOtYnVCO2ugPAPAeAwCgO64RkavUSAdvndgOiTw8D9QG%2BQlqMjWv9LZdKIi2VsKmhEKU7BUhH05EfWt-AJnjIAKTKrDZg51mKCBbTkUYkxybdWpn1YajNIBT55roD2vtA66lBqLSG4qDroorr1YvGdPN%2B3GJIJivkGAh2qrTT69gprp29q3XOvdHAGVQsXTa7ynaOIRvXd25EUdD2OuPeOydZ6QDYpQYWqIxamVSDLaul9I7F7mvkJ%2B1NY7m4Tt9X%2BmD3Y73AaXZicD1Yn2c2dXoHIxBShwc9QhrWSHT3%2BroARojQGBAgdLbhlVjrF40e%2BJUCgO0eYUBIyO79iHf1UZAGxjjXHUjoPQ-RzDzKmO4ZCKxwj7HKDJxgDooh2ro1HrIw9ZDQmRPKdU-OyTQhpNgdk2uqD%2BHFMce3YOjTmiv3af4IJ7w1nKC2aM8Gh9kULPhtVQpmASmKAAFUeC8erPx8jLnqNuZCzwOjJnvOht88hSDCd8O%2BGmOF%2BkkWdOUe8Jl-KC6MNJeXWl1L-n8MQF5MULL9mPV8ac5mwof6DA1a4P8YrUnStYfM%2BV1aVWeBHXqym0j3qf26e8BAIbCWGO2pS8%2Byrmm9CVPONl7ouXnOTeo6torxm5uPoWzJJbmiLqQGtOt25TWKMtaE2dnUs3TM6SO8xyNi8xMUF8ETS7IRNvNanSAD7X3tleZLfN-rx2WPOpWvIONAMt6acc%2BNgT22QAw5zfDx7PWZMvbk1IReK1mCeCTSN4dEXrvRbR0TxNWOweHYh6919mn5nKAvq7ReSP00o-y3QFnJA2e09A89hneOo2aIANIbQ8D9qQf2bsA8l8UdwgvGO46O-J51iKOBVHUxz%2BDyOouo61zrlX4OMoQ415pnB-PmiKGI6TrTBu8u3f4Nbj5HXSim-p%2Bbk7Z0l64LAP8mXo6ndbZ5yAf3FBA9odB0L7D9qLf4%2BdUvJgCOHP6654b8PKfCVdcS3TnzIv1dJ80wARUYFSD9DvOcnpd3Qcvlfp5e8Lz7qHmm5FcBqzzYPcvKcd676kZvyWi%2BJ7F2dG0hMCDpJ7xT1HE%2BWjpKH2V1vb3nU2lSc8mfof-t-vX08tAIP70F%2BHyvpnmibQ8F5BQC4W-M-O4Bxfq-Fwl%2B9bV6Pxe-U1639rwDz-vrY%2Bq4j6%2B5Jz9SpBOKTjf4Tbh6gHgHP554HYt56TF5j5JzSB5JZIGAUDX6kCQHc514gBoHyAYGUDYGeZH5x59bAHbRoGUQCy4FZ74E0GJQv447lajxNLMqcq0zNI8p1TqANR9KCqsCDKioSATJTI9ReB0CJBLIkCUByojyLw-KCTzDZarKFIniXILS4KTjsDVpRD7IYJAiyHerfAtDTgUCmJ0ACRCQLAmoqT5qyzBgyEkByFsCPomEUB%2BSeHYBmE6C2BWH8TehqRPwgzOGeG2qeHeGuGmHmEBFegqEhHjr-xGErAuFuGRExFeF6Q%2BF%2BEWGBE2E%2BiuAQB%2BweTpGUCZFuHRFuG%2BFxGWEJG2HsD4CKAeAYBQBlEREeFZGspsHqplhzCtBqFMQXKoI6FwE7IZCGHVGxH%2BH1HKSzBFFpIswgCoY3KSDlHuGRRRE5FZG1GzGBHTAqQDF2HjrPwdFZGVGUDTESB5HxHzGqQnGIYpHnEZFdFVE7E1G3FzFkj9FFHA4CwvEVFvFXEfEzH5E5i-EhHNGtGJqAmbGhrbEjwsp0yLwADySyJ41%2BQxU0Ix2hlh4x%2BheyHauRdRgROumJe2SxM8qxqRCQGxlx2R0UJJ%2Bx-A5JvIe2pxYRtY9JwJjJOGzJ4JdAbJ1%2B7AyRrccJDJ1xexgpIAwpe2-xqs4RFxvJUpXxZJGJ7JTR%2B0MJ7RSprxWx3R5aEaKJ%2BGhAJKMA2JDMuJrMYxBAehLERJtJqwApdx4AZpt6nJax6KkpoJNxpJC07pHJTx4pwYaKPpTJuxapAZU%2Bt6CpHsoZ4Z-JkZ-prMgZWpLR7gbRHkYZKpRpXKihzqAA4rCsoJaWspoaMfiXaYUISZgFMb6dKa6cYhAMoKKYhmcXqUCQae8RGZ8SmSAM2a2YUGKV6Tyd2SCb2WCU2SWUZnGRKbmZOX6SyXQIOUZtCZmbCZ2fCcVIiaVE0iaZpkvP8goMobYWWRoRsniboTWQ6XWcSbsZfvII2d8YUUke2VyY2GOQiYaYuVCsec%2BQUcEY8eRs8VuYmfOD4Y%2BQoFGdYUBewHOWBQuUmTUVBQBQ0UUeuVmYheOXyVhgggeZokeU%2BeiSQBSeedaeALafaYqvWb%2BahTBbKRqSKcOe%2BaOZ0ThVKfRf2XKW2SBSGdyexd%2BT2chd6lxcuYxaRZqYUAhQJcqRxQ2WJTKTxYUJhZubJfqUJROXuRWnhszhQIRjoMUgSr2joR8ORRWVeXAVKVSY4aKd0g1E5K4gAMQACcblLlOiOiXU858lSJrCYGXBPBnSfB2YAhAqzUwhfiQyHUYykyhQkqkhfUdAj%2BWBVldMKV1%2BBSSEKB201i90JgVseu3QGVFwoRmGOVIgeVMAJgj0ahJVBSUBSWLSVU3KwV9l-K-S0iIhwyYhcVEq3UMyyVl%2BqVBAqJhZKy9VY1x%2Blu5%2BgMJgZg4ydVw1mVU1DswAC1Lg2V6qc1JSi11eI8k1hZ3swAAS4ym15UHKrS%2BZIQvB7VjUQhxgUVohsVEhg1IAdySyChlaVpFldAWy1Fkxyq7CU8yxaCXpFViQHWqKH1uuzqX6CySywYbylK-AtWaSRKkgjVSNUKbgMKcKFwZqHWaS2AMNGNPEpKigFKnyqNRNgeCN86wYce-lzKzNUgwxv1IA-1N5NFQNRyHCoN3C4NMNjyzy2N7y1NdAaNYAZN0KMAsKB%2BBNvO9NItB%2B6K2ApcZNiVcy9N6wFg6tjcZNJKHWlNKNkttN1KiNjKparNhy4ixynCMc0i7AFFXNR6yt%2B%2BLyjYyNEtIAxoiVMtuNct%2BNpIZKEA%2BtvUhtFNVNVK9NftBtVtVkNtbNfNINqCgtTpv27totkK4toEUtAdJQQdCtpIF0Opmtb1pdG5EE2NRt5Kpt8I2pVdFtDNkKqlntqYTNHB9IwNkijtZybt9yKt7djYud-AVJBdeNxd-A%2BohoJNKk5d0qdAM9j8aakdxt0dY9KkzdZNNlyVk%2Bi%2BCd3krN7BOlttCqgNTp6hEiJyfd888Ng9HtYt9d%2BdkEkgst8t8KStD9zyatK0F61Z2NWtX9Syut2Af9lQADkKtdJtPtUt29r92AFwED-AqJj8xoJqJAAA5DkiMkg34ESp3afZiD3TfbPP3ffUskPU-bA7TRPUXZ-e9VnarRijtFSNLQg0A4w-cqA6w4oOwzXVHc-ebfTWTQiGADoDwKQ6g%2BsDzBg9g4UrgGwxI1HAQ9bfuYGCQw7WQ3famkw8PamKPXQFwJ5XgF4tje-cHdPU4o-MY38mY5Cpw8vYUiY-Y17eTevfXVSbY6Y2Td45gPwAAHRZI5CqOJ1d3fU4DX1aNg0Z2y56PUOgR4LU6QNuMWNT10BkosCeApNe2cOZPJNk2qAJoJhZNwECMeM%2B1JPZNk3MC8gaBnXY3KAwB8DADjIBMBKODY3ND%2BPAATKdO1iENsHImIJVq3m0XViaMC1O2xNIBMI9qEwJM00Az8OQppMMNzOVIL1SEgAbMLMIPQMb1m3LPwPY1iPKNaP9SpI5L7TYCGiornBUItCEyKN8PnMVGH0SRJ1X321TPkORq7NcCLNHPo0INrOK07OELzOAscNvUAugPgP4P7OCM0PHMiMIN4OkjSPoO5ifKGgKzFBQDbC8AJrX7V2t1KNxqkOXM3M3O2AQB3MFIPP86VIvPiOUtN4fNpTH3DOcFXXcE3VtV8r3URWPVtQ9UvXxUDWL0gAT4YCkATX85lATEla2STNp3TNUGVVyCzTB5rA82xMhCyuzSKM6JcCMBoAkAABqXYFe-A4zbjUg02UctRTAoEoyogqJkj08YydETr08Hk3QfrsRrrdrHrXr3qZgvr4buFbjSAQbfpIbdA1qIgnrzrggUbUcAbYGRrpAqq8e2lDOarpyOjZ%2B4%2B2rpAJgZs78JORVI6erF9WbSAObxSsApr5rVrNroEhhZVBrmI8bLrtrdA7rMoqb3royGb-r2NIQ-bZhibIAUxo7EbE7WlDrcb0bA7oEybi7Eg6bFg8bjbFgzbebTGPL3dKdvd2jMiq%2BmmzblbgMxctbOGDw%2BrjbzbJrZrFr1rc73bjVWb0767s7g7IAw7Kb6747e70bf7jrAHnbobI767kbEHmbU70HzrgHm7Ybaby7MbI6h75bzCka%2BbeF4T2birpQF1gVrVT5IVPSwrAyT14r4hkrUq2zNoYBJAB9tEdoUIyr3Wqr57pDMTqq9bBhXphr7H6S01J%2BYTRDdE3HZQFHfL8JHS1Hd1ghIr3VMVTH-VLHSVwmDAcrzrjyFrfwKyRbXwPMANKr2k5nl74N8i-MEAGxhZhwuaAAFDtDaL4X8NPAAJS6vPsNvY1IAd74BOeeEudVDxaQqSBOIwDMCKAaAADaKHkgWgiVrirDbbFrdAvi6HrioyAAtK2x%2B0Zo4N4ql9gOl43K4gYMwDYPKz4hu4MoV5APVyUGVxVzF8ENV71LV4knopcDCbl8134oIK1wN34PzhuU4F1w6z16N3QNEIV3HRHfFXN-N1V7p5l43W0SN-l34gEsV7tzTk123SYDeBXhKht24wALr9PzeGMgC3Q6iFfnDKCteEZlDaiuNe2gasFqOyfDPyqMyp38BbRWd8c2cCfRPp2as0bfcpABc4AvvBcI%2BlA-coclftvo807dd-ovfWhveV6fdEaY8IPe2gSE9QDE8ffpJk8vgIP-dmYvansROg8XtCdt6aJOOlzB7o%2BY%2BQp-r0%2BI%2BYAAD6-tML0rAvDwkvQLKxUN2AMvv3dwgz-Hdt-N6rfzpbScldbRSvX3pQia-PhvgvbjwvpvKQYvbdojJ3%2BjdwIvRv9vKwT3eviaBvDPKvqYnDbvhLyvoTR9JHZ9HPgncP3PZ0vv2AwWUehvxv%2B1eq-vQvQmjvP31vdv1Qjvp3pzdv8vkf0fmfZLbjPvdvUfMfRGWfAzgPQzx9tnEPl9tnXP17mixnk4WKcEOo3rbnPygWTyqQ-n8fI6mK7f1oTeDjsLVzJqOSdzunZNuCMJvD%2BHmKBa5L2XJA3H5wrJJLZNlAC-hnS-fUwAbnMAvn2AVAIgVXKHMAATCSPAoKNg3AUcbnvnAA3Ch12BcCQG53QAiPhxod2C-9jWcCNM7qYBOMDkFcSCAzAkSLxP1WDCNsG%2B6dC8loSmA3gskB9XjkqiDSBFMBUHfVPE266U9%2BA8%2BKfCvTRaVcwWpIYgZJx8CGdp4igAJgwLJoJADm9daYAvlSRkCCB9hZYlQJCYU8pOnzIPlhiH7nYwuOHFmiRxPqQZmqbSZTrdSFbqd6OYrGKqEh06cMbQ4ENKiMw15g9b6EmWsmxG0gaDdAz%2BWsNj0-awdgASXUZPd2DC1NqAvTB7qmG6YaA%2BmwYJpi01GROC7g1QJxIc3hBXQiUvgkgNHRzwHw9OcwFQDSHcGwpUg8yCktHycQBBawigWIRrVnA9FFOLVOQYK34IdUHqmnEZKoISpvUNi1zCQHiiTBfVMQg3RGH6EoA2hGA7gWpqYkP4n8z%2BF-WsO-0uBf9gozQ2AhBAAG1giAJARgJRGwCms0A0wV-n6CAEYh1ekTH5lrzjgYDDBkaDYrcyGh50IiMoaljklSFVBVaxoYpOSH6HFJp%2BtQnSLuTrY%2BEimoEU4S0NEB7ClAsKc1oSweFOJbmhGCYSaCuE-lBBQPWoVkNkFUdaoancKkoPnbPVtOJQ6Vn-gVY8dayybaHjoM55h8m%2BEfVTKV1uZf4B%2BT7FHkF0hSzM14IgP-Buzoh-5j2rPL5ggI1bh8k4Q-NyPc1xGPsE8xme1nqjJEddUQoVS7jAEcCki145IiwJSMdREcJBRDYPlE1%2BYltLMelbkaon5wfQ8RbI1HkSLJG8gFRvIpEPyMFGSx0OFIkkWKJPY0iYeMoq9jr22hkjUgetKAPS2R7sixOUgMkQcNSBcZWhfIgUWSINEiijRhHE0ZIMPZkdgR11KQPILyF0cuqwqZ6uKlhHbMl402ULNUMNZkcMBHI3SoRUTFhYVRIQBMTwFCzCdi8IQeuHmNCzYB1YQ8RuI2zgSljc0syHgOSCSRcYTgN0YpGgICYgIf4X8Y0az1rFUx5O5HdKqmNrLpiZqfuLMesGsZK94kchJJP1B0AcBMkBAS7EgFrG3MFxS4jQD0CiKetcE2AWsX8KqICjHUeOYsVWLXEViS4VY4LjWInH1jGx2AZsX4FbGIMOOHY2BF2I3hUiGcsCLMf2ODHtJLq2Q0EbygjGKCoxdAEVOK1jFSttmK0TAB8leiooXOnVbAFBJiprDugDSd7sUkQ4NI6YWCaAF2HXFGJNxwAbcd0V3ESBmARErVBsREDHiyEtEzAucEsK3MnEg4Z4bS3fi0TwacCLiTg2wCES5gWqOBFZGEldgWJOhKmBJNkG8tshUgzoD4hACgDDQigBAElxCSZB7uQAA) for the curious to explore the layout elements available.

---

## Additional Dependencies:

The codebase is configured to use [Alchemy](https://www.alchemy.com/) as the RPC provider.

In general we use [Wagmi](https://wagmi.sh/docs/providers/configuring-chains) as a convenience for interacting with Ethereum.

[RainbowKit](https://www.rainbowkit.com/) for wallet connect UI.

[Ethers.js](https://docs.ethers.io/v5/) for more specific Ethereum interactions.

# Codebase Structure:

You may notice that there are a number of directories prefixed with the @ symbol. These sit outside of the conventional next.js app application structure. The reasoning behind this is that we would like to treat this codebase as an incubator for potential packages that could be broken out and included in a variety of other applications alongside this one. You will find further documentation within these directories. Note that these are a work in progress, and we welcome input around features and api design.

### Currently we have included:

- @filter: Component suite designed to accomplish NFT display and filtering.
- @noun-auction: Componentry, provider, hooks designed for interaction and display of nounish auction activity.
- @market: Zora Protocol market interaction components / providers / hooks. Currently supporting Zora V3 Asks (public + private list / buy). Along with module approvals. More functionality on the roadmap!
- @media: NFT display componentry.
- @shared: Catch-all for util functions, hooks, constants and components used both in the primary apps and the above (more tightly scoped) pieces of functionality.

# How to Contribute:

- Before making contributions please study the codebase and follow the code patterns present as closely as possible.
- Do not add additional dependencies amidst other work, please propose dependency additions in advance as an issue.
- Please label issues appropriately.
