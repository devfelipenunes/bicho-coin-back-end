import { Wallet } from "ethers";
import Web3 from "web3";

const ABI = require("../abi.json");

const web3 = new Web3(`${process.env.NODE_URL}`);

const account = web3.eth.accounts.privateKeyToAccount(
  "0x" + process.env.PRIVATE_KEY
);
web3.eth.accounts.wallet.add(account);

const WALLET = `${process.env.WALLET}`;
const ADRESS = `${process.env.CONTRACT_ADDRESS}`;

function getContract() {
  const contract = new web3.eth.Contract(
    ABI,
    `${process.env.CONTRACT_ADDRESS}`,
    { from: WALLET }
  );
  return contract;
}

async function getBalanceOf(wallet: string): Promise<string> {
  const contract = getContract();
  const balance = await contract.methods.balanceOf(wallet).call();
  return balance.toString();
}

async function getNonce(): Promise<bigint> {
  const nonce = await web3.eth.getTransactionCount(wallet);
  return nonce;
}

async function getGasPrice(): Promise<bigint> {
  const gasPrice = await web3.eth.getGasPrice();
  return gasPrice;
}
async function mintAndTransfer(to: string): Promise<string> {
  const contract = getContract();
  const nonce = await getNonce();
  const gasPrice = await getGasPrice();

  const tx = await contract.methods.mint(to).send({
    nonce: nonce,
    gasPrice: gasPrice,
  });
  return tx.transactionHash;
}

async function transfer(value: string): Promise<string> {
  const contract = getContract();

  const nonce = await web3.eth.getTransactionCount(value);
  const gasPrice = await web3.eth.getGasPrice();
  console.log("Wallet: ", Wallet);
  const tx = await contract.methods.transfer(WALLET, value).send({
    nonce: nonce,
    gasPrice: gasPrice,
  });

  return tx.transactionHash;
}

// async function transferFrom(from, value): Promise<string> {
//   const contract = new web3.eth.Contract(
//     ABI,
//     `${process.env.CONTRACT_ADDRESS}`,
//     { from: wallet }
//   );

//   const nonce = await web3.eth.getTransactionCount(wallet);
//   const gasPrice = await web3.eth.getGasPrice();
//   const tx = await contract.methods
//     .transferFrom(from, wallet, value)
//     .send({
//       nonce: nonce,
//       gasPrice: gasPrice,
//     });

//   return tx.transactionHash;
// }

export default {
  getBalanceOf,
  mintAndTransfer,
  transfer,
};
