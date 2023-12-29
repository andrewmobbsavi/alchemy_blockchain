const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

const { toHex } = require("ethereum-cryptography/utils");

app.use(cors());
app.use(express.json());

const balances = {
  "03ca21465b366ac444391d2e6a76046ee8a0f316a956033c27e493cf63188052e9": 100,
  "02189bac136ef27b1ee7a09176d8d7d2772cea838ece7b168e03b5e70ac327cb6c": 50,
  "023565804f0c3b152328399cb72906f3c4505a3b7aaf89339f8de6095e3321cf91": 75,
};

/*
0c684019f172db256efe2a65d44e8421c074a3380144b46dc6e921cd45619b56
cb0ed5387bff8f3eaf982738ecdcfdab9c0cbe4b6a69637664c234142a7c4ebb
08508ce90d6b5690e51aaf4792e07115639ae7b0c8e12bc9ddecae5351b6d549
*/

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;


  console.log(toHex(Uint8Array.from(address)));


  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
