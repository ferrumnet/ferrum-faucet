# Ferrum Testnet Faucet

This project is a React-based Faucet application for dispensing tFRM tokens on various testnets.

## Getting Started

To get the project up and running on your local machine, follow the steps below.

### Prerequisites

Make sure you have the following software installed on your machine:

- Node.js (v12 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/ferrum-testnet-faucet.git
   ```

2. Navigate to the project directory:

    ```bash
    cd ferrum-testnet-faucet
    ```

3. Install the project dependencies:

    ```bash
    npm install
    ```

### Configuration

Before running the project, you need to configure the environment variables. Follow the steps below:

In the project root directory, create a new file named .env.
Open the .env file and provide the following values:

```
REACT_APP_FAUCET_ACCOUNT_ADDRESS=your_faucet_address
REACT_APP_FERRUM_TOKEN_ADDRESS=your_ferrum_token_address
REACT_APP_FAUCET_ACCOUNT_PVT_KEY=your_faucet_account_private_key
REACT_APP_FRM_TO_DRIP=1000000000000000000
```

Replace your_faucet_address, your_ferrum_token_address, and your_faucet_account_private_key with the actual values corresponding to your setup.
Note: Make sure not to share your private key publicly or commit it to a version control system.


### Running the Project
Once you have completed the installation and configuration steps, you can run the project using the following command:

```bash
npm run start
```

This will start the development server and open the application in your default browser.

You can now interact with the Ferrum Testnet Faucet application in your browser.