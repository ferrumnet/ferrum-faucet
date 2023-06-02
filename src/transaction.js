const Web3 = require("web3");

// Function to get the Web3 instance based on the network
export function getWeb3(network) {
  let web3;
  if (network === "bsc") {
    web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545");
  } else if (network === "matic") {
    web3 = new Web3("https://rpc-mumbai.maticvigil.com/");
  } else if (network === "avax") {
    web3 = new Web3("https://api.avax-test.network/ext/bc/C/rpc");
  } else {
    web3 = new Web3("https://testnet.dev.svcs.ferrumnetwork.io/rpc/");
  }
  return web3;
}

// Function to get the balance of an address
export async function getBalance(network, address) {
  const web3 = getWeb3(network);
  const balance = await web3.eth.getBalance(address); // Will give value in Wei
  return web3.utils.fromWei(balance); // Convert Wei to Ether
}

// Function to send a transaction
export async function sendTx(sender, recipient, amount, pvt_key) {
  const web3 = getWeb3("ferrum");

  // Getting the nonce value for the transaction, include the "pending" parameter for duplicate errors
  const getNonce = await web3.eth.getTransactionCount(sender, "pending");

  const gasPriceInWei = web3.utils.toWei("50", "Gwei");
  // console.log({ gasPriceInWei });

  const rawTx = {
    nonce: getNonce,
    gasPrice: web3.utils.toHex(gasPriceInWei),
    gasLimit: web3.utils.toHex(3000000),
    to: recipient,
    value: amount,
    data: "0x0",
  };

  // const account = web3.eth.accounts.privateKeyToAccount(pvt_key);
  const signed = await web3.eth.accounts.signTransaction(rawTx, pvt_key);
  const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);

  console.log(receipt);

  return receipt.transactionHash;
}

var humanStandardTokenAbi = [
  {
    constant: !0,
    inputs: [],
    name: "name",
    outputs: [{ name: "", type: "string" }],
    payable: !1,
    type: "function",
  },
  {
    constant: !0,
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", type: "string" }],
    payable: !1,
    type: "function",
  },
  {
    constant: !0,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    payable: !1,
    type: "function",
  },
  {
    constant: !0,
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", type: "uint256" }],
    payable: !1,
    type: "function",
  },
  {
    constant: !0,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    payable: !1,
    type: "function",
  },
  {
    constant: !1,
    inputs: [
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "success", type: "bool" }],
    payable: !1,
    type: "function",
  },
  {
    constant: !1,
    inputs: [
      { name: "_from", type: "address" },
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ name: "success", type: "bool" }],
    payable: !1,
    type: "function",
  },
  {
    constant: !1,
    inputs: [
      { name: "_spender", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "success", type: "bool" }],
    payable: !1,
    type: "function",
  },
  {
    constant: !0,
    inputs: [
      { name: "_owner", type: "address" },
      { name: "_spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "remaining", type: "uint256" }],
    payable: !1,
    type: "function",
  },
  {
    anonymous: !1,
    inputs: [
      { indexed: !0, name: "_from", type: "address" },
      { indexed: !0, name: "_to", type: "address" },
      { indexed: !1, name: "_value", type: "uint256" },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: !1,
    inputs: [
      { indexed: !0, name: "_owner", type: "address" },
      { indexed: !0, name: "_spender", type: "address" },
      { indexed: !1, name: "_value", type: "uint256" },
    ],
    name: "Approval",
    type: "event",
  },
  {
    inputs: [
      { name: "_initialAmount", type: "uint256" },
      { name: "_tokenName", type: "string" },
      { name: "_decimalUnits", type: "uint8" },
      { name: "_tokenSymbol", type: "string" },
    ],
    payable: !1,
    type: "constructor",
  },
  {
    constant: !1,
    inputs: [
      { name: "_spender", type: "address" },
      { name: "_value", type: "uint256" },
      { name: "_extraData", type: "bytes" },
    ],
    name: "approveAndCall",
    outputs: [{ name: "success", type: "bool" }],
    payable: !1,
    type: "function",
  },
  {
    constant: !0,
    inputs: [],
    name: "version",
    outputs: [{ name: "", type: "string" }],
    payable: !1,
    type: "function",
  },
];

// Function to send a transaction for a token transfer
export async function sendTokenTx(network, sender, token_contract_addr, recipient, amount, pvt_key) {
  const web3 = getWeb3(network);

  // Getting the nonce value for the transaction, include the "pending" parameter for duplicate errors
  const getNonce = await web3.eth.getTransactionCount(sender, "pending");

  const gasPriceInWei = web3.utils.toWei("50", "Gwei");
  console.log({ gasPriceInWei });

  const contract = new web3.eth.Contract(humanStandardTokenAbi, token_contract_addr, {
    from: sender,
  });

  const payload = contract.methods.transfer(recipient, amount).encodeABI();
  const recipientAddress = token_contract_addr;

  const rawTx = {
    nonce: getNonce,
    gasPrice: web3.utils.toHex(gasPriceInWei),
    gasLimit: web3.utils.toHex(3000000),
    to: recipientAddress,
    value: "0x0",
    data: payload,
  };

  // const account = web3.eth.accounts.privateKeyToAccount(pvt_key);
  const signed = await web3.eth.accounts.signTransaction(rawTx, pvt_key);
  console.log("signed");
  const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);

  console.log(receipt);

  return receipt.transactionHash;
}
