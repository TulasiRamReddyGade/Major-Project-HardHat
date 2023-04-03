const { ethers } = require("hardhat");

const networkConfig = {
  5: {
    name: "goerli",
  },
  31337: {
    name: "hardhat",
  },
};

const frontEndContractsFile =
  "../certificate-react/src/constants/contractAddresses.json";
const frontEndAbiFile = "../certificate-react/src/constants/abi.json";

const developmentChains = ["hardhat", "localhost"];

module.exports = {
  networkConfig,
  developmentChains,
  frontEndAbiFile,
  frontEndContractsFile,
};
