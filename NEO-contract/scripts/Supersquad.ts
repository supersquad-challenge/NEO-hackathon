require('dotenv').config();

const hardhat = require('hardhat');
const ethers = hardhat.ethers;
const contractName = 'Challenge';

const UsdcAddress = process.env.USDC_ADDRESS;
const lendingPool = process.env.AAVE_LENDING_POOL_ADDRESS;

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);

  const Contract = await ethers.getContractFactory(contractName);
  const contract = await Contract.deploy(UsdcAddress, lendingPool);

  console.log('Contract address:', contract.address);

  await contract.deployed();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
