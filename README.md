
<div align="center">
  <a href="https://particle.network/">
    <img src="https://i.imgur.com/xmdzXU4.png" />
  </a>
  <h3>
 @particle-network/connectkit on Core DAO Demo 
  </h3>
</div>

# Particle Connect on Core DAO

**Particle Connect** enables a unified modal driving connection with social logins (through Particle Auth) and standard Web3 wallets, creating an equally accessible experience for Web3 natives and traditional consumers. Particle Connect is an all-in-one SDK capable of handling end-to-end onboarding and wallet connection.

This app enables you to log in using social logins or Web3 methods via Particle Connect and interact with the [Core DAO chain](https://coredao.org/). You can view your account information and send transfer transactions to any address you input in the UI.

Built using:

- **Particle Connect 2.0**
- **ethers.js V6.x.x**
- **TypeScript**
- **Tailwind CSS**

> Find the [Particle Connect SDK docs](https://developers.particle.network/api-reference/connect/desktop/web).

***

👉 Learn more about [Particle Network](https://particle.network).

## 🛠️ Quickstart

### Clone this repository
```
git clone https://github.com/Particle-Network/connectkit-core-demo
```

### Move into the app directory

```sh
cd particle-connect
```

### Install dependencies

```sh
yarn install
```

Or

```sh
npm install
```

### Set environment variables
This project requires several keys from Particle Network to be defined in `.env`. The following should be defined:
- `NEXT_PUBLIC_PROJECT_ID`, the ID of the corresponding application in your [Particle Network dashboard](https://dashboard.particle.network/#/applications).
- `NEXT_PUBLIC_CLIENT_KEY`, the ID of the corresponding project in your [Particle Network dashboard](https://dashboard.particle.network/#/applications).
- `NEXT_PUBLIC_APP_ID`, the client key of the corresponding project in your [Particle Network dashboard](https://dashboard.particle.network/#/applications).
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID='WALLETCONNECT_PROJECT_ID`, retrieved from https://cloud.walletconnect.com. 

### Start the project
```sh
npm run dev
```

Or

```sh
yarn dev
```

## What is Core DAO

Core is the first Bitcoin-aligned, EVM-compatible Layer-1 blockchain, built to complement Bitcoin with hyper-scalable smart contract capabilities. By integrating over 75% of Bitcoin's mining hash power and staking more than 8,200 BTC, Core introduces a secure and decentralized foundation for the next generation of DeFi innovation.

## Build with Particle Connect (from scratch)

To get started with Particle Connect in your application, follow these steps:

### 🛠 Configuration & Integration

> This is based on a standard Next JS application initialized with `npx create-next-app@latest`.

1. **Install the SDK**: 

   Begin by installing the ConnectKit SDK:

   ```bash
   yarn add @particle-network/connectkit viem@^2
   ```

2. **Create `Connectkit.tsx` and Configure the SDK**: 

  Create a new component named `Connectkit.tsx` to set up your Particle Connect configuration.

   **Required Configurations:**
   - `projectId`, `clientKey`, and `appId` — Obtain these from the [Particle dashboard](https://dashboard.particle.network/).
   - `chains` — Specify the supported chains for your dApp.
   - `walletConnectors` — Define the wallets you want to support.

   **Optional Configurations:**
   - `theme` and `language` for the connection modal UI.
   - Additional appearance customizations.

   ```tsx
    "use client";

  import React from "react";
  import { ConnectKitProvider, createConfig } from "@particle-network/connectkit";
  import { authWalletConnectors } from "@particle-network/connectkit/auth";
  import { evmWalletConnectors } from "@particle-network/connectkit/evm";
  import { coreDao } from "@particle-network/connectkit/chains";
  import { wallet, EntryPosition } from "@particle-network/connectkit/wallet";

  const config = createConfig({
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
    clientKey: process.env.NEXT_PUBLIC_CLIENT_KEY!,
    appId: process.env.NEXT_PUBLIC_APP_ID!,
    walletConnectors: [
      authWalletConnectors({
        authTypes: ["email", "google", "apple", "twitter", "github"], // Optional, restricts the types of social logins supported
      }),
      // Default Web3 logins
      evmWalletConnectors({
        walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID, // optional, retrieved from https://cloud.walletconnect.com
      }),
    ],

    plugins: [
      wallet({
        entryPosition: EntryPosition.BR, // Positions the modal button at the bottom right on login
        visible: true, // Determines if the wallet modal is displayed
      }),
    ],

    chains: [coreDao],
  });

  export const ParticleConnectkit = ({ children }: React.PropsWithChildren) => {
    return <ConnectKitProvider config={config}>{children}</ConnectKitProvider>;
  };
   ```

3. **Wrap Your App**:

   Import and wrap your application with the `ParticleConnectKit` component (export of `ConnectKitProvider`) in your `index` or `layout` file. Here’s an example for a `layout.tsx` file:

   ```tsx
   import type { Metadata } from "next";
   import { Inter } from "next/font/google";
   import "./globals.css";
   import { ParticleConnectkit } from "./components/Connectkit";

   const inter = Inter({ subsets: ["latin"] });

   export const metadata: Metadata = {
     title: "Particle Connect",
     description: "Demo showcasing a quickstart for Particle Connect 2.0 on Core DAO",
   };

   export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
     return (
       <html lang="en">
         <body className={inter.className}>
           <ParticleConnectkit>{children}</ParticleConnectkit>
         </body>
       </html>
     );
   }
   ```

4. **Add a Connection Button**:

   Include the **Connect** button in your main `App` component to allow users to log in via Particle Connect.

   Example integration:

   ```tsx
    "use client";

  import { ConnectButton, useAccount } from "@particle-network/connectkit";

  const App = () => {
    const { address, isConnected, chainId } = useAccount();

    // Standard ConnectButton utilization
    return (
      <div>
        <ConnectButton />
        {isConnected && (
          <>
            <h2>Address: {address}</h2>
            <h2>Chain ID: {chainId}</h2>
          </>
        )}
      </div>
    );
  };

  export default App;

   ```

## Particle Connect features

Find the features available in the [Particle Connect SDK docs](https://developers.particle.network/api-reference/connect/desktop/web#particle-connect-for-web).
