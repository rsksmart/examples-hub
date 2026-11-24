# Para Modal on Rootstock

A Next.js app that uses the [Para](https://www.getpara.com/) React SDK on Rootstock Testnet (chain id 31). It shows how to:

- open the Para modal and sign in with email, phone, Google, MetaMask or WalletConnect,
- show tRBTC and tRIF balances in the modal by registering Rootstock Testnet as a custom network,
- sign a message with the connected wallet.

## Requirements

- Node.js 20.19+, 22.13+ or 24+
- Yarn 4 (`corepack enable` picks up the version in `package.json`)
- A Para API key from the [Para developer portal](https://developer.getpara.com/)
- Optional: a WalletConnect project id from [Reown](https://cloud.reown.com/) to connect wallets through WalletConnect

## Setup

Copy the example environment file and fill in your keys:

```bash
cp .env.example .env.local
```

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_PARA_API_KEY` | yes | Para API key |
| `NEXT_PUBLIC_PARA_ENVIRONMENT` | no | `BETA` (default) or `PROD` |
| `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` | no | WalletConnect project id |

Install and run:

```bash
yarn install
yarn dev
```

Open http://localhost:3000.

## Key files

- `src/context/Providers.tsx`: Para provider setup, the Rootstock Testnet custom network, the tRBTC and tRIF assets, and the modal options
- `src/config/constants.ts`: environment variables
- `src/app/page.tsx`: connect and sign-message flow
- `src/components/layout/Header.tsx`: connect button

## Rootstock Testnet

| | |
| --- | --- |
| Chain id | 31 |
| RPC | https://public-node.testnet.rsk.co |
| Explorer | https://explorer.testnet.rootstock.io |
| tRIF token | `0x19f64674d8a5b4e652319f5e239efd3bc969a1fe` |
| Faucet | https://faucet.rootstock.io |

## Learn more

- [Onboard using Para SDK (Rootstock Developer Portal)](https://dev.rootstock.io/use-cases/onboarding-ux/para/)
- [Rootstock integration walkthrough (Para docs)](https://docs.getpara.com/v3/walkthroughs/rootstock)
- [Para React SDK docs](https://docs.getpara.com/)
