const { ethers } = require("hardhat");
const fs = require("fs-extra");

function setMembers(jsonObject){
  var members = [];
  for (index = 0; index < jsonObject.members.length; index++){
      members[index] = ethers.utils.getAddress(jsonObject.members[index].address);
  }
  return members;        
}

function setMembersTokens(jsonObject){
  var membersTokens = [];
  for (index = 0; index < jsonObject.members.length; index++){
      membersTokens[index] = [Number(jsonObject.members[index].balance), Number(jsonObject.members[index].frozenTokensBeforeTheFirstDate), Number(jsonObject.members[index].frozenTokensBeforeTheSecondDate)];
  }
  return membersTokens; 
}

async function main() {
  const jsonData = fs.readJsonSync('./example.json');
        
  members = setMembers(jsonData);
  membersTokens = setMembersTokens(jsonData);

  const ClinTex = await ethers.getContractFactory("ClinTex");
  clintex = await ClinTex.deploy("ClinTex", "CLI");
  console.log("ClinTex deployed to address:", clintex.address);

  const check = await clintex.init(1637884800, 1669420800, members, membersTokens);
  if (check) {
    console.log("ClinTex has been initialized successfully!");
  } else {
    console.log("An initialization error has occurred!");
  }

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });