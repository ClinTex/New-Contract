
const {ethers} = require("hardhat");

async function main() {

  const ClinTex = await ethers.getContractFactory("ClinTex");
  const clintex = await ClinTex.deploy("ClinTex Coin", "CTC");
  console.log("ClinTex deployed to address:", clintex.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });