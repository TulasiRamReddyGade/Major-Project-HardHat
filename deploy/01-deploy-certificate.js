const { network, ethers } = require("hardhat");
const {
  developmentChains,
  networkConfig,
} = require("../helper-hardhat-config");

module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  const certificate = await deploy("Certificate", {
    from: deployer,
    args: [],
    log: true,
    watchConfirmation: network.config.blockConfirmations || 1,
  });
  log("----------------------------------");
};

module.exports.tags = ["all", "raffle"];
