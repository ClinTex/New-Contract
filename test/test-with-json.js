const { BigNumber } = require("@ethersproject/bignumber");
const { assert, expect } = require("chai");
const { ethers } = require("hardhat");
const fs = require("fs-extra");

describe("ClinTex with JSON", function () {
    
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

    beforeEach( async () => {
        const jsonData = fs.readJsonSync('./example.json');
        
        members = setMembers(jsonData);
        membersTokens = setMembersTokens(jsonData);

        const ClinTex = await ethers.getContractFactory("ClinTex");
        clintex = await ClinTex.deploy("ClinTex", "CLI");
    })

    describe("Basic transactions without freezing", function () {
        it("Testing transferring tokens with", async() => {

          await clintex.init(1637884800, 1669420800, members, membersTokens);
          memberAddress = ethers.utils.getAddress("0x5c0a2DcaA1Cb649857a271d7433fb86b46d054De");
          
          expect(BigNumber.from(await clintex.balanceOf(memberAddress))).to.equal(9999);
        })
    })
})