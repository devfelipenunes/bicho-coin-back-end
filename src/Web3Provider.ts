import Web3 from "web3";

const ABI = require("./abi.json");

const web3 = new Web3(`${process.env.NODE_URL}`);

const account = web3.eth.accounts.privateKeyToAccount(
  "0x" + process.env.PRIVATE_KEY
);
web3.eth.accounts.wallet.add(account);

export async function mintAndTransfer(to: string): Promise<string> {
  const contract = new web3.eth.Contract(
    ABI,
    `${process.env.CONTRACT_ADDRESS}`,
    { from: `${process.env.WALLET}` }
  );

  const nonce = await web3.eth.getTransactionCount(`${process.env.WALLET}`);
  const gasPrice = await web3.eth.getGasPrice();

  const tx = await contract.methods.mint(to).send({
    nonce: nonce,
    gasPrice: gasPrice,
  });
  return tx.transactionHash;
}

export async function getBalanceOf(to: string): Promise<string> {
  const contract = new web3.eth.Contract(
    ABI,
    `${process.env.CONTRACT_ADDRESS}`,
    { from: `${process.env.WALLET}` }
  );
  const balance = await contract.methods.balanceOf(to).call();

  return balance.toString();
}

export async function transfer(value): Promise<string> {
  const contract = new web3.eth.Contract(
    ABI,
    `${process.env.CONTRACT_ADDRESS}`,
    { from: `${process.env.WALLET}` }
  );

  const nonce = await web3.eth.getTransactionCount(`${process.env.WALLET}`);
  const gasPrice = await web3.eth.getGasPrice();
  const tx = await contract.methods
    .transfer(`${process.env.WALLET}`, value)
    .send({
      nonce: nonce,
      gasPrice: gasPrice,
    });

  return tx.transactionHash;
}

export async function transferFrom(from, value): Promise<string> {
  const contract = new web3.eth.Contract(
    ABI,
    `${process.env.CONTRACT_ADDRESS}`,
    { from: `${process.env.WALLET}` }
  );

  const nonce = await web3.eth.getTransactionCount(`${process.env.WALLET}`);
  const gasPrice = await web3.eth.getGasPrice();
  const tx = await contract.methods
    .transferFrom(from, `${process.env.WALLET}`, value)
    .send({
      nonce: nonce,
      gasPrice: gasPrice,
    });

  return tx.transactionHash;
}
