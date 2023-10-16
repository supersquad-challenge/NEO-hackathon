const hardhat = require('hardhat');
const ethers = hardhat.ethers;
const contractName = 'ERC20Token';

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account:', deployer.address);

  //console.log('Account balance:', (await deployer.getBalance()).toString());

  const Contract = await ethers.getContractFactory(contractName);
  const contract = await Contract.deploy('USDC Token', 'USDC');

  console.log('Contract address:', contract.address);
  console.log(typeof contract);
  await contract.deployed();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
