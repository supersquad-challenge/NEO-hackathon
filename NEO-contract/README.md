## Contracts

- **NEO EVM Chain**: The project is deployed on the NEO EVM chain, offering fast and secure transactions.
- **ERC20 Token (USDC)**: The project includes a mock ERC20 token called tUSDC for demonstration purposes.

- **Pool for Deposits**: A secure vault contract is available for challenge participants to deposit their tUSDC tokens.

- **Pool Withdraw**: Users can easily deposit and withdraw tUSDC tokens to and from the vault.

- **Defi**: Upon successful completion of the challenge, participants can receive paybacks. This can be implemented by leveraging the Aave V2 protocol, the smart contract could interact with the Aave protocol to manage deposits and withdrawals.

### USDC(ERC20) Contract Address

0x239fe5539b6487a55e16aab67554345b0b422d2b

### Supersquad Pool Contract address

0x56d79575215f47f5F84F034D8A8E352f10DA4083

## How to Run

1. Install dependencies <br/>
   `npm install`

2. Compile contracts <br/>
   `npx hardhat compile`

3. Run tests <br/>
   `npx hardhat test`

4. Deploy contracts <br/>
   `npx hardhat run scripts/deploy.js`
