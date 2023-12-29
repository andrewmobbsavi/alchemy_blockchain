import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";


function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey, setBasePrivateKey, basePrivateKey }) {
  async function onChange(evt) {
    
    const _privateKey = evt.target.value;

    setBasePrivateKey(_privateKey);

    const uint8privateKey = Uint8Array.from(_privateKey);
    setPrivateKey(toHex(uint8privateKey));

    const _address = secp.secp256k1.getPublicKey(_privateKey)

    setAddress(toHex(_address));

    if (_address) {
      const {
        data: { balance },
      } = await server.get(`balance/${toHex(_address)}`);
      console.log(balance);
      setBalance(balance);
    } else {
      setBalance(0);
      setAddress("");
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input placeholder="Type in a private key..." value={basePrivateKey} onChange={onChange}></input>
      </label>

      <div>
        Address: {address}
      </div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
