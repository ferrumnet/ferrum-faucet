import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { sendTx, sendTokenTx, getBalance } from "./transaction";
import ClipLoader from "react-spinners/ClipLoader";
import "./App.css";

const faucet_address = process.env.REACT_APP_FAUCET_ACCOUNT_ADDRESS;
const ferrum_token_address = process.env.REACT_APP_FERRUM_TOKEN_ADDRESS;

const NameForm = () => {
  const [value, setValue] = useState("");
  const [network, setNetwork] = useState("ferrum");
  const [address, setAddress] = useState("");
  const [txHash, setTxHash] = useState("");
  const [faucetBalance, setFaucetBalance] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const faucetAddress = faucet_address;
  const tokenContractAddress = ferrum_token_address;

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const changeDropdown = (eventKey) => {
    setNetwork(eventKey);
  };

  const getExplorerLink = (hash) => {
    switch (network) {
      case "ferrum":
        return "https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Ftestnet.dev.svcs.ferrumnetwork.io#/explorer";
      case "bsc":
        return "https://testnet.bscscan.com/tx/" + hash;
      case "matic":
        return "https://mumbai.polygonscan.com/tx/" + hash;
      case "avax":
        return "https://testnet.snowtrace.io/tx/" + hash;
      default:
        return "";
    }
  };

  const transferBalance = async () => {
    setLoading(true);
    setTxHash("");
    setError("");
    try {
      if (network === "ferrum") {
        const txHash = await sendTx(
          faucetAddress,
          address,
          process.env.REACT_APP_FRM_TO_DRIP,
          process.env.REACT_APP_FAUCET_ACCOUNT_PVT_KEY
        );
        console.log(txHash);
        setTxHash(txHash);
        setLoading(false);
      } else {
        const txHash = await sendTokenTx(
          network,
          faucetAddress,
          tokenContractAddress,
          address,
          process.env.REACT_APP_FRM_TO_DRIP,
          process.env.REACT_APP_FAUCET_ACCOUNT_PVT_KEY
        );
        console.log(txHash);
        setTxHash(txHash);
        setLoading(false);
      }
    } catch (err) {
      setError(String(err));
      setLoading(false);
    }
  };

  const networkToNetworkName = (eventKey) => {
    switch (eventKey) {
      case "bsc":
        return "BSC Testnet";
      case "matic":
        return "MATIC Testnet";
      case "avax":
        return "AVAX Testnet";
      case "ferrum":
        return "Ferrum Testnet";
      default:
        return "Select a network";
    }
  };

  return (
    <Container className="p-1">
      <Container className="p-5 mb-4 bg-light rounded-3">
        <p> Faucet Address: {faucetAddress} </p>
        <p>
          {" "}
          Selected Network:{" "}
          <Dropdown onSelect={changeDropdown}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {networkToNetworkName(network)}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="ferrum">Ferrum Testnet</Dropdown.Item>
              <Dropdown.Item eventKey="bsc">BSC Testnet</Dropdown.Item>
              <Dropdown.Item eventKey="matic">MATIC Testnet</Dropdown.Item>
              <Dropdown.Item eventKey="avax">Avalanche Testnet</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </p>
        <label>Address:</label>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Address"
            aria-label="Address"
            aria-describedby="basic-addon2"
            onChange={(event) => setAddress(event.target.value)}
          />
          <Button
            variant="warning"
            id="button-addon2"
            onClick={transferBalance}
          >
            Get 1tFRM
          </Button>
        </InputGroup>
        {loading && (
          <ClipLoader
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        )}
        {txHash && (
          <label>
            Success! TX Hash :{" "}
            <a href={getExplorerLink(txHash)}>{txHash}</a>{" "}
          </label>
        )}
        {error && <label>Error: {error} </label>}
      </Container>
    </Container>
  );
};

const App = () => (
  <Container className="p-3">
    <Container className="p-5 mb-4 bg-light rounded-3">
      <h1 className="header">Ferrum Testnet Faucet</h1>
      <p>This faucet will dispense tFRM tokens on all deployed testnets:</p>
      <p>1. Select the Network you would like to request tFRM</p>
      <p>2. Input address and submit transaction</p>
    </Container>
    <NameForm />
  </Container>
);

export default App;