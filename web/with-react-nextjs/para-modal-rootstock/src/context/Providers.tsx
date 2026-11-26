"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ParaProvider as ParaSDKProvider } from "@getpara/react-sdk";
import { API_KEY, ENVIRONMENT, WALLET_CONNECT_PROJECT_ID } from "@/config/constants";
import { rootstockTestnet } from "wagmi/chains";

const queryClient = new QueryClient();

const ROOTSTOCK_TESTNET = {
  name: 'Rootstock Testnet',
  evmChainId: '31' as const,
  nativeTokenSymbol: 'tRBTC',
  logoUrl: 'https://raw.githubusercontent.com/rsksmart/rsk-contract-metadata/refs/heads/master/images/rootstock-orange.png',
  rpc: {
    httpUrls: ['https://public-node.testnet.rsk.co'],
  },
  // The SDK's CustomNetwork type intersects `explorer?: string` with NetworkMetadata's object form,
  // so no value satisfies both; the modal reads the object form at runtime.
  explorer: {
    name: 'Rootstock Testnet Explorer',
    url: 'https://explorer.testnet.rootstock.io',
    txUrlFormat: 'https://explorer.testnet.rootstock.io/tx/{HASH}',
  } as never,
  isTestnet: true,
};

export function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <ParaSDKProvider
        paraClientConfig={{
          apiKey: API_KEY,
          env: ENVIRONMENT,
        }}
        externalWalletConfig={{
          wallets: ["METAMASK", "WALLETCONNECT"],
          includeWalletVerification: true,
          evmConnector: {
            config: {
              chains: [rootstockTestnet],
            },
          },
          walletConnect: {
            projectId: WALLET_CONNECT_PROJECT_ID,
          },
        }}
        config={{ appName: "Para + Rootstock Example" }}
        paraModalConfig={{
          balances:{
            displayType: 'AGGREGATED',
            requestType: 'MAINNET_AND_TESTNET',
            additionalAssets: [              
              {
                name: 'tRBTC',
                symbol: 'tRBTC',
                logoUrl: 'https://raw.githubusercontent.com/rsksmart/rsk-contract-metadata/refs/heads/master/images/rootstock-orange.png',
                implementations: [
                    {
                      network: ROOTSTOCK_TESTNET,
                    },                  
                ],
              },
              {
                name: 'tRIF Token',
                symbol: 'tRIF',
                logoUrl: 'https://raw.githubusercontent.com/rsksmart/rsk-contract-metadata/refs/heads/master/images/rif.png',
                price: {
                  value: 1,
                  currency: 'USD',
                },
                implementations: [
                  {
                    network: ROOTSTOCK_TESTNET,
                    contractAddress: '0x19f64674d8a5b4e652319f5e239efd3bc969a1fe',
                  },
                ],
              },
            ],
          },
          disableEmailLogin: false,
          disablePhoneLogin: false,
          authLayout: ["AUTH:FULL", "EXTERNAL:FULL"],
          oAuthMethods: ["GOOGLE"],
          onRampTestMode: true,
          theme: {
            foregroundColor: "#222222",
            backgroundColor: "#FFFFFF",
            mode: "light",
            borderRadius: "none",
            font: "Inter",
          },
          logo: "/para.svg",
          recoverySecretStepEnabled: true,
          twoFactorAuthEnabled: false,
        }}>
        {children}
      </ParaSDKProvider>
    </QueryClientProvider>
  );
}
