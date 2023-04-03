const {
  frontEndContractsFile,
  frontEndAbiFile,
} = require("../helper-hardhat-config");
const fs = require("fs");
const { network } = require("hardhat");

module.exports = async () => {
  if (process.env.UPDATE_FRONT_END) {
    console.log("Writing to front end...");
    await updateContractAddresses();
    await updateAbi();
    console.log("Front end written!");
  }
};

async function updateAbi() {
  const certificate = await ethers.getContract("Certificate");
  fs.writeFileSync(
    frontEndAbiFile,
    certificate.interface.format(ethers.utils.FormatTypes.json)
  );
}

async function updateContractAddresses() {
  const certificate = await ethers.getContract("Certificate");
  const contractAddresses = JSON.parse(
    fs.readFileSync(frontEndContractsFile, "utf8")
  );
  if (network.config.chainId.toString() in contractAddresses) {
    if (
      !contractAddresses[network.config.chainId.toString()].includes(
        certificate.address
      )
    ) {
      contractAddresses[network.config.chainId.toString()].push(
        certificate.address
      );
    }
  } else {
    contractAddresses[network.config.chainId.toString()] = [
      certificate.address,
    ];
  }
  fs.writeFileSync(frontEndContractsFile, JSON.stringify(contractAddresses));
}
module.exports.tags = ["all", "frontend"];
