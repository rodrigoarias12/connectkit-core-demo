"use client";

import React from "react";
import { ConnectKitProvider, createConfig } from "@particle-network/connectkit";
import { authWalletConnectors } from "@particle-network/connectkit/auth";
import { evmWalletConnectors } from "@particle-network/connectkit/evm";
import { coreDao ,polygonAmoy } from "@particle-network/connectkit/chains";
import { wallet, EntryPosition } from "@particle-network/connectkit/wallet";

const config = createConfig({
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
  clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY!,
  appId: process.env.NEXT_PUBLIC_APP_ID!,
  walletConnectors: [
    authWalletConnectors({
      authTypes: ["email", "google", "apple", "twitter", "github"], // Optional, restricts the types of social logins supported
    }),
  ],

  plugins: [
    wallet({
      entryPosition: EntryPosition.BR, // Positions the modal button at the bottom right on login
      visible: true, // Determines if the wallet modal is displayed
    }),
  ],

  chains: [coreDao, polygonAmoy],
});

export const ParticleConnectkit = ({ children }: React.PropsWithChildren) => {
  return <ConnectKitProvider config={config}>{children}</ConnectKitProvider>;
};
