const { BigNumber } = require("@ethersproject/bignumber");
const { assert, expect } = require("chai");
const { ethers } = require("hardhat");

describe("TokenSwap", function () {
    
    beforeEach( async () => {
        [alice, bob] = await ethers.getSigners();
        members = [alice.address, bob.address];

        const TestToken = await ethers.getContractFactory("TestToken");
        testToken = await TestToken.deploy("TestToken", "TT", 0);
    })

    describe("Basic swap tokens", function () {
        it("Basic swap tokens from alice", async() => {
            const ClinTex = await ethers.getContractFactory("ClinTex");
            clintex = await ClinTex.deploy("ClinTex", "CTI", 1637884800, 1669420800);
            
            const TokenSwap = await ethers.getContractFactory("TokenSwap");
            tokenSwap = await TokenSwap.deploy(testToken.address, clintex.address);

            await clintex.setSwapTokensContract(tokenSwap.address);

            await testToken.mint(alice.address, 1234567890);

            await alice.call(testToken.approve(tokenSwap.address, 1234567890));

            await clintex.mintForSwapTokens(1234567890);
            
            console.log('\tAlice TestToken balance before: ', BigNumber.from(await testToken.balanceOf(alice.address)).toString());

            await alice.call(tokenSwap.swap(1234567890));

            console.log('\tAlice TestToken balance after: ', BigNumber.from(await testToken.balanceOf(alice.address)).toString());

            expect(BigNumber.from(await clintex.balanceOf(alice.address))).to.equal(BigNumber.from(1234567890));
        })

        it("Try set zero address", async() => {
            const ClinTex = await ethers.getContractFactory("ClinTex");
            clintex = await ClinTex.deploy("ClinTex", "CTI", 1637884800, 1669420800);
            
            const TokenSwap = await ethers.getContractFactory("TokenSwap");
            tokenSwap = await TokenSwap.deploy(testToken.address, clintex.address);

            await expect(clintex.setSwapTokensContract(ethers.constants.AddressZero)).to.be.revertedWith('ClinTex: address must not be empty');
        })

        it("Try double set address", async() => {
            const ClinTex = await ethers.getContractFactory("ClinTex");
            clintex = await ClinTex.deploy("ClinTex", "CTI", 1637884800, 1669420800);
            
            const TokenSwap = await ethers.getContractFactory("TokenSwap");
            tokenSwap = await TokenSwap.deploy(testToken.address, clintex.address);

            await clintex.setSwapTokensContract(tokenSwap.address);
            await expect(clintex.setSwapTokensContract(tokenSwap.address)).to.be.revertedWith('ClinTex: _tokenSwapContract must be empty')
        })

        it("Try mint with zero address TokenSwap", async() => {
            const ClinTex = await ethers.getContractFactory("ClinTex");
            clintex = await ClinTex.deploy("ClinTex", "CTI", 1637884800, 1669420800);
            
            const TokenSwap = await ethers.getContractFactory("TokenSwap");
            tokenSwap = await TokenSwap.deploy(testToken.address, clintex.address);

            await expect(clintex.mintForSwapTokens(1234567890)).to.be.revertedWith('ClinTex: _tokenSwapContract must not be empty')
        })
    })
})