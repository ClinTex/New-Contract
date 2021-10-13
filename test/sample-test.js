const { BigNumber } = require("@ethersproject/bignumber");
const { assert, expect } = require("chai");
const { ethers } = require("hardhat");


describe("ClinTex", function () {
 
  beforeEach( async () => {
    [alice, bob] = await ethers.getSigners();

    const ClinTex = await ethers.getContractFactory("ClinTex");
    clintex = await ClinTex.deploy("ClinTex", "CLI");

    await clintex.approve(alice.address, 99999999);
    await clintex.approve(bob.address, 99999999);

    await clintex.mint(alice.address, 5000);
    await clintex.mint(bob.address, 5000);
  })
  
  describe("Basic transactions without freezing", function () {
    it("Testing transferring Alice's tokens to Bob with transfer()", async() => {
      expect.fail(await clintex.connect(alice).transfer(bob.address, 1000), "ClinTex: couldn't transfer frozen tokens")
    })

    it("Testing transferring Alice's tokens to Bob with transferFrom()", async() => {
      expect.fail(await clintex.transferFrom(alice.address, bob.address, 1000), "ClinTex: couldn't transfer frozen tokens");
    })
  })

  describe("Basic transactions with freezing tokens until Nov 1 2021", function () {
    it("Testing transferring Alice's all freezed tokens to Bob with transfer()", async() => {
      await clintex.setUnfreezeDate(1635724800);
      await clintex.setFreezeTokens(alice.address, await clintex.balanceOf(alice.address));

      var bobBalanceBefore = BigNumber(await clintex.balanceOf(bob.address));
      await clintex.connect(alice).transfer(bob.address, 1000);
      expect(await clintex.balanceOf(bob.address)).to.equal(bobBalanceBefore + 1000);
    })

    it("Testing transferring Alice's all freezed tokens to Bob with transferFrom()", async() => {
      await clintex.setUnfreezeDate(1635724800);
      await clintex.setFreezeTokens(alice.address, await clintex.balanceOf(alice.address));

      var bobBalanceBefore = BigNumber(await clintex.balanceOf(bob.address));
      await clintex.transferFrom(alice.address, bob.address, 1000);
      expect(await clintex.balanceOf(bob.address)).to.equal(bobBalanceBefore + 1000);
    })

    it("Testing transferring Alice's unfreezed tokens to Bob with transfer()", async() => {
      await clintex.setUnfreezeDate(1635724800);
      await clintex.setFreezeTokens(alice.address, await clintex.balanceOf(alice.address) / 2);

      var bobBalanceBefore = BigNumber(await clintex.balanceOf(bob.address));
      await clintex.connect(alice).transfer(bob.address, 1000);
      expect(await clintex.balanceOf(bob.address)).to.equal(bobBalanceBefore + 1000);
    })

    it("Testing transferring Alice's unfreezed tokens to Bob with transfer()", async() => {
      await clintex.setUnfreezeDate(1635724800);
      await clintex.setFreezeTokens(alice.address, await clintex.balanceOf(alice.address) / 2);

      var bobBalanceBefore = BigNumber(await clintex.balanceOf(bob.address));
      await clintex.transferFrom(alice.address, bob.address, 1000);
      expect(await clintex.balanceOf(bob.address)).to.equal(bobBalanceBefore + 1000);
    })
  })

  describe("Basic transactions with freezing tokens until Nov 1 2020", function () {
    it("Testing transferring Alice's all freezed tokens to Bob with transfer()", async() => {
      await clintex.setUnfreezeDate(1604178000);
      await clintex.setFreezeTokens(alice.address, await clintex.balanceOf(alice.address));

      var bobBalanceBefore = BigNumber(await clintex.balanceOf(bob.address));
      await clintex.connect(alice).transfer(bob.address, 1000);
      expect(await clintex.balanceOf(bob.address)).to.equal(bobBalanceBefore + 1000);
    })

    it("Testing transferring Alice's all freezed tokens to Bob with transferFrom()", async() => {
      await clintex.setUnfreezeDate(1604178000);
      await clintex.setFreezeTokens(alice.address, await clintex.balanceOf(alice.address));

      var bobBalanceBefore = BigNumber(await clintex.balanceOf(bob.address));
      await clintex.transferFrom(alice.address, bob.address, 1000);
      expect(await clintex.balanceOf(bob.address)).to.equal(bobBalanceBefore + 1000);
    })

    it("Testing transferring Alice's unfreezed tokens to Bob with transfer()", async() => {
      await clintex.setUnfreezeDate(1604178000);
      await clintex.setFreezeTokens(alice.address, await clintex.balanceOf(alice.address) / 2);

      var bobBalanceBefore = BigNumber(await clintex.balanceOf(bob.address));
      await clintex.connect(alice).transfer(bob.address, 1000);
      expect(await clintex.balanceOf(bob.address)).to.equal(bobBalanceBefore + 1000);
    })

    it("Testing transferring Alice's unfreezed tokens to Bob with transfer()", async() => {
      await clintex.setUnfreezeDate(1604178000);
      await clintex.setFreezeTokens(alice.address, await clintex.balanceOf(alice.address) / 2);

      var bobBalanceBefore = BigNumber(await clintex.balanceOf(bob.address));
      await clintex.transferFrom(alice.address, bob.address, 1000);
      expect(await clintex.balanceOf(bob.address)).to.equal(bobBalanceBefore + 1000);
    })

  })
})
