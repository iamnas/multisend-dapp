# MultiSend DApp

MultiSend DApp is a decentralized application that allows users to send multiple payments in a single transaction. The project consists of two main components: a smart contract (using Foundry) and a front-end application (using Next.js).

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Usage](#usage)
- [Contributing](#contributing)

## Introduction

The MultiSend DApp simplifies the process of sending payments to multiple recipients by combining them into a single blockchain transaction. This saves on transaction fees and time, making it an efficient solution for batch payments.

## Features

- Send payments to multiple addresses in one transaction.
- Import recipient addresses and amounts using CSV files.
- Connect to MetaMask for transaction signing.
- View transaction status and explorer link upon completion.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [Foundry](https://github.com/gakonst/foundry) (for smart contract development)
- [MetaMask](https://metamask.io/) browser extension

### Installation

Clone the repository:

```sh
git clone https://github.com/iamnas/multisend-dapp.git
cd multisend-dapp
```

### Running the Application

#### Smart Contract

1. Navigate to the smart contract directory:

    ```sh
    cd multisend-smartcontract
    ```

2. Install the dependencies:

    ```sh
    forge install
    ```

3. Compile the smart contracts:

    ```sh
    forge build
    ```

4. Deploy the smart contracts to your desired network (e.g., Sepolia testnet):

    ```sh
    forge script script/DeployScript.s.sol --rpc-url <RPC_URL> --private-key <PRIVATE_KEY> --broadcast
    ```

#### Front-end Application

1. Navigate to the front-end directory:

    ```sh
    cd ../multisend
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

3. Run the application:

    ```sh
    npm run dev
    ```

4. Open your browser and navigate to `http://localhost:3000` to use the application.

## Usage

1. Connect your MetaMask wallet.
2. Import a CSV file with recipient addresses, amounts, and currencies.
3. Click the "Send Payments" button to initiate the transaction.
4. Monitor the transaction status and view the transaction hash on the blockchain explorer.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a pull request.

## Demo

![MultiSend DApp Demo](../multisend/public/multisend.gif)
