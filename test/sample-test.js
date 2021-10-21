const { BigNumber } = require("@ethersproject/bignumber");
const { assert, expect } = require("chai");
const { ethers } = require("hardhat");

describe("ClinTex", function () {
  
  beforeEach( async () => {
    [alice, bob] = await ethers.getSigners();

    const ClinTex = await ethers.getContractFactory("ClinTex");
    clintex = await ClinTex.deploy("ClinTex", "CLI", 1637884800, 1669420800);

    await clintex.approve(alice.address, 99999999);
    await clintex.approve(bob.address, 99999999);
  })
  
  describe("Constructor", function () {
    it("Testing constructor with wrong arguments", async() => {
      const ClinTex2 = await ethers.getContractFactory("ClinTex");
      await expect(ClinTex2.deploy("ClinTex", "CLI", 1669420800, 1637884800)).to.be.revertedWith('ClinTex: first unfreeze date cannot be greater than the second date');
    })
  })
  
  describe("Basic transactions without freezing", function () {
    it("Testing transferring Alice's tokens to Bob with transfer()", async() => {
      await clintex.mint(alice.address, 5000, 0);

      var bobBalanceBefore = BigNumber.from(await clintex.balanceOf(bob.address));
      await clintex.connect(alice).transfer(bob.address, 1000);
      expect(BigNumber.from(await clintex.balanceOf(bob.address))).to.equal(bobBalanceBefore.add(1000));
    })

    it("Testing transferring Alice's tokens to Bob with transferFrom()", async() => {
      await clintex.mint(alice.address, 5000, 0);

      var bobBalanceBefore = BigNumber.from(await clintex.balanceOf(bob.address));
      await clintex.transferFrom(alice.address, bob.address, 1000);
      expect(BigNumber.from(await clintex.balanceOf(bob.address))).to.equal(bobBalanceBefore.add(1000));
    })
  })

  describe("Basic transactions with freezing tokens until Nov 26 2021 and Nov 26 2022", function () {
    it("Testing transferring Alice's all freezed tokens to Bob with transfer()", async() => {
      await clintex.mint(alice.address, 5000, 1);

      await expect(clintex.connect(alice).transfer(bob.address, 1000)).to.be.revertedWith('ClinTex: could not transfer frozen tokens');
    })

    it("Testing transferring Alice's all freezed tokens to Bob with transferFrom()", async() => {
      await clintex.mint(alice.address, 5000, 1);

      await expect(clintex.transferFrom(alice.address, bob.address, 1000)).to.be.revertedWith('ClinTex: could not transfer frozen tokens');
    })

    it("Testing transferring Alice's unfreezed tokens to Bob with transfer()", async() => {
      await clintex.mint(alice.address, 5000, 1);
      await clintex.mint(alice.address, 2000, 0);

      var bobBalanceBefore = BigNumber.from(await clintex.balanceOf(bob.address));
      await clintex.connect(alice).transfer(bob.address, 1000);
      expect(BigNumber.from(await clintex.balanceOf(bob.address))).to.equal(bobBalanceBefore.add(1000));
    })

    it("Testing transferring Alice's unfreezed tokens to Bob with transferFrom()", async() => {
      await clintex.mint(alice.address, 5000, 1);
      await clintex.mint(alice.address, 2000, 0);

      var bobBalanceBefore = BigNumber.from(await clintex.balanceOf(bob.address));
      await clintex.transferFrom(alice.address, bob.address, 1000);
      expect(BigNumber.from(await clintex.balanceOf(bob.address))).to.equal(bobBalanceBefore.add(1000));
    })
  })

  describe("Basic transactions with freezing tokens until Nov 26 2020 and Nov 26 2021", function () {
    it("Testing transferring Alice's unfreezed tokens to Bob with transfer()", async() => {
      const ClinTex = await ethers.getContractFactory("ClinTex");
      clintex = await ClinTex.deploy("ClinTex", "CLI", 1606348800, 1669420800);

      await clintex.approve(alice.address, 99999999);
      await clintex.approve(bob.address, 99999999);

      await clintex.mint(alice.address, 5000, 1);

      var bobBalanceBefore = BigNumber.from(await clintex.balanceOf(bob.address));
      await clintex.connect(alice).transfer(bob.address, 1000);;
      expect(BigNumber.from(await clintex.balanceOf(bob.address))).to.equal(bobBalanceBefore.add(1000));
    })

    it("Testing transferring Alice's unfreezed tokens to Bob with transferFrom()", async() => {
      const ClinTex = await ethers.getContractFactory("ClinTex");
      clintex = await ClinTex.deploy("ClinTex", "CLI", 1606348800, 1669420800);

      await clintex.approve(alice.address, 99999999);
      await clintex.approve(bob.address, 99999999);

      await clintex.mint(alice.address, 5000, 1);

      var bobBalanceBefore = BigNumber.from(await clintex.balanceOf(bob.address));
      await clintex.transferFrom(alice.address, bob.address, 1000);
      expect(BigNumber.from(await clintex.balanceOf(bob.address))).to.equal(bobBalanceBefore.add(1000));
    })

    it("Testing transferring Alice's all freezed tokens to Bob with transfer()", async() => {
      const ClinTex = await ethers.getContractFactory("ClinTex");
      clintex = await ClinTex.deploy("ClinTex", "CLI", 1606348800, 1669420800);

      await clintex.approve(alice.address, 99999999);
      await clintex.approve(bob.address, 99999999);

      await clintex.mint(alice.address, 5000, 2);

      await expect(clintex.connect(alice).transfer(bob.address, 1000)).to.be.revertedWith('ClinTex: could not transfer frozen tokens');
    })

    it("Testing transferring Alice's all freezed tokens to Bob with transferFrom()", async() => {
      const ClinTex = await ethers.getContractFactory("ClinTex");
      clintex = await ClinTex.deploy("ClinTex", "CLI", 1606348800, 1669420800);

      await clintex.approve(alice.address, 99999999);
      await clintex.approve(bob.address, 99999999);

      await clintex.mint(alice.address, 5000, 2);

      await expect(clintex.transferFrom(alice.address, bob.address, 1000)).to.be.revertedWith('ClinTex: could not transfer frozen tokens');
    })
  })

  describe("Basic transactions with freezing tokens until Nov 26 2019 and Nov 26 2020", function () { 
    it("Testing transferring Alice's unfreezed tokens to Bob with transfer()", async() => {
      const ClinTex = await ethers.getContractFactory("ClinTex");
      clintex = await ClinTex.deploy("ClinTex", "CLI", 1574726400, 1606348800);

      await clintex.approve(alice.address, 99999999);
      await clintex.approve(bob.address, 99999999);

      await clintex.mint(alice.address, 5000, 2);

      var bobBalanceBefore = BigNumber.from(await clintex.balanceOf(bob.address));
      await clintex.connect(alice).transfer(bob.address, 1000);;
      expect(BigNumber.from(await clintex.balanceOf(bob.address))).to.equal(bobBalanceBefore.add(1000));
    })

    it("Testing transferring Alice's unfreezed tokens to Bob with transferFrom()", async() => {
      const ClinTex = await ethers.getContractFactory("ClinTex");
      clintex = await ClinTex.deploy("ClinTex", "CLI", 1574726400, 1606348800);

      await clintex.approve(alice.address, 99999999);
      await clintex.approve(bob.address, 99999999);

      await clintex.mint(alice.address, 5000, 2);
       
      var bobBalanceBefore = BigNumber.from(await clintex.balanceOf(bob.address));
      await clintex.transferFrom(alice.address, bob.address, 1000);
      expect(BigNumber.from(await clintex.balanceOf(bob.address))).to.equal(bobBalanceBefore.add(1000));
    })
  })

  describe("Testing mint", function () {
    it("With wrong flags", async() => {
      await expect(clintex.mint(alice.address, 100, 10)).to.be.revertedWith('ClinTex: unknown flag');
    })
  })

  describe("Testing getFreezeTokens", function () {
    it("Testing frozen token before second date", async() => {
      await clintex.mint(alice.address, 5000, 2);
      expect(BigNumber.from(await clintex.getFreezeTokens(alice.address, 1))).to.equal(BigNumber.from(5000))

    })
    
    it("Putting null address", async() => {
      await expect(clintex.getFreezeTokens(ethers.constants.AddressZero, 0)).to.be.revertedWith('ClinTex: address must not be empty');
    })

    it("With wrong flags", async() => {
      await expect(clintex.getFreezeTokens(alice.address, 10)).to.be.revertedWith('ClinTex: unknown flag');
    })
  })
})
